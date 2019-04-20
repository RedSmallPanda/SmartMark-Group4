import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Input, message} from 'antd';
import Popover from "antd/es/popover";
import moment from "moment";
import Cookies from 'js-cookie';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookid: this.props.bookid,
            userid: 1,
            content: [{content: 'test1.'}, {content: 'test2.'}],
            supMarkId: 0,
            inputContent: "",
            newSentences: [0, 1],
            marks: {},
            contentx: {},
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        //message.info(JSON.stringify(nextProps), 0);
        this.setState({...nextProps});
    }

    componentDidMount() {
        this.getSentences();
    }

    getSentences = () => {
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
    };

    getMarks = (unsorted) => {
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
    };

    putOnClick = (id) => {
        let data = this.state.marks;
        data["id" + id].content = this.state.inputContent;
        data["id" + id].time = moment();
        let newMark = data["id" + id];
        let newHttp = new XMLHttpRequest();
        newHttp.open("PUT", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Mark/" + id, true);
        newHttp.setRequestHeader("Content-Type", "application/json");
        newHttp.send(JSON.stringify(newMark));
        this.setState({
            marks: data,
            newSentences: [-1, -1],
            supMarkId: -1,
        });
    };

    inputOnChange = (e) => {
        this.setState({inputContent: e.target.value});
    };

    onSentenceMouseDown = (id, para, seq) => {
        this.setState({sentenceId: id});
        this.setState({firstPara: para});
        this.setState({firstSeq: seq})
    };

    onSentenceMouseUp = (id, para, seq) => {
        let sentenceIds = [];
        if ((para > this.state.firstPara) || (para === this.state.firstPara && seq >= this.state.firstSeq)) {
            sentenceIds.push(this.state.sentenceId);
            sentenceIds.push(id);
        }
        else {
            sentenceIds.push(this.state.sentenceId);
            sentenceIds.push(id);
        }
        this.setState({
            newSentences: sentenceIds,
        });
    };

    supOnClick = (markId) => {
        this.setState({supMarkId: markId});
    };

    sortSentence = (unsorted, myMarks) => {
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
    };

    combineMark = (mark, sorted) => {
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
    };

    postOnClick = (startId, endId) => {
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
    };

    render() {
        let contentRender = [];
        let i = 0;
        let j = 0;
        while ((this.state.contentx).hasOwnProperty(("p" + i))) {
            let temp_p = this.state.contentx[("p" + i)];
            let para = [];
            while (temp_p.hasOwnProperty(("s" + j))) {
                let temp_s = this.state.contentx[("p" + i)][("s" + j)];
                if ((temp_s.mark).length > 0) {
                    if (this.state.newSentences[1] !== temp_s.id) {
                        para.push(<text onMouseDown={() => {
                            this.onSentenceMouseDown(temp_s.id, temp_s.paragraph, temp_s.sequence)
                        }} onMouseUp={() => {
                            this.onSentenceMouseUp(temp_s.id, temp_s.paragraph, temp_s.sequence)
                        }} className='sentence' style={{backgroundColor: "yellow"}}>{temp_s.content}</text>);
                    }
                    else {
                        para.push(<Popover content={(
                            <div>
                                <div><Input style={{height: 90}} onChange={this.inputOnChange}/></div>
                                <div><Button onClick={this.postOnClick}>Submit</Button></div>
                            </div>
                        )}
                                           title="New Mark"
                                           visible={true}
                        >
                            <text onMouseDown={() => {
                                this.onSentenceMouseDown(temp_s.id, temp_s.paragraph, temp_s.sequence)
                            }} onMouseUp={() => {
                                this.onSentenceMouseUp(temp_s.id, temp_s.paragraph, temp_s.sequence)
                            }} className='sentence' style={{backgroundColor: "yellow"}}>{temp_s.content}</text>
                        </Popover>);
                    }


                    for (let m = 0; m < (temp_s.mark).length; m++) {
                        if (temp_s.mark[m].end.id ===
                            temp_s.id) {
                            if (this.state.supMarkId === temp_s.mark[m].id) {
                                para.push(<Popover
                                    content={(
                                        <div>
                                            <div><Input style={{height: 90}} onChange={this.inputOnChange}
                                                        defaultValue={this.state.marks[("id" + temp_s.mark[m].id)].content}/>
                                            </div>
                                            <div><Button onClick={() => {
                                                this.putOnClick(temp_s.mark[m].id)
                                            }}>Submit</Button></div>
                                        </div>
                                    )}
                                    title="Mark"
                                    visible={true}

                                ><sup onClick={() => {
                                    this.supOnClick((temp_s.mark)[m].id)
                                }}>[Mark{m}]</sup></Popover>)
                            }
                            else {
                                para.push(<sup onClick={() => {
                                    this.supOnClick((temp_s.mark)[m].id)
                                }}>[Mark{m}]</sup>)
                            }
                        }
                    }

                }
                j++;
            }
            contentRender.push(<div>&nbsp;&nbsp;&nbsp;&nbsp;{para}</div>);
            console.log(para);
            i++;


        }
        console.log(contentRender);
        return (
            <div className="HomePage">
                <div className="content">
                    {
                        contentRender
                    }{
                        JSON.stringify(this.state.contentx)
                }
                </div>
                <Link to='/'>back to app</Link>
            </div>
        );
    }
}

export default Content;
