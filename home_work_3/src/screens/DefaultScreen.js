import React, {Component} from 'react';
import PostItem from './defaultScreen/PostItem';
import Loader from '../components/Loader';
import Utils from '../Utils';


export default class DefaultScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            errPost: null,
            postVal: '',
            isLoading: false,
            ...this.props.data
        };
    }

    componentDidMount() {

        if (this.state.isAuthorize) {
            this.getPosts();
        }
    }

    async getPosts() {
        this.setState({isLoading: true});
        let urlGetPosts = Utils.get('readposts', 'comments');

        let {posts} = await fetch(urlGetPosts).then(res => res.json()).catch(err=>err);

        if (typeof posts === 'string') {
            posts = new Array(posts);
        }

        this.setState({isLoading: false, posts});
    }

    async createPost(table) {
        let urlCreatePost = Utils.create(table, {comment: this.state.postVal, user_id: this.state.userId});
        this.setState({isLoading: true});

        const {...all} = await fetch(urlCreatePost).then(res => res.json()).catch(err => err);

        this.setState({isLoading: false, postVal: ''}, this.getPosts);
    }

    onPostChange = (e) => {

        this.setState({postVal: e.target.value})
    };

    onPublishPost = (e) => {
        e.preventDefault();
        this.setState({errPost: null});

        if (this.state.postVal.length === 0 ){
            this.setState({errPost: true});
            return;
        }

        this.createPost('comments');
    };

    render() {

        if (!this.state.isAuthorize) {
            return (
                <div  style={{width: '70%',backgroundColor: 'lightBlue', padding: 10}}>
                    <p>Чтобы читать или оставлять посты нужно авторизоваться </p>
                </div>
            )
        }

        if (this.state.isLoading) {
            return <Loader />
        }

        return (
            <div style={{width: '70%',backgroundColor: 'lightBlue'}}>
                <div style={{borderBottomColor: 'gray', borderBottomWidth: 3, borderBottomStyle: 'dotted', padding: 10}}>
                    <form method={'GET'}>
                        <label htmlFor="login">Комментарий</label>
                        <textarea placeholder={'Введите сообщение'} value={this.state.postVal} onChange={this.onPostChange} name="post" id="post" cols="20" rows="5"></textarea>
                        {
                            this.state.errPost &&
                            <span> Поле обязательно для заполнения</span>
                        }
                        <br/>
                        <button onClick={this.onPublishPost}>Опубликовать</button>
                    </form>
                </div>
                {
                    this.state.posts.map((item, index) => {
                        const {id, login, created_at, comment} = item;

                        if (!comment) {
                            return <p key={index +1} style={{padding:10}}>{item}</p>
                        }

                        return (
                            <PostItem
                                key={id}
                                commentId={id}
                                comment={comment}
                                login={login}
                                createdAt={created_at}
                            />
                        )
                    })
                }
            </div>

        )

    }
}
