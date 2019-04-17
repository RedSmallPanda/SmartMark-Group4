import React, { Component } from 'react';
import {Tabs, message, Select, Divider, Input, Switch, InputNumber, Button} from 'antd';
import 'antd/dist/antd.css';
import Content from "../Content";
import ClassPicker from "../ClassPicker";

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const {TextArea} = Input;

class CheckHomework extends Component {

    constructor(props) {
        super(props);
        this.requestClass = new XMLHttpRequest();
        this.requestStudent = new XMLHttpRequest();
        this.requestHomework = new XMLHttpRequest();
        this.state = {
            students: [],
            classes: [],
            homeworks: [],
            classId: [],
            homeworkId: null,
            studentId: null,
            comment: '',
            score: null,
            toDisplay: false,
        };
        this.classCallback = this.classCallback.bind(this);
        this.getClasses = this.getClasses.bind(this);
        this.studentCallback = this.studentCallback.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.homeworkCallback = this.homeworkCallback.bind(this);
        this.getHomework = this.getHomework.bind(this);

        this.handleClass = this.handleClass.bind(this);
        this.handleHomework = this.handleHomework.bind(this);
        this.handleStudent = this.handleStudent.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleScore = this.handleScore.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
        this.postScore = this.postScore.bind(this);
        this.renderFilter = this.renderFilter.bind(this);
    }

    componentDidMount() {
        this.getClasses();
    }

    classCallback() {
        if (this.requestClass.readyState === 4 && this.requestClass.status === 200) {
            this.setState({
                classes: JSON.parse(this.requestClass.responseText)["Class"]
            });
        }
    }

    getClasses() {
        this.requestClass.open("GET", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Class/", true);
        this.requestClass.onreadystatechange = this.classCallback;
        this.requestClass.send();
    }

    studentCallback() {
        if (this.requestStudent.readyState === 4 && this.requestStudent.status === 200) {
            this.setState({
                students: JSON.parse(this.requestStudent.responseText)["User"]
            });
        }
    }

    getStudents() {
        message.info("todo: handle class in check homework");
        // this.requestStudent.open("GET", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/User/" +
        //     "?User.auth=student&User.classid.id=" + this.state.classId, true);
        // this.requestStudent.onreadystatechange = this.studentCallback;
        // this.requestStudent.send();
    }

    homeworkCallback() {
        if (this.requestHomework.readyState === 4 && this.requestHomework.status === 200) {
            this.setState({
                homeworks: JSON.parse(this.requestHomework.responseText)["Homework"]
            });
        }
    }

    getHomework() {
        message.info("todo: handle class in check homework");
        // this.requestHomework.open("GET", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Homework/" +
        //     "?Homework.classid.id=" + this.state.classId, true);
        // this.requestHomework.onreadystatechange = this.homeworkCallback;
        // this.requestHomework.send();
    }

    postScore() {
        let msg = window.confirm("暂时不会将发送测试数据到 RMP，放心点！");
        if (msg) {
            // this.xmlhttp.open("POST", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Sentence/", true);
            // this.xmlhttp.setRequestHeader("Content-Type", "application/json");
            let data = JSON.stringify({
                ...this.state
            });
            alert(data);
            // this.xmlhttp.send(data);
        }
        message.success('Processing complete!');
    }

    handleClass(value) {
        this.setState({classId: value});
        if (value !== null && value !== '') {
            this.getStudents();
            this.getHomework();
        }
    }

    handleHomework(value) {
        this.setState({homeworkId: value});
    }

    handleStudent(value) {
        this.setState({studentId: value});
    }

    handleComment(e) {
        let {value} = e.target;
        this.setState({comment: value});
    }

    handleScore(value) {
        this.setState({score: value});
    }

    handleDisplay(display) {
        this.setState({toDisplay: display});
    }

    renderClassOptions() {
        return this.state.classes.map(item => <Option value={item.id}>{item.name}</Option>);
    }

    renderStudentOptions() {
        return this.state.students.map(item => <Option value={item.id}>{item.username}</Option>);
    }

    renderHomeworkOptions() {
        return this.state.homeworks.map(item => <Option value={item.id}>{item.bookid.title}</Option>);
    }

    renderFilter() {
        return (
            <div>
                <ClassPicker onChange={this.handleClass} value={this.state.classId} style={{width: 120, marginRight: 10}}/>
                <Select placeholder="选择学生" onChange={this.handleStudent}
                        style={{width: 120, marginRight: 10}}>
                    {this.renderStudentOptions()}
                </Select>
                <Select placeholder="选择作业" onChange={this.handleHomework}
                        style={{width: 300, marginRight: 10}}>
                    {this.renderHomeworkOptions()}
                </Select>
                <br/><br/>
                {
                    this.state.classId == null || this.state.studentId == null || this.state.homeworkId == null ?
                        null
                        :
                        <div>
                            <Content/>
                            <Divider/>
                            <span style={{verticalAlign: 'top'}}>评语：</span>
                            <TextArea placeholder="评语" size="large" style={{width: 500, marginBottom: 10}}
                                      autosize={{minRows: 2, maxRows: 5}}
                                      onChange={this.handleComment} value={this.state.comment}/>
                            <br/>
                            分数：<InputNumber size="large" min={1} max={100} style={{marginBottom: 10}}
                                            placeholder={"分数"} value={this.state.score} onChange={this.handleScore}/>
                            <br/>
                            展示：<Switch onChange={this.handleDisplay} style={{marginBottom: 10}}/>
                            <br/>
                            <Button onClick={this.postScore} type={"primary"}>
                                rmp send
                            </Button>
                        </div>
                }
            </div>
        );
    }

    render() {
        return (
            <div style={{marginLeft: 20}}>
                <Tabs tabBarExtraContent={null}>
                    <TabPane tab="进行中" key="1">
                        {this.renderFilter()}
                    </TabPane>
                    <TabPane tab="已结束" key="2">
                        {this.renderFilter()}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default CheckHomework;

