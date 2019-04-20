import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {message} from 'antd';
import moment from "moment";
import Cookies from 'js-cookie';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookid: this.props.bookid,
            userid: 1,
            inputContent: '',
            content: [{content: 'test1.'}, {content: 'test2.'}],
            marks: {},
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
        // get resources and combine
        this.getSentences = this.getSentences.bind(this);
        this.getMarks = this.getMarks.bind(this);
        this.sortSentence = this.sortSentence.bind(this);
        this.combineMark = this.combineMark.bind(this);
        // others
    }

    componentWillReceiveProps(nextProps, nextContext) {
        message.info(JSON.stringify(nextProps), 0);
        this.setState({...nextProps});
    }

    componentDidMount() {
        this.getSentences();
    }

    getSentences() {
        if (this.state.bookid !== undefined && this.state.bookid !== null && this.state.bookid !== '') {
            let request = new XMLHttpRequest();
            request.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Sentence/" +
                "?Sentence.bookid.id=" + this.state.bookid, true);
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    let sentences = JSON.parse(request.responseText);
                    if (sentences.hasOwnProperty("Sentence")) {
                        let unsorted = sentences["Sentence"];
                        this.getMarks(unsorted);
                    }
                }
            };
            request.send();
        }
    }

    getMarks(unsorted) {
        if (this.state.bookid !== undefined && this.state.bookid !== null && this.state.bookid !== '') {
            if (this.state.userid === undefined || this.state.userid === null || this.state.userid === '') {
                return;
            }
            let request = new XMLHttpRequest();
            request.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Mark/" +
                "?Mark.bookid.id=" + this.state.bookid +
                "&Mark.userid.id=" + this.state.userid, true);
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    let marks = JSON.parse(request.responseText);
                    let myMarks = [];
                    if (marks.hasOwnProperty("Mark")) {
                        myMarks = marks["Mark"];
                    }
                    this.sortSentence(unsorted, myMarks);
                }
            };
            request.send();
        }
    }

    sortSentence(unsorted, myMarks) {
        let sorted = {};
        let marks = {};
        unsorted.map(sentence => {
            let paragraphProp = "p" + sentence.paragraph;
            let sequenceProp = "s" + sentence.sequence;
            if (!sorted.hasOwnProperty(paragraphProp)) {
                sorted[paragraphProp] = {};
            }
            if (!sorted[paragraphProp].hasOwnProperty(sequenceProp)) {
                sorted[paragraphProp][sequenceProp] = {};
            }
            sorted[paragraphProp][sequenceProp] = sentence;
            sorted[paragraphProp][sequenceProp]["mark"] = [];
        });
        myMarks.map(mark => {
            marks["id" + mark.id] = mark;
            sorted = this.combineMark(mark, sorted);
        });
        this.setState({
            contentx: sorted,
            marks: marks,
        });
        console.log(sorted);
        console.log(marks);
    }

    combineMark(mark, sorted) {
        let p = mark.start.paragraph;
        if (p === mark.end.paragraph) {
            for (let s = mark.start.sequence; s <= mark.end.sequence; s++) {
                sorted["p" + p]["s" + s]["mark"].push(mark);
            }
        } else {
            let from = mark.start.sequence;
            for (; p < mark.end.paragraph; p++) {
                for (let s = from; sorted["p" + p].hasOwnProperty("s" + s); s++) {
                    sorted["p" + p]["s" + s]["mark"].push(mark);
                }
                from = 0;
            }
            if (p === mark.end.paragraph) {
                for (let s = 0; s <= mark.end.sequence; s++) {
                    sorted["p" + p]["s" + s]["mark"].push(mark);
                }
            } else {
                alert("combine error");
            }
        }
        return sorted;
    }

    postOnClick(startId, endId) {
        let newMark = {};
        newMark["start"] = {id: startId};
        newMark["end"] = {id: endId};
        newMark["bookid"] = {id: this.state.bookid};
        newMark["userid"] = {id: Cookies.get("userid")};
        newMark["content"] = this.state.inputContent;
        newMark["time"] = moment();

        let newHttp = new XMLHttpRequest();
        newHttp.open("POST", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Mark/", true);
        newHttp.setRequestHeader("Content-Type", "application/json");
        newHttp.onreadystatechange = () => {
            if (newHttp.readyState === 4 && newHttp.status === 200) {
                this.setState({
                    newSentences: [-1, -1],
                    marks: this.combineMark(newMark, this.state.contentx),
                });
            }
            // 新的数据存放在newMark中，这里写setState函数，记得setState中要设置newSentences:[-1,-1]，
            // 要完整的一条mark的话需要用返回值，newMark中关联数据只有id
        };
        newHttp.send(JSON.stringify(newMark));
    }

    render() {
        return (
            <div className="HomePage">
                <div className="content">
                    {
                        JSON.stringify(this.state.contentx)
                    }
                </div>
                <Link to='/'>back to app</Link>
            </div>
        );
    }
}

export default Content;
