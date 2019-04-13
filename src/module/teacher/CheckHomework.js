import React, { Component } from 'react';
import {Tabs, message, Select, Divider, Input, Switch, InputNumber, Button} from 'antd';
import 'antd/dist/antd.css';
import Content from "../Content";

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const {TextArea} = Input;
const classes = [{
    id: 1,
    name: 'F1603701'
}, {
    id: 2,
    name: 'F1603702'
}, {
    id: 3,
    name: 'F1603703'
}];
const homeworks = [{
    id: 1,
    book: 'C++ Primer Plus(第6版)'
}, {
    id: 2,
    book: 'Java核心技术 卷I'
}];
const students = [{
    id: 1,
    name: '顾一辉'
}, {
    id: 2,
    name: '茅悦田'
}, {
    id: 3,
    name: '原帅'
}];

class CheckHomework extends Component {
    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.state = {
            classId: null,
            homeworkId: null,
            studentId: null,
            comment: '',
            score: null,
            toDisplay: false,
        };
        this.handleClass = this.handleClass.bind(this);
        this.handleHomework = this.handleHomework.bind(this);
        this.handleStudent = this.handleStudent.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleScore = this.handleScore.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
        this.postScore = this.postScore.bind(this);
        this.renderFilter = this.renderFilter.bind(this);
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

    handleClass(value){
        this.setState({classId: value});
    }

    handleHomework(value){
        this.setState({homeworkId: value});
    }

    handleStudent(value){
        this.setState({studentId: value});
    }

    handleComment(e){
        let {value} = e.target;
        this.setState({comment: value});
    }

    handleScore(value){
        this.setState({score: value});
    }

    handleDisplay(display) {
        this.setState({toDisplay: display});
    }

    renderClassOptions() {
        return classes.map(item => <Option value={item.id}>{item.name}</Option>);
    }

    renderStudentOptions() {
        return students.map(item => <Option value={item.id}>{item.name}</Option>);
    }

    renderHomeworkOptions() {
        return homeworks.map(item => <Option value={item.id}>{item.book}</Option>);
    }

    renderFilter() {
        return (
            <div>
                <Select placeholder="选择班级" onChange={this.handleClass}
                        style={{width: 120, marginRight: 10}}>
                    {this.renderClassOptions()}
                </Select>
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

