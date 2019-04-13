import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Cookies from "js-cookie"
import LoginReg from "./module/loginReg/LoginReg"
import HeaderMenu from "./module/PageHeader/HeaderMenu";
import HomePage from "./module/HomePage";
import Teacher from "./module/teacher/Teacher";
import ContentPage from "./module/ContentPage";
import SearchResult from "./module/SearchResult";
class App extends Component {
    state = {
        isLogin: false,
        isAdmin: false,
        auth:"",
    };

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.postResource = this.postResource.bind(this);
        this.homePage = this.homePage.bind(this);
    }

    componentWillMount() {
        let username = Cookies.get('username');
        let tempauth=Cookies.get('auth');
        if (typeof(tempauth) !== "undefined" && tempauth !== ''){
            this.setState({
                auth:tempauth
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
    postResource() {
        let msg = window.confirm("将发送测试数据到 RMP，谨慎！");
        if (msg) {
            this.xmlhttp.open("POST", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Sentence/", true);
            this.xmlhttp.setRequestHeader("Content-Type","application/json");
            let data = JSON.stringify({
                "sentencecontent": "test value"
            });
            this.xmlhttp.send(data);
        }
    }

    handleLogin(loginState) {
        console.log("log state:");
        console.log(loginState);
        this.setState(loginState);
    }



    homePage(){

    }

    render() {
        let username=Cookies.get("username");
        const p=<p>{username}</p>
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

                    <Route exact path='/' component={HomePage} />
                    <Route path='/home' component={HomePage} />
                    <Route path='/content' component={ContentPage} />
                    <Route path='/search' component={SearchResult} />
                    <Route path='/teacher' component={Teacher} />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
