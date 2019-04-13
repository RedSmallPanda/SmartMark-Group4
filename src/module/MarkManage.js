import React, { Component } from 'react';
import { Table, Divider, Tag ,Button,Icon} from 'antd';

const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
}, {
    title: '批注',
    dataIndex: 'mark',
    key: 'mark',
},  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="javascript:;">删除</a>
    </span>
    ),
}];

const data = [{
    key: '1',
    id: '1',
    mark: "今天天气很好",
}, {
    key: '2',
    id: '2',
    mark: "现在真的不知道该写什么了，随便写一点好了，批注需要体现文学性，和对这篇文章自己的理解",
}, {
    key: '3',
    id: '3',
    mark: "啊实打实大三但是打就撒谎的健康撒会尽快打火机卡速度快还是觉得卡就开始对海口市",
}];

class MarkManage extends Component {
    render(){
        let userTable = <div>
            <Table columns={columns} dataSource={data} />
        </div>;
        return(
            userTable
        )
    }
}

export default MarkManage;