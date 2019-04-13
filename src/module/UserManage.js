import React, { Component } from 'react';
import { Table, Divider, Tag ,Button,Icon,Col,Row,Input,Menu,message,Dropdown} from 'antd';

const columns = [{
    title: '名字',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
}, {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
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
    name: 'John Brown',
    password: "123456",
    role: '老师',
}, {
    key: '2',
    name: 'Jim Green',
    password: "11334455",
    role: '学生',
}, {
    key: '3',
    name: 'Joe Black',
    password: "woshiren",
    role: '普通用户',
}];

class UserManage extends Component {
    constructor(props){
        super(props);
        this.state={
            addWho:0,
            class:"选择班级",
            role:"选择角色",
            username:"",
            password:"",
        };
        this.addNewNormalUser=this.addNewNormalUser.bind(this);
        this.addNewSchoolUser=this.addNewSchoolUser.bind(this);
        this.finishNewNormalUser=this.finishNewNormalUser.bind(this);
        this.handleClassClick=this.handleClassClick.bind(this);
        this.handleRoleClick=this.handleRoleClick.bind(this);
        this.handleUsernameInput=this.handleUsernameInput.bind(this);
        this.handlePasswordInput=this.handlePasswordInput.bind(this);
        this.handleSchoolUsernameInput=this.handleSchoolUsernameInput.bind(this);
        this.handleSchoolPasswordInput=this.handleSchoolPasswordInput.bind(this);
        this.finishNewSchoolUser=this.finishNewSchoolUser.bind(this);
    }

    addNewNormalUser(){
        this.setState({addWho:1});
    }

    finishNewSchoolUser(){
        console.log(this.state);

        this.setState(
            {
                addWho:0,
                username:"",
                password:"",
                class:"选择班级",
                role:"选择角色",
            });
    }

    finishNewNormalUser(){
        console.log(this.state);

        this.setState(
            {
                addWho:0,
                username:"",
                password:"",
            });
    }

    addNewSchoolUser(){
        this.setState({addWho:2});
    }

    handleClassClick = (item) => {
        this.setState({class:item.key});
    }

    handleRoleClick = (item) => {
        this.setState({role:item.key});
    }

    handleSchoolUsernameInput = () => {
        this.setState({username:document.getElementById("schoolUser").value});
    }

    handleSchoolPasswordInput = () => {
        this.setState({password:document.getElementById("schoolPassword").value});
    }

    handleUsernameInput = () => {
        this.setState({username:document.getElementById("normalUser").value});
    }

    handlePasswordInput = () => {
        this.setState({password:document.getElementById("normalPassword").value});
    }

    RoleMenu = (
        <Menu onClick={this.handleRoleClick}>
            <Menu.Item key="老师">老师</Menu.Item>
            <Menu.Item key="学生">学生</Menu.Item>
        </Menu>
    );

    ClassMenu = (
        <Menu onClick={this.handleClassClick}>
            <Menu.Item key="高一(1)班">高一(1)班</Menu.Item>
            <Menu.Item key="高一(2)班">高一(2)班</Menu.Item>
        </Menu>
    );

    render(){
        let inputSchool=<div>
            <br/>
            <Row>
                <Col span={5}>
                    <Col span={23}>
                        <Input placeholder="用户名" id="schoolUser" onChange={this.handleSchoolUsernameInput}/>
                    </Col>
                    <Col span={1}/>
                </Col>
                <Col/>
                <Col span={5}>
                    <Col span={23}>
                        <Input placeholder="密码" id="schoolPassword" onChange={this.handleSchoolPasswordInput}/>
                    </Col>
                </Col>
                <Col/>
                <Col span={10}>
                <Col span={8}>
                    <Dropdown overlay={this.RoleMenu}>
                        <Button>
                            {this.state.role} <Icon type="down" />
                        </Button>
                    </Dropdown>
                </Col>
                <Col/>
                <Col span={8}>
                    <Dropdown overlay={this.ClassMenu}>
                        <Button>
                            {this.state.class} <Icon type="down" />
                        </Button>
                    </Dropdown>
                </Col>
                <Col span={4}>
                    <Button onClick={this.finishNewSchoolUser}>添加</Button>
                </Col>
                </Col>
            </Row>
            <br/>
        </div>;
        let inputNormal=<div>
            <br/>
            <Row>
                <Col span={5}>
                    <Col span={23}>
                        <Input placeholder="用户名" id="normalUser" onChange={this.handleUsernameInput}/>
                    </Col>
                </Col>
                <Col span={5}>
                    <Col span={23}>
                        <Input placeholder="密码" id="normalPassword" onChange={this.handlePasswordInput}/>
                    </Col>
                </Col>
                <Col span={5}>
                    <Button onClick={this.finishNewNormalUser}>添加</Button>
                </Col>
            </Row>
            <br/>
        </div>;

        let inputNull=<br/>;
        let inputWhat=inputNull;
        if(this.state.addWho==0){
            inputWhat=inputNull;
        }
        else if(this.state.addWho==1){
            inputWhat=inputNormal;
        }
        else if(this.state.addWho==2){
            inputWhat=inputSchool;
        }
        let userTable = <div>
            <Row>
                <Col span={8}>
                    <Col span={10}>
                        <Button onClick={this.addNewNormalUser}>
                            <Icon type="plus" />普通用户
                        </Button>
                    </Col>
                    <Col span={10}>
                        <Button onClick={this.addNewSchoolUser}>
                            <Icon type="plus" />师生用户
                        </Button>
                    </Col>
                </Col>
            </Row>
            {inputWhat}
            <Table columns={columns} dataSource={data} />
        </div>;
        return(
            userTable
        )
    }
}

export default UserManage;