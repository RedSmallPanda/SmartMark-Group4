import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Input, message} from 'antd';
import Popover from "antd/es/popover";
import moment from "moment";

class Content extends Component {

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.state = {
            bookid: 1555590270225,
            content: [{content: 'test1.'}, {content: 'test2.'}],
            supMarkId:0,
            inputContent:"",
            newSentences:[0,1],
            marks:{
                id1:{
                    id: 1,
                    start: {id:1}, //sentence对象
                    end: {id:1}, //sentence对象
                    bookid: {},
                    userid: {},
                    content: '批注内容',
                    time: ''

                }
            },
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
                            start: {id:1}, //sentence对象
                            end: {id:1}, //sentence对象
                            bookid: {},
                            userid: {},
                            content: '批注内容',
                            time: ''
                        }]
                    }

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

    getResource=()=> {
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

    putOnClick=(id)=>{
        let data=this.state.marks;
        data["id"+id].content = this.state.inputContent;
        data["id"+id].time = moment();
        let newMark=data["id"+id];
        let newHttp=new XMLHttpRequest();
        newHttp.open("PUT", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Mark/"+id, true);
        newHttp.setRequestHeader("Content-Type", "application/json");
        newHttp.send(JSON.stringify(newMark));
        this.setState({
            marks:data,
            newSentences:[-1,-1],
            supMarkId:-1,
        });
    }

    inputOnChange=(e)=>{
        this.setState({inputContent:e.target.value});
    }

    postOnClick=()=>{
        this.setState({
            newSentences:[-1,-1]
        })
    }

    onSentenceMouseDown=(id,para,seq)=>{
        this.setState({sentenceId:id});
        this.setState({firstPara:para});
        this.setState({firstSeq:seq})
    }

    onSentenceMouseUp=(id,para,seq)=>{
        let sentenceIds=[];
        if((para>this.state.firstPara)||(para===this.state.firstPara && seq>=this.state.firstSeq)){
            sentenceIds.push(this.state.sentenceId);
            sentenceIds.push(id);
        }
        else{
            sentenceIds.push(this.state.sentenceId);
            sentenceIds.push(id);
        }
        this.setState({
            newSentences:sentenceIds,
        });
    }

    supOnClick=(markId)=>{
        this.setState({supMarkId:markId});
    }


    startMark(e) {
        e.preventDefault();
    }

    endMark(e) {

    }

    render() {
        let contentRender=[];
        let i=0;
        let j=0;
        while((this.state.contentx).hasOwnProperty(("p"+i))){
            let temp_p=this.state.contentx[("p"+i)];
            let para=[];
            while(temp_p.hasOwnProperty(("s"+j))){
                let temp_s=this.state.contentx[("p"+i)][("s"+j)];
                let text=[];
                if((temp_s.mark).length>0){
                    if(this.state.newSentences[1]!==temp_s.id) {
                        para.push(<text onMouseDown={()=>{this.onSentenceMouseDown(temp_s.id,temp_s.paragraph,temp_s.sequence)}} onMouseUp={()=>{this.onSentenceMouseUp(temp_s.id,temp_s.paragraph,temp_s.sequence)}} className='sentence' style={{backgroundColor:"yellow"}}>{temp_s.content}</text>);
                    }
                    else {
                        para.push(<Popover content={(
                                             <div>
                                                 <div><Input style={{height:90}} onChange={this.inputOnChange}></Input></div>
                                                 <div><Button onClick={this.postOnClick}>Submit</Button></div>
                                              </div>
                                          )}
                                           title="New Mark"
                                           visible={true}
                        ><text onMouseDown={()=>{this.onSentenceMouseDown(temp_s.id,temp_s.paragraph,temp_s.sequence)}} onMouseUp={()=>{this.onSentenceMouseUp(temp_s.id,temp_s.paragraph,temp_s.sequence)}} className='sentence' style={{backgroundColor:"yellow"}}>{temp_s.content}</text></Popover>);
                    }


                    for(let m=0;m<(temp_s.mark).length;m++){
                        if(temp_s.mark[m].end.id===
                            temp_s.id){
                            if(this.state.supMarkId===temp_s.mark[m].id){
                                para.push(<Popover
                                    content={(
                                        <div>
                                            <div><Input style={{height:90}} onChange={this.inputOnChange} defaultValue={this.state.marks[("id"+temp_s.mark[m].id)].content}></Input></div>
                                            <div><Button onClick={()=>{this.putOnClick(temp_s.mark[m].id)}}>Submit</Button></div>
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
            contentRender.push(<div>&nbsp;&nbsp;&nbsp;&nbsp;{para}</div>)
            i++;


        }
        return (
            <div className="HomePage">
                <h1>content page</h1>
                <h2>book title</h2>
                <div className="content">
                    {
                       contentRender
                    }
                </div>
                <Link to='/'>back to app</Link>
            </div>
        );
    }
}

export default Content;
