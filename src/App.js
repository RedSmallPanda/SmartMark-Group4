import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.postResource = this.postResource.bind(this);
    }

    postResource() {
        this.xmlhttp.open("POST", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Sentence/", true);
        this.xmlhttp.setRequestHeader("Content-Type","application/json");
        let data = JSON.stringify({
            "sentencecontent": "test value"
        });
        this.xmlhttp.send(data);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload!
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <button onClick={this.postResource}>
                        rmp send
                    </button>
                </header>
            </div>
        );
    }
}

export default App;
