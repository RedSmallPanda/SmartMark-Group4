import React, {Component} from 'react';
import {message, Table, Divider, Tag, Popover} from "antd";
import moment from "moment";

const columns = [{
    title: '阅读书目',
    dataIndex: 'bookid',
    key: 'bookid',
    render: book => (<span>{book["title"]}</span>)
}, {
    title: '发布时间',
    dataIndex: 'time',
    key: 'time',
    render: time => (
        <span>{moment(time, "YYYY-MM-DD HH:mm:ss").format("YYYY/MM/DD HH:mm:ss")}</span>
    ),
}, {
    title: '截止时间',
    dataIndex: 'deadline',
    key: 'deadline',
    render: time => (
        <span>{moment(time).format("YYYY/MM/DD HH:mm:ss")}</span>
    ),
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
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
      <Popover placement="bottomRight" title={"作业要求"} content={record.description} trigger="click">
        <a>Detail</a>
      </Popover>
      <Divider type="vertical"/>
      <a>Delete</a>
    </span>
    ),
}];

class AssignCurrent extends Component {

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.state = {
            loading: true,
            data: []
        };
        this.getResource = this.getResource.bind(this);
        this.getCallback = this.getCallback.bind(this);
    }

    componentDidMount() {
        this.getResource();
    }

    getCallback() {
        if (this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
            this.setState({
                loading: false,
                data: JSON.parse(this.xmlhttp.responseText)["Homework"]
            })
        }
    }

    getResource() {
        this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark2/Homework/", true);
        this.xmlhttp.onreadystatechange = this.getCallback;
        this.xmlhttp.send();
    }

    render() {
        return (
            <div>
                <Table loading={this.state.loading} columns={columns} dataSource={this.state.data}/>
            </div>
        );
    }
}

export default AssignCurrent;
