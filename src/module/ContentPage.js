import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {PageHeader} from "antd";
import Content from "./Content";

class ContentPage extends Component {

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.state = {
            id: 1,
            title: '数据挖掘概念与技术',
            info: 'introduction of the book',
        };
        this.getResource = this.getResource.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    getResource() {
        let id = "1";
        this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Sentence/" + id, true);
        this.xmlhttp.send();
    }

    handleBack() {
        window.history.go(-1);
    }

    render() {
        return (
            <div className="ContentPage">
                <PageHeader
                    onBack={this.handleBack}
                    title={<h1>{this.state.title}</h1>}
                    subTitle={this.state.info}
                />
                <Content/>
                <Link to='/'>back to app</Link>
            </div>
        );
    }
}

export default ContentPage;
