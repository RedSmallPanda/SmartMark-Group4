import React, { Component } from 'react';
import {message, Table, Divider, Tag, Popover} from "antd";

const columns = [{
    title: '阅读书目',
    dataIndex: 'book',
    key: 'book',
}, {
    title: '发布时间',
    dataIndex: 'start',
    key: 'start',
}, {
    title: '截止时间',
    dataIndex: 'end',
    key: 'end',
}, {
    title: '班级',
    key: 'classes',
    dataIndex: 'classes',
    render: classes => (
        <span>
      {classes.map(tag => {
          return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
    ),
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
      <Popover placement="bottomRight" title={"作业要求"} content={record.requirement} trigger="click">
        <a>Detail</a>
      </Popover>
      <Divider type="vertical"/>
      <a>Delete</a>
    </span>
    ),
}];

const data = [{
    id: 1,
    book: 'Alice',
    start: '2019/04/12',
    end: '2019/04/14',
    classes: ['F1603701', 'F1603702'],
    requirement: '没什么特别要求'
}, ];

class AssignCurrent extends Component {

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
    }

    getResource() {
        let msg = window.confirm("将发送测试数据到 RMP，谨慎！");
        if (msg) {
            this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Sentence/", true);
            this.xmlhttp.send();
            message.info(this.xmlhttp.responseText);
        }
    }

    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default AssignCurrent;
