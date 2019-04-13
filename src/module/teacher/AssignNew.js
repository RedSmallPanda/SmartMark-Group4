import React, { Component } from 'react';
import moment from 'moment';
import 'antd/dist/antd.css';
import {Steps, Button, message, Select, Input, DatePicker, Row, Col} from 'antd';
import Content from "../Content";

const Step = Steps.Step;
const Option = Select.Option;
const { TextArea } = Input;
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
const books = [{
    id: 1,
    title: 'C++ Primer Plus(第6版)'
}, {
    id: 2,
    title: 'Java核心技术 卷I'
}];

class AssignNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            classes: [],
            book: [],
            deadline: null,
            requirement: "",
        };
        this.xmlhttp = new XMLHttpRequest();
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.postHomework = this.postHomework.bind(this);
        this.renderStep = this.renderStep.bind(this);
        this.handleClass = this.handleClass.bind(this);
        this.handleBook = this.handleBook.bind(this);
        this.handleDeadline = this.handleDeadline.bind(this);
        this.handleRequirement = this.handleRequirement.bind(this);
    }

    next() {
        if (this.state.current === 0 && this.state.classes.length === 0) {
            message.warning("请先选择班级！");
        } else if (this.state.current === 1 && this.state.book.length === 0) {
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

    postHomework() {
        let msg = window.confirm("暂时不会将发送测试数据到 RMP，放心点！");
        if (msg) {
            // this.xmlhttp.open("POST", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Sentence/", true);
            // this.xmlhttp.setRequestHeader("Content-Type", "application/json");
            let data = JSON.stringify({
                classes: this.state.classes,
                book: this.state.book,
                deadline: this.state.deadline,
                requirement: this.state.requirement,
            });
            alert(data);
            // this.xmlhttp.send(data);
        }
        message.success('Processing complete!');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    renderActions() {
        return (
            <div className="steps-action" align="right">
                {
                    this.state.current > 0 &&
                    <Button style={{marginRight: 8}} onClick={this.prev}>Previous</Button>
                }
                {
                    this.state.current < steps.length - 1
                    && <Button type="primary" onClick={() => this.next()}>Next</Button>
                }
                {
                    this.state.current === steps.length - 1 &&
                    <Button type="primary" onClick={() => this.postHomework()}>Done</Button>
                }
            </div>
        );
    }

    handleClass(value) {
        this.setState({classes: value});
    }

    handleBook(value) {
        this.setState({book: value});
    }

    handleDeadline(value) {
        this.setState({deadline: value});
    }

    handleRequirement(e) {
        const {value} = e.target;
        this.setState({requirement: value});
    }

    renderClassOptions() {
        return classes.map(item => <Option value={item.id}>{item.name}</Option>);
    }

    renderBookOptions() {
        return books.map(item => <Option value={item.id}>{item.title}</Option>);
    }

    renderStep() {
        switch (this.state.current) {
            case 0:
                return (
                    <div>
                        <Select value={this.state.classes} onChange={this.handleClass} mode="multiple"
                                style={{width: 400, marginRight: 10}} placeholder={"选择班级"} allowClear>
                            {this.renderClassOptions()}
                        </Select>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <Select placeholder="选择书籍" className={"BookSelect"}
                                value={this.state.book} onChange={this.handleBook}
                                style={{width: 400, marginBottom: 10}}>
                            {this.renderBookOptions()}
                        </Select>
                        {this.state.book.length !== 0 && <Content/>}
                    </div>
                );
            case 2:
                return (
                    <div>
                        截止时间：<DatePicker style={{marginBottom: 10}} format="YYYY-MM-DD HH:mm:ss"
                                         value={this.state.deadline} onChange={this.handleDeadline}
                                         showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}/>
                        <br/><br/>
                        <span style={{verticalAlign: 'top'}}>补充信息：</span>
                        <TextArea value={this.state.requirement} placeholder={"补充作业信息"}
                                  style={{width: 400}} autosize={{minRows: 2, maxRows: 10}}
                                  onChange={this.handleRequirement}/>
                    </div>
                );
            case 3:
                return (
                    <div>
                        班级：
                        <Select value={this.state.classes} mode="multiple" disabled
                                style={{width: 400, marginRight: 10}}>
                            {this.renderClassOptions()}
                        </Select><br/><br/>
                        书籍：
                        <Select value={this.state.book} style={{width: 400, marginRight: 10}} disabled>
                            {this.renderBookOptions()}
                        </Select><br/><br/>
                        截止时间：
                        <DatePicker format="YYYY-MM-DD HH:mm:ss" value={this.state.deadline} disabled/><br/><br/>
                        <span style={{verticalAlign: 'top'}}>补充信息：</span>
                        <TextArea value={this.state.requirement} autosize={{minRows: 2, maxRows: 10}}
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

