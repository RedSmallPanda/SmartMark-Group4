import React, {Component} from 'react';
import {Table, Divider, Tag, Button, Icon, Col, Row, Input, Menu, message, Dropdown, Select} from 'antd';

const Option = Select.Option;


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
    constructor(props) {
        super(props);
        this.state = {
            addWho: 0,
            class: "选择班级",
            role: "选择角色",
            username: "",
            password: "",
            data: [],
        };


        this.addNewNormalUser = this.addNewNormalUser.bind(this);
        this.addNewSchoolUser = this.addNewSchoolUser.bind(this);
        this.finishNewNormalUser = this.finishNewNormalUser.bind(this);
        this.handleClassClick = this.handleClassClick.bind(this);
        this.handleRoleClick = this.handleRoleClick.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSchoolUsernameInput = this.handleSchoolUsernameInput.bind(this);
        this.handleSchoolPasswordInput = this.handleSchoolPasswordInput.bind(this);
        this.finishNewSchoolUser = this.finishNewSchoolUser.bind(this);
        this.handleClassChange = this.handleClassChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    addNewNormalUser() {
        this.setState({addWho: 1});
    }

    finishNewSchoolUser() {
        console.log(this.state);

        let classData = this.state.class;
        let classArr = [];
        for (let i = 0; i < classData.length; i++) {
            let classJson = new Object();
            classJson["id"] = classData[i];
            classArr.push(classJson);
        }
        console.log(classArr);
        let auth = "student";
        if (this.state.role == "老师") {
            auth = "teacher";
        }
        let newHttp = new XMLHttpRequest();
        newHttp.open("POST", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/User/", true);
        newHttp.setRequestHeader("Content-Type", "application/json");
        let data = {
            "username": this.state.username,
            "password": this.state.password,
            "auth": auth,
            "classid": classArr,
        };


        console.log("send:", data);
        let stringData = JSON.stringify(data);
        let newUid;
        newHttp.onreadystatechange = () =>{
            if(newHttp.readyState === 4 && newHttp.status === 200){
                newUid=JSON.parse(newHttp.responseText).id;
                let newData = this.state.data;
                data['id']=newUid;
                newData.push(data);
                this.setState(
                    {
                        addWho: 0,
                        username: "",
                        password: "",
                        class: "选择班级",
                        role: "选择角色",
                        data: newData,
                    });
                console.log(newHttp.responseText);
            }
        };
        newHttp.send(stringData);

    }

    finishNewNormalUser() {
        console.log(this.state);

        let newHttp = new XMLHttpRequest();
        newHttp.open("POST", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/User/", true);
        newHttp.setRequestHeader("Content-Type", "application/json");
        let data = {
            "username": this.state.username,
            "password": this.state.password,
            "auth": "tourist",
        };
        let stringData = JSON.stringify(data);
        let newUid;
        newHttp.onreadystatechange = () =>{
            if(newHttp.readyState === 4 && newHttp.status === 200){
                newUid=JSON.parse(newHttp.responseText).id;
                let newData = this.state.data;
                data['id']=newUid;
                newData.push(data);
                this.setState(
                    {
                        addWho: 0,
                        username: "",
                        password: "",
                        data: newData,
                    });
            }
        };
        newHttp.send(stringData);

    }

    addNewSchoolUser() {
        this.setState({addWho: 2});
    }

    handleClassClick = (item) => {
        this.setState({class: item.key});
    }

    handleRoleClick = (item) => {
        this.setState({role: item.key});
    }

    handleSchoolUsernameInput = () => {
        this.setState({username: document.getElementById("schoolUser").value});
    }

    handleSchoolPasswordInput = () => {
        this.setState({password: document.getElementById("schoolPassword").value});
    }

    handleUsernameInput = () => {
        this.setState({username: document.getElementById("normalUser").value});
    }

    handlePasswordInput = () => {
        this.setState({password: document.getElementById("normalPassword").value});
    }

    componentDidMount() {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/User/", true);
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let data = JSON.parse(xmlhttp.responseText).hasOwnProperty('User') ? JSON.parse(xmlhttp.responseText).User : [];
                this.setState({data: data});
                console.log(data);
            }
        }
        xmlhttp.send();
    }


    deleteUser(id) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PUT", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/User/" + id, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        let data = JSON.stringify({
            classid: [],
        });
        xmlhttp.send(data);
        let uid = id;
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let newHttp = new XMLHttpRequest();
                newHttp.open("DELETE", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/User/" + uid, true);
                newHttp.send();
                let newData=[];
                for(let i=0;i<this.state.data.length;i++){
                    if(this.state.data[i].id!==uid){
                        newData.push(this.state.data[i]);
                    }
                }
                this.setState({data:newData});
            }
        };
    }

    RoleMenu = (
        <Menu onClick={this.handleRoleClick}>
            <Menu.Item key="老师">老师</Menu.Item>
            <Menu.Item key="学生">学生</Menu.Item>
        </Menu>
    );

    columns = [{
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '名字',
        dataIndex: 'username',
        key: 'username',
    }, {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
    }, {
        title: '角色',
        dataIndex: 'auth',
        key: 'auth',
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
      <a href="javascript:;" onClick={() => this.deleteUser(record.id)}>删除</a>
    </span>
        ),
    }];

    // ClassMenu = (
    //     <Menu onClick={this.handleClassClick}>
    //         <Menu.Item key="F1603701">F1603701</Menu.Item>
    //         <Menu.Item key="F1603702">F1603702</Menu.Item>
    //         <Menu.Item key="F1603703">F1603703</Menu.Item>
    //     </Menu>
    // );

    ClassMenu = [<Option key="F1603701" value="1555512496857">F1603701</Option>,
        <Option key="F1603702" value="1555512513793">F1603702</Option>,
        <Option key="F1603703" value="1555512520943">F1603703</Option>]
    ;

    handleClassChange(value) {
        this.setState({class: value});
        console.log(value);
    }

    render() {
        let inputSchool = <div>
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
                <Col span={14}>
                    <Col span={6}>
                        <Dropdown overlay={this.RoleMenu}>
                            <Button>
                                {this.state.role} <Icon type="down"/>
                            </Button>
                        </Dropdown>
                    </Col>
                    <Col span={18}>
                        <Select
                            mode="multiple"
                            style={{width: '100%'}}
                            placeholder="请选择班级"
                            onChange={this.handleClassChange}
                        >
                            {this.ClassMenu}
                        </Select>
                    </Col>
                </Col>
            </Row>
            <br/>
            <Row>
                <Button onClick={this.finishNewSchoolUser}>添加</Button>
            </Row>
            <br/>
        </div>;
        let inputNormal = <div>
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

        let inputNull = <br/>;
        let inputWhat = inputNull;
        if (this.state.addWho == 0) {
            inputWhat = inputNull;
        }
        else if (this.state.addWho == 1) {
            inputWhat = inputNormal;
        }
        else if (this.state.addWho == 2) {
            inputWhat = inputSchool;
        }
        let userTable = <div>
            <Row>
                <Col span={8}>
                    <Col span={10}>
                        <Button onClick={this.addNewNormalUser}>
                            <Icon type="plus"/>普通用户
                        </Button>
                    </Col>
                    <Col span={10}>
                        <Button onClick={this.addNewSchoolUser}>
                            <Icon type="plus"/>师生用户
                        </Button>
                    </Col>
                </Col>
            </Row>
            {inputWhat}
            <Table columns={this.columns} dataSource={this.state.data}/>
        </div>;
        return (
            userTable
        )
    }
}

export default UserManage;