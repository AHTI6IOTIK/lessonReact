import React, {Component} from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import Utils from '../Utils';

import Loader from '../components/Loader'

export default class AuthorizeScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isAuthorize: this.props.data.isAuthorize,
            userId: null,
            login: this.props.data.login ||'',
            pass: '',
            errLogin: null,
            errPass: null,
            isEmptyResponse: false,
        }
    }

    initDefaultState() {
       return {
            isAuthorize: false,
            userId: null,
            login: null,
            pass:''
        };
    }

    async getUserInfoApi({login, pass}) {
        const url = Utils.get('login', 'users', {login, pass});
        const {user_auth} = await fetch(url).then(res => res.json()).catch(err=>err);

        if (!!user_auth) {

            this.setState({
                isAuthorize: true,
                userId: user_auth.user_id,
                isEmptyResponse: false
            }, () => this.props.callback && this.props.callback(this.state));
        }else{
            this.setState({isEmptyResponse: true});
        }
    }

    componentWillUnmount() {

        this.setState(this.initDefaultState);
    }

    onAuthorize = (e) => {
        e.preventDefault();
        this.setState({errLogin: null});
        this.setState({errPass: null});

        if (this.state.login.length === 0) {
            this.setState({errLogin: true});
        }

        if (this.state.pass.length === 0) {
            this.setState({errPass: true});
        }

        if (!this.state.errLogin && !this.state.errPass) {
            this.setState({isLoading: true});
            this.getUserInfoApi(this.state);
            this.setState({isLoading: false});
        }
    };

    onPassChange = (e) => {
        this.setState({pass: e.target.value});
    };

    onLoginChange = (e) => {
        this.setState({login: e.target.value});
    };

    render() {

        if (this.state.isAuthorize) {
            return <Redirect to={'/cabinet'} exect/>
        }

        if (this.state.isLoading) {
            return <Loader  />
        }

        return (
            <div>
                <p>Авторизация</p>
                {
                    this.state.isEmptyResponse &&
                        <div>
                            <p>Не верный логин или пароль</p>
                        </div>
                }
                <form name={'auth'} method={'GET'}>
                    <label htmlFor="login">Логин</label>
                    <input value={this.state.login} onChange={this.onLoginChange} type="text" name="login" id="login"/>
                    {
                        this.state.errLogin &&
                        <span> Поле обязательно для заполнения</span>
                    }
                    <br/>
                    <label htmlFor="pass">Пароль</label>
                    <input value={this.state.pass} onChange={this.onPassChange} type="password" name="pass" id="pass"/>
                    {
                        this.state.errPass &&
                        <span> Поле обязательно для заполнения</span>
                    }
                    <br/>
                    <button onClick={this.onAuthorize}>Авторизоваться</button>
                </form>
                <NavLink to={'/registr'}>Страница регистрации</NavLink>
            </div>
        )
    }
}
