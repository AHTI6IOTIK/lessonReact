import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Utils from '../Utils';
import Loader from '../components/Loader';
import {MyPosts, Modal} from './defaultScreen/PostItem'

export default class RegistScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            myposts: null,
            dels_row: null,
            isLoading: false,
            showModal: false,
            postModal: '',
            errPost: false,
            ...this.props
        }
    }

    async getMyPosts() {

        let url = Utils.get('readmyposts', 'comments', undefined, this.state.userId);
        this.setState({isLoading: true});

        let {myposts} = await fetch(url).then(res => res.json());

        if (typeof myposts === 'string') {
            myposts = new Array(myposts);
        }

        this.setState({isLoading: false, myposts});
    }

    async deletMyPost(commentId, userId) {

        let url = Utils.delete('comments', {id: commentId});

        this.setState({isLoading: true});

        const {dels_row} = await fetch(url).then(res => res.json()).catch(err=> err);

        this.setState({isLoading: false}, () => dels_row > 0 && this.getMyPosts());
        return dels_row;
    }

    async updatedMyPost() {

        let url = Utils.update('update','comments', {comment: this.state.postModal}, {id:this.state.postModalId} );

        this.setState({isLoading: true});

        const {affected_rows} = await fetch(url).then(res => res.json()).catch(err=> err);

        this.setState({isLoading: false, showModal: false}, () => affected_rows > 0 && this.getMyPosts());
        return affected_rows;
    }

    componentDidMount() {

        if(this.state.isAuthorize) {

            this.getMyPosts();
        }
    }

    onDeletMyPost = (commentId, userId) => {

        if (commentId){
            this.deletMyPost(commentId);
        }
    };

    onSaveMyDiffPost = (e) => {
        e.preventDefault();
        this.setState({errPost: false});

        if (this.state.postModal.length === 0 ) {
            this.setState({errPost: true});
            return;
        }

        this.updatedMyPost();
    };

    onShowModal = (commentId, comment) => {
        this.setState({showModal: true, postModal :comment, postModalId :commentId});
    };

    onLogout = (e) => {
        this.setState({isAuthorize: false},);

        this.props.callback && this.props.callback({
            isAuthorize: false,
            userId: null,
            login: null,
            pass:''
        })

    };

    onRequestClose = () => {
        this.setState({showModal: false});
    };

    onPostModalChange = (e) => {
        this.setState({postModal: e.target.value})
    };

    render() {
        const hideModal = {display: 'none'};
        const showModal = {display: 'block'};

        const styleModal = this.state.showModal ? showModal : hideModal;


        if (!this.state.isAuthorize) {
            return (
                <Redirect to={'/'}/>
            )
        }

        if (this.state.isLoading || !this.state.myposts) {
            return <Loader/>;
        }

        return (
            <div style={{width: '70%',backgroundColor: 'lightBlue'}}>
                <p style={{textAlign: 'center', padding: 5}}>Привет {this.state.login}</p>
                <p style={{marginTop : 10, padding: 10, textAlign: 'center', borderBottomWidth: 3, borderColor: 'gray', borderBottomStyle: 'dotted'}}>Твои посты</p>
                {
                    this.state.myposts.map((item, index) => {

                        const {comment, created_at, id, user_id} = item;

                        if (!comment) {
                            return <p key={index +1} style={{padding:10}}>{item}</p>
                        }

                        return (
                            <MyPosts
                                key={id}
                                commentId={id}
                                comment={comment}
                                createdAt={created_at}
                                userId={user_id}
                                onDell={this.onDeletMyPost}
                                onUpdate={this.onShowModal}
                            />
                        )
                    })
                }
                <div style={{marginTop : 10, padding: 10, textAlign: 'center'}}>
                    <Link to={'/logout'} onClick={this.onLogout} style={{cursor: 'pointer'}}>Выход</Link>
                </div>
                <div  style={styleModal}>
                    <div
                        style={{ display: 'flex',position: 'fixed', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}
                    >
                        <div style={{height: '50%', width: '50%', backgroundColor: '#FFF'}}>
                                <form method={'GET'}>
                                    <label htmlFor="login">Комментарий</label>
                                    <textarea placeholder={'Введите сообщение'} value={this.state.postModal} onChange={this.onPostModalChange} name="post" id="post" cols="20" rows="5"></textarea>
                                    {
                                        this.state.errPost &&
                                        <span> Поле обязательно для заполнения</span>
                                    }
                                    <br/>
                                    <button onClick={this.onSaveMyDiffPost}>Сохранить</button>
                                </form>
                            <p onClick={this.onRequestClose}>Закрыть окно</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
