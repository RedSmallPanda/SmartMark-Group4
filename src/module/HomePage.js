import React, { Component } from 'react';
import {Link} from "react-router-dom";

class HomePage extends Component {

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
            <div className="HomePage">
                HomePage
                <Link to='/'>back to app</Link>
            </div>
        );
    }
}

export default HomePage;
