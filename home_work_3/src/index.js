import React, {Component, Fragment} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, NavLink as NavLinkBase, Route, Switch} from "react-router-dom";


import DefaultScreen from './screens/DefaultScreen';
import AuthorizeScreen from "./screens/AuthorizeScreen";
import CabinetScreen from "./screens/CabinetScreen";
import RegistScreen from "./screens/RegistScreen";

const navLinkStyle = {
    padding: 4,
    transition: '0.4s',
    textDecoration: 'none'
};

const navLinkStyleActive = {
    color: 'coral'
};


const NavLink = (props) => (
    <NavLinkBase
        {...props}
        style={navLinkStyle}
        activeStyle={navLinkStyleActive}
    />
);

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthorize: false
        }
    }

    onCallback = (data) => {

        this.setState({...data});
    };

    render() {

        let link = this.state.isAuthorize ? {title: "Cabinet", href: "/cabinet"} : {title: "Authorize", href: "/auth"};

        return (
            <BrowserRouter>
                <Fragment>
                    <nav>
                        <NavLink to='/' exact>Home</NavLink>
                        <NavLink to={link.href} exact>{link.title}</NavLink>
                    </nav>

                    <Switch>

                        <Route path='/' exact render={() => <DefaultScreen data={this.state} />} />
                        <Route path='/auth' exact render={() => <AuthorizeScreen data={this.state} callback={this.onCallback}/>} />
                        <Route path='/registr' exact render={() => <RegistScreen callback={this.onCallback}/>} />
                        <Route path='/cabinet' exact render={() => <CabinetScreen
                            userId={this.state.userId}
                            login={this.state.login}
                            isAuthorize={this.state.isAuthorize}
                            callback={this.onCallback}
                        />} />

                        <Route component={DefaultScreen} />
                    </Switch>
                </Fragment>
            </BrowserRouter>
        )
    }
}

ReactDom.render(<Index  />, document.getElementById('root'));
 