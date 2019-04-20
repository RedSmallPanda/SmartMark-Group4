import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {message} from 'antd';

class Content extends Component {

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.state = {
            bookid: 1555590270225,
            content: [{content: 'test1.'}, {content: 'test2.'}],
            contentx: {
                p0: { //第一段
                    s0: { //第一句话
                        id: 1, //sentence id
                        bookid: {}, //book对象
                        content: '第一段第一句话。', //
                        paragraph: 0,
                        sequence: 0,
                        mark: [{ //批注数组
                            id: 1,
                            start: {}, //sentence对象
                            end: {}, //sentence对象
                            bookid: {},
                            userid: {},
                            content: '批注内容',
                            time: ''
                        }, {
                            //...
                        }]
                    },
                    s1: {}
                },
                p1: {
                    s0: {}
                }
            },
        };
        this.getResource = this.getResource.bind(this);
        this.sortSentence = this.sortSentence.bind(this);
    }

    componentDidMount() {
        this.getResource();
    }

    sortSentence(unsorted) {
        let sorted;
        if (sorted.hasOwnProperty("p0")) {
            sorted["p0"].push({content: 'test sort'});
        } else {

        }
        sorted["p0"].push({content: 'test sort'});

        return [];
    }

    getResource() {
        if (this.state.bookid !== undefined && this.state.bookid !== null && this.state.bookid !== '') {
            this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Sentence/" +
                "?Sentence.bookid.id=" + this.state.bookid, true);
            this.xmlhttp.onreadystatechange = () => {
                if (this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
                    let sentences = JSON.parse(this.xmlhttp.responseText);
                    if (sentences.hasOwnProperty("Sentence")) {
                        let unsorted = sentences["Sentence"];
                        this.setState({content: this.sortSentence(unsorted)});
                    }
                }
            };
            // this.xmlhttp.send();
        }
    }

    startMark(e) {
        e.preventDefault();
    }

    endMark(e) {

    }

    render() {
        return (
            <div className="HomePage">
                <h1>content page</h1>
                <h2>book title</h2>
                <div className="content">
                    {
                        this.state.content.map(sentence =>
                            <text className='sentence'
                                  onMouseDown={() => message.info(sentence.content)}
                                  onMouseUp={() => message.info(sentence.content)}>{sentence.content}</text>
                        )
                    }
                </div>
                <Link to='/'>back to app</Link>
            </div>
        );
    }
}

export default Content;
