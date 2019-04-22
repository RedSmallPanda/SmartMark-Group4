import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Cookies from "js-cookie"
import LoginReg from "./module/loginReg/LoginReg"
import HeaderMenu from "./module/PageHeader/HeaderMenu";
import HomePage from "./module/HomePage";
import Teacher from "./module/teacher/Teacher";
import ContentPage from "./module/ContentPage";
import SearchResult from "./module/SearchResult";
import MyHomework from "./module/MyHomework"
import AdminSpace from "./module/AdminSpace"

class App extends Component {
    state = {
        isLogin: false,
        isAdmin: false,
        auth: "",
    };

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
    }

    componentWillMount() {
        let username = Cookies.get('username');
        let tempauth = Cookies.get('auth');
        if (typeof(tempauth) !== "undefined" && tempauth !== '') {
            this.setState({
                auth: tempauth
            })
        }
        if (typeof(username) !== "undefined" && username !== '') {
            if (username === "admin") {
                this.setState({
                    isLogin: true,
                    isAdmin: true
                });
            }
            else {
                this.setState({
                    isLogin: true
                });
            }
        }
    }

    handleLogin(loginState) {
        console.log("log state:");
        console.log(loginState);
        this.setState(loginState);
    }

    render() {
        return (
            <div>
                <HeaderMenu
                    isLogin={this.state.isLogin}
                    isAdmin={this.state.isAdmin}
                    handleLogin={this.handleLogin.bind(this)}/>
                <LoginReg isLogin={this.state.isLogin}
                          isAdmin={this.state.isAdmin}
                          handleLogin={this.handleLogin.bind(this)}/>
                <BrowserRouter>

                    <Route exact path='/' component={HomePage}/>
                    <Route path='/home' component={HomePage}/>
                    <Route path='/content' component={ContentPage}/>
                    <Route path='/search' component={SearchResult}/>
                    <Route path='/teacher' component={Teacher}/>
                    <Route path='/homework' component={MyHomework}/>
                    <Route path='/admin' component={AdminSpace}/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
