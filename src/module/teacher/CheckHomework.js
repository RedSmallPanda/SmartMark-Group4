import React, {Component} from 'react';
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
        this.state = {
            students: [],
            homeworks: [],
            classId: undefined,
            homeworkId: undefined,
            studentId: undefined,
            grade: null,
            toDisplay: false,
        };
        this.getStudents = this.getStudents.bind(this);
        this.getHomework = this.getHomework.bind(this);
        this.getGrade = this.getGrade.bind(this);

        this.handleClass = this.handleClass.bind(this);
        this.handleHomework = this.handleHomework.bind(this);
        this.handleStudent = this.handleStudent.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleScore = this.handleScore.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
        this.postGrade = this.postGrade.bind(this);
        this.renderFilter = this.renderFilter.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.classId !== undefined && this.state.classId !== null &&
            this.state.homeworkId !== undefined && this.state.homeworkId !== null &&
            this.state.studentId !== undefined && this.state.studentId !== null &&
            this.state.grade === null) {
            this.getGrade();
        }
    }

    getStudents(classid) {
        if (classid === undefined || classid === '') {
            message.error("check get students url", 0);
        } else {
            let request = new XMLHttpRequest();
            request.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/User/" +
                "?User.auth=student&User.classid.id=" + classid, true);
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    let studentList = JSON.parse(request.responseText);
                    if (studentList.hasOwnProperty("User")) {
                        this.setState({students: studentList["User"]});
                    }
                } else if (request.readyState === 4) {
                    message.error('get students Failure.', 8);
                }
            };
            request.send();
        }
    }

    getHomework(classid) {
        if (classid === undefined || classid === '') {
            message.error("check get homeworks url", 0);
        } else {
            let request = new XMLHttpRequest();
            request.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Homework/" +
                "?Homework.classid.id=" + classid, true);
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    let homeworkList = JSON.parse(request.responseText);
                    if (homeworkList.hasOwnProperty("Homework")) {
                        this.setState({homeworks: homeworkList["Homework"]});
                    }
                } else if (request.readyState === 4) {
                    message.error('get homeworks Failure.', 8);
                }
            };
            request.send();
        }
    }

    getGrade() {
        message.info("get grade");
        let request = new XMLHttpRequest();
        request.open("GET",
            "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Grade/" +
            "?Grade.userid.id=" + this.state.studentId +
            "&Grade.homeworkid.id=" + this.state.homeworkId, true);
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                let gradeList = JSON.parse(request.responseText);
                if (gradeList.hasOwnProperty("Grade")) {
                    this.setState({grade: gradeList["Grade"][0]});
                }
            }
        };
        request.send();

    }

    postGrade() {
        let msg = window.confirm("暂时不会将发送测试数据到 RMP，放心点！");
        if (msg) {
            let request = new XMLHttpRequest();
            request.open("PUT",
                "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Grade/" + this.state.grade.id, true);
            request.setRequestHeader("Content-Type", "application/json");
            let data = JSON.stringify(this.state.grade);
            alert(data);
            request.send(data);
        }
        message.success('Processing complete!');
    }

    handleClass(value) {
        this.setState({
            classId: value,
            students: [],
            homeworks: [],
            homeworkId: undefined,
            studentId: undefined,
            grade: null,
        });
        if (value !== undefined) {
            this.getStudents(value);
            this.getHomework(value);
        }
    }

    handleHomework(value) {
        this.setState({homeworkId: value, grade: null});
    }

    handleStudent(value) {
        this.setState({studentId: value, grade: null});
    }

    handleComment(e) {
        let {value} = e.target;
        let newGrade = this.state.grade;
        newGrade.comment = value;
        this.setState({comment: newGrade});
    }

    handleScore(value) {
        let newGrade = this.state.grade;
        newGrade.score = value;
        this.setState({score: newGrade});
    }

    handleDisplay(display) {
        this.setState({toDisplay: display});
    }

    renderStudentOptions() {
        return this.state.students.map(item => <Option key={item.id} value={item.id}>{item.username}</Option>);
    }

    renderHomeworkOptions() {
        return this.state.homeworks.map(item => <Option key={item.id} value={item.id}>{item.bookid.title}</Option>);
    }

    renderFilter() {
        return (
            <div>
                <ClassPicker onChange={this.handleClass} value={this.state.classId}
                             style={{width: 140, marginRight: 10}}/>
                <Select placeholder="选择学生" onChange={this.handleStudent} value={this.state.studentId}
                        style={{width: 140, marginRight: 10}} allowClear>
                    {this.renderStudentOptions()}
                </Select>
                <Select placeholder="选择作业" onChange={this.handleHomework} value={this.state.homeworkId}
                        style={{width: 400, marginRight: 10}} allowClear>
                    {this.renderHomeworkOptions()}
                </Select>
                <br/><br/>
                {
                    this.state.grade === null ?
                        null
                        :
                        <div>
                            <Content/>
                            <Divider/>
                            <span style={{verticalAlign: 'top'}}>评语：</span>
                            <TextArea placeholder="评语" size="large" style={{width: 500, marginBottom: 10}}
                                      autosize={{minRows: 2, maxRows: 5}}
                                      onChange={this.handleComment} value={this.state.grade.comment}/>
                            <br/>
                            分数：<InputNumber size="large" min={1} max={100} style={{marginBottom: 10}}
                                            placeholder={"分数"} value={this.state.grade.score}
                                            onChange={this.handleScore}/>
                            <br/>
                            展示：<Switch onChange={this.handleDisplay} style={{marginBottom: 10}}/>
                            <br/>
                            <Button onClick={this.postGrade} type={"primary"}>
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

