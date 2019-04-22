import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {PageHeader} from "antd";
import Content from "./Content";

class ContentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            title: 'loading',
            info: '......',
        };
        this.getResource = this.getResource.bind(this);
    }

    componentDidMount() {
        this.getResource();
    }

    getResource() {
        let id = "";
        let pathname = window.location.pathname;
        if (pathname.indexOf("/content/") === 0 && pathname.length >= 10) {
            id = pathname.substring(9, pathname.length);
        }
        if (id.length > 0) {
            let request = new XMLHttpRequest();
            request.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Book/" + id, true);
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    this.setState({...JSON.parse(request.responseText)});
                }
            };
            request.send();
        }
    }

    static handleBack() {
        window.history.go(-1);
    }

    render() {
        return (
            <body className="ContentPage">
            <div >
                <PageHeader
                    className="pageheader"
                    onBack={ContentPage.handleBack}
                    title={<h1>{this.state.title}</h1>}
                    subTitle={this.state.info}
                />
                {this.state.id !== 1 && <Content bookid={this.state.id}/>}
                {/*<Link to='/'>back to app</Link>*/}
            </div>
            </body>
        );
    }
}

export default ContentPage;
