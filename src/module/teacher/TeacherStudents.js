import React, {Component} from 'react';
import {message, Table, Divider, Tag, Popover} from "antd";
import moment from "moment";
import ClassPicker from "../ClassPicker";

class TeacherStudents extends Component {

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.state = {
            loading: false,
            classid: undefined,
            data: []
        };
        this.getStudents = this.getStudents.bind(this);
        this.handleClass = this.handleClass.bind(this);
    }

    handleClass(value) {
        this.setState({classid: value, data: []});
        if (value !== undefined) {
            this.setState({
                loading: true,
                classid: value,
            });
            this.getStudents(value);
        }
    }

    getStudents(classid) {
        if (classid === undefined || classid === '') {
            message.error("check get students url", 0);
        } else {
            this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/User/" +
                "?User.auth=student&User.classid.id=" + classid, true);
            this.xmlhttp.onreadystatechange = () => {
                if (this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
                    this.setState({
                        loading: false,
                        data: JSON.parse(this.xmlhttp.responseText)["User"]
                    })
                }
            };
            this.xmlhttp.send();
        }
    }

    render() {
        return (
            <div style={{padding: 20}}>
                <ClassPicker value={this.state.classid} onChange={this.handleClass}/><br/><br/>
                <Table loading={this.state.loading} columns={this.columns} dataSource={this.state.data}/>
            </div>
        );
    }

    columns = [{
        title: '学生id',
        dataIndex: 'id',
        key: 'id',
        render: id => (<span>{id}</span>)
    }, {
        title: '学生名字',
        dataIndex: 'username',
        key: 'username',
        render: username => (<span>{username}</span>),
    }, {
        title: '班级',
        key: 'classid',
        dataIndex: 'classid',
        render: classid => (
            <span>
      {classid.map(tag => {
          return <Tag key={tag}>{tag["name"]}</Tag>;
      })}
    </span>
        ),
    },];
}

export default TeacherStudents;
