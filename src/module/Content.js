import React, { Component } from 'react';
import {Link} from "react-router-dom";

let sentences = [
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
    {
        id: 1,
        content: "Hello, "
    },
    {
        id: 2,
        content: "world! "
    },
    {
        id: 3,
        content: "I'm SmartMark. "
    },
];
// let marks = [
//     {
//         bookId: 1,
//         id: 1,
//         start: 1,
//         end: 2,
//         text: "test",
//         type: null,
//     }
// ];

class Content extends Component {

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.state = {
            content: sentences
        };
        this.getResource = this.getResource.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    getResource() {
        let id = "1";
        this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Sentence/" + id, true);
        this.xmlhttp.send();
    }
    startMark(e){
        e.preventDefault();
    }
    endMark(e){

    }

    renderContent() {
        return this.state.content.map(function (sentence) {
            return <text className='sentence' onClick={() => alert(sentence.content)}>{sentence.content}</text>;
        });
    }

    render() {
        return (
            <div className="HomePage">
                <h1>content page</h1>
                <h2>book title</h2>
                <div className="content">
                    {this.renderContent()}
                </div>
                <Link to='/'>back to app</Link>
            </div>
        );
    }
}

export default Content;
