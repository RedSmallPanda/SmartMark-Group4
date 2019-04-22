import React, {Component} from 'react';
import moment from 'moment';
import 'antd/dist/antd.css';
import {Steps, Button, message, Input, DatePicker, Popconfirm, Icon} from 'antd';
import Content from "../Content";
import ClassPicker from "../ClassPicker";
import BookPicker from "./BookPicker";

const Step = Steps.Step;
const {TextArea} = Input;
const steps = [{
    title: '选择班级',
    description: 'Classes',
}, {
    title: '挑选书籍',
    description: 'Book',
}, {
    title: '补充要求',
    description: 'Requirement',
}, {
    title: '确认发布',
    description: 'Publish',
}];

class AssignNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            classid: [],
            bookid: [],
            deadline: null,
            description: "",
        };
        this.xmlhttp = new XMLHttpRequest();
        this.recursiveXMLHttp = new XMLHttpRequest();
        this.clear = this.clear.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.postHomework = this.postHomework.bind(this);
        this.homeworkCallback = this.homeworkCallback.bind(this);
        this.assignByClass = this.assignByClass.bind(this);
        this.recursiveInitializeGrade = this.recursiveInitializeGrade.bind(this);

        this.handleClass = this.handleClass.bind(this);
        this.handleBook = this.handleBook.bind(this);
        this.handleDeadline = this.handleDeadline.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.renderStep = this.renderStep.bind(this);
    }

    clear() {
        this.setState({
            current: 0,
            classid: [],
            bookid: [],
            deadline: null,
            description: "",
        });
    }

    next() {
        if (this.state.current === 0 && this.state.classid.length === 0) {
            message.warning("请先选择班级！");
        } else if (this.state.current === 1 && this.state.bookid.length === 0) {
            message.warning("请选择书籍！");
        } else if (this.state.current === 2 && this.state.deadline === null) {
            message.warning("请选择截止时间！");
        } else {
            let next = this.state.current + 1;
            this.setState({current: next});
        }
    }

    prev() {
        let prev = this.state.current - 1;
        this.setState({current: prev});
    }

    recursiveInitializeGrade(homeworkId) {
        if (this.studentCount < this.users.length) {
            this.recursiveXMLHttp.open("POST", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Grade/", true);
            this.recursiveXMLHttp.setRequestHeader("Content-Type", "application/json");
            let data = JSON.stringify({
                userid: {id: this.users[this.studentCount].id},
                homeworkid: {id: homeworkId},
                comment: '教师暂未批改',
                score: -1
            });
            this.recursiveXMLHttp.onreadystatechange = () => {
                if (this.recursiveXMLHttp.readyState === 4 && this.recursiveXMLHttp.status === 200) {
                    this.studentCount += 1;
                    this.recursiveInitializeGrade(homeworkId);
                }
            };
            this.recursiveXMLHttp.send(data);
        } else {
            if (this.studentCount === this.users.length) {
                this.classCount += 1;
                message.success("Processed: Class " + this.classCount, 0);
                this.assignByClass(homeworkId);
            }
        }
    }

    assignByClass(homeworkId) {
        if (this.classCount < this.state.classid.length) {
            message.loading("Processing Class " + (this.classCount + 1), 0);
            let classId = this.state.classid[this.classCount];
            let request = new XMLHttpRequest();
            request.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/User/" +
                "?User.auth=student&User.classid.id=" + classId, true);
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    let studentList = JSON.parse(request.responseText);
                    if (studentList.hasOwnProperty("User")) {
                        this.users = studentList["User"];
                        this.studentCount = 0;
                        message.loading("Initializing Grades...", 0);
                        this.recursiveInitializeGrade(homeworkId);
                    }
                } else if (request.readyState === 4) {
                    message.error('Failure: get student when adding grade', 0);
                }
            };
            request.send();
        } else {
            if (this.classCount === this.state.classid.length) {
                message.destroy();
                message.success("All processed !!!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }
    }

    homeworkCallback() {
        if (this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
            message.success('Homework Processed.', 0);

            let homeworkId = JSON.parse(this.xmlhttp.responseText)["id"];
            this.classCount = 0;
            this.assignByClass(homeworkId);

        } else if (this.xmlhttp.readyState === 4) {
            message.error('Homework Failure.', 0);
        }
    }

    postHomework() {
        let msg = window.confirm("确认布置？");
        if (msg) {
            this.xmlhttp.open("POST", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Homework/", true);
            this.xmlhttp.setRequestHeader("Content-Type", "application/json");
            let classes = [];
            this.state.classid.map(classId => {
                classes.push({id: classId})
            });
            let data = JSON.stringify({
                classid: classes,
                bookid: {id: this.state.bookid},
                deadline: this.state.deadline,
                description: this.state.description,
                time: moment()
            });
            this.xmlhttp.onreadystatechange = this.homeworkCallback;
            this.xmlhttp.send(data);
            message.loading('Processing homework...', 0);
        }
    }

    renderActions() {
        return (
            <div className="steps-action" align="right">
                <Popconfirm title={"确认清空？"} onConfirm={this.clear}>
                    <Button type="danger" style={{marginRight: 8}}>CLEAR</Button>
                </Popconfirm>
                {
                    this.state.current > 0 &&
                    <Button style={{marginRight: 8}} onClick={this.prev}><Icon type="left"/>Previous</Button>
                }
                {
                    this.state.current < steps.length - 1
                    && <Button type="primary" onClick={() => this.next()}>Next<Icon type="right"/></Button>
                }
                {
                    this.state.current === steps.length - 1 &&
                    <Button type="primary" onClick={() => this.postHomework()}>Done</Button>
                }
            </div>
        );
    }

    handleClass(value) {
        this.setState({classid: value});
    }

    handleBook(value) {
        this.setState({bookid: value === undefined ? [] : value});
    }

    handleDeadline(value) {
        this.setState({deadline: value});
    }

    handleDescription(e) {
        const {value} = e.target;
        this.setState({description: value});
    }

    renderStep() {
        switch (this.state.current) {
            case 0:
                return <ClassPicker value={this.state.classid} onChange={this.handleClass} mode="multiple" allowClear/>;
            case 1:
                return (
                    <div>
                        <BookPicker value={this.state.bookid} onChange={this.handleBook} allowClear/>
                        {this.state.bookid.length !== 0 && <Content bookid={this.state.bookid}/>}
                    </div>
                );
            case 2:
                return (
                    <div>
                        截止时间：
                        <DatePicker style={{marginBottom: 10}} format="YYYY-MM-DD HH:mm:ss"
                                    value={this.state.deadline} onChange={this.handleDeadline}
                                    showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}/>
                        <br/><br/>
                        <span style={{verticalAlign: 'top'}}>补充信息：</span>
                        <TextArea value={this.state.description} placeholder={"补充作业信息"}
                                  style={{width: 400}} autosize={{minRows: 2, maxRows: 10}}
                                  onChange={this.handleDescription}/>
                    </div>
                );
            case 3:
                return (
                    <div>
                        班级：<ClassPicker value={this.state.classid} mode="multiple" disabled/><br/><br/>
                        书籍：<BookPicker value={this.state.bookid} disabled/><br/><br/>
                        截止时间：
                        <DatePicker format="YYYY-MM-DD HH:mm:ss" value={this.state.deadline} disabled/><br/><br/>
                        <span style={{verticalAlign: 'top'}}>补充信息：</span>
                        <TextArea value={this.state.description} autosize={{minRows: 2, maxRows: 10}}
                                  style={{width: 400, marginRight: 10}} disabled/>
                    </div>
                );
            default:
                return "error";
        }
    }

    render() {
        return (
            <div>
                <Steps current={this.state.current} style={{padding: 15}}>
                    {
                        steps.map(item =>
                            <Step key={item.title} title={item.title} description={item.description}/>)
                    }
                </Steps>
                {this.renderActions()}
                <div className="steps-content">{this.renderStep()}</div>
            </div>
        );
    }
}

export default AssignNew;
