import React, { Component } from 'react';
import { Table, Divider, Tag ,Button,Icon} from 'antd';

const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
}, {
    title: '批注',
    dataIndex: 'content',
    key: 'mark',
},];

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
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }

    componentDidMount(){
        let newHttp=new XMLHttpRequest();
        newHttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Mark/", true);
        newHttp.onreadystatechange=()=>{
            if(newHttp.readyState === 4 && newHttp.status === 200) {
                let markData = JSON.parse(newHttp.responseText).hasOwnProperty("Mark") ? JSON.parse(newHttp.responseText).Mark : [];
                this.setState({
                    data:markData,
                });
            }
        }
        newHttp.send();
    }

    render(){
        let userTable = <div>
            <Table columns={columns} dataSource={this.state.data} />
        </div>;
        return(
            userTable
        )
    }
}

export default MarkManage;