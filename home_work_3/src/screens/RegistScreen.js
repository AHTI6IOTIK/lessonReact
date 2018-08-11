import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Utils from '../Utils';
import Loader from '../components/Loader';

export default class RegistScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {
            isAuthorize: false,
            login: '',
            pass: '',
            email: '',
            userId: null,
            isLoading: false,
            errors: {}
        }
    }

    getInitValuesUserFields() {
        return {
            login: '',
            pass: '',
            email: ''
        };
    }

    async registrationUserToApi() {
        const {login, pass, email} = this.state;
        let url = Utils.create('users', {login ,pass ,email});
        this.setState({isLoading: true});

        const {incert_item_id} = await fetch(url).then(res => res.json()).catch(err => err);

        this.setState({isLoading: false, userId: incert_item_id, isAuthorize: true}, ()=> {
            this.props.callback && this.props.callback({
                isAuthorize: this.state.isAuthorize,
                userId: this.state.userId,
                login: this.state.login,
                pass: this.state.pass
            })
        });
    }

    falidateFields() {

        let initVal = this.getInitValuesUserFields(),
            errors = {},
            countErrors = null;

        for (let i in initVal) {

            let errKey = `err${i[0].toLocaleUpperCase()}${i.substr(1, i.length-1)}`;

            if ( this.state[i] === initVal[i]) {
                errors[errKey] = true;
                countErrors++;
            }
        }

        this.setState({errors});
        return countErrors;
    }

    onRegisterAuth = (e) => {
        e.preventDefault();

        const countError =this.falidateFields();

        if (countError === null) {
            this.registrationUserToApi();
        }
    };

    onLoginChange = (e) => {

        this.setState({login: e.target.value})
    };

    onEmailChange = (e) => {
        this.setState({email: e.target.value})
    };

    onPassChange = (e) => {
        this.setState({pass: e.target.value})
    };

    render() {

        const {
            errors,
            login,
            email,
            pass,
            isLoading,
            isAuthorize
        } = this.state;

        if (isLoading) {
            return <Loader />
        }

        if (isAuthorize) {
            return <Redirect to={'/cabinet'} />
        }

        return (
            <div>
                <p>Регистрация</p>
                <form name={'registr'} method={'GET'}>

                    <label htmlFor="login">Логин *</label>
                    <input value={login} onChange={this.onLoginChange} type="text" name="login" id="login"/>
                    {
                        errors.errLogin &&
                        <span> Поле обязательно для заполнения</span>
                    }
                    <br/>

                    <label htmlFor="email">емейл *</label>
                    <input value={email} onChange={this.onEmailChange} type="text" name="email" id="email"/>
                    {
                        errors.errEmail &&
                        <span> Поле обязательно для заполнения</span>
                    }
                    <br/>

                    <label htmlFor="pass">Пароль *</label>
                    <input value={pass} onChange={this.onPassChange} type="password" name="pass" id="pass"/>
                    {
                        errors.errPass &&
                        <span> Поле обязательно для заполнения</span>
                    }
                    <br/>

                    <button onClick={this.onRegisterAuth}>Зарегистрироваться</button>
                </form>

            </div>
        )
    }
}
