import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from "./module/HomePage";
import Content from "./module/Content";
import MyHomework from "./module/MyHomework"
import AdminSpace from "./module/AdminSpace"

ReactDOM.render(
    <BrowserRouter>
        <Route exact path='/' component={App} />
        <Route path='/home' component={HomePage} />
        <Route path='/content' component={Content} />
        <Route path='/homework' component={MyHomework} />
        <Route path='/admin' component={AdminSpace} />
    </BrowserRouter>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
