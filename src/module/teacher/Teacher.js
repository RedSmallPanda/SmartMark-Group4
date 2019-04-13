import React, { Component } from 'react';
import {Row, Col, Menu, Icon, Badge} from 'antd';
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";
import CheckHomework from "./CheckHomework";
import Assignment from "./Assignment";

const SubMenu = Menu.SubMenu;

class Teacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectedKeys: '2',//localStorage.getItem('key'),
            OpenKeys: ['sub1', 'sub2']
        };
    }

    componentWillMount() {
        this.setState(this.props.location.state);
    };

    handleClick = (e) =>{
        this.setState({
            SelectedKeys:e.key
        });
    };

    render() {
        let component;
        switch (this.state.SelectedKeys) {
            case '1':
                component = <Assignment/>;
                break;
            case '2':
                component = <CheckHomework/>;
                break;
            default:
                component = "error";
        }
        return (
            <div style={{marginTop:20}}>
                <Link to='/'>&ensp;back to app&ensp;</Link><br/><br/>
                <Row>
                    <Col span={3}/>
                    <Col span={3}>
                        <div align="center">
                            <Menu
                                onClick={this.handleClick}
                                defaultSelectedKeys={[this.state.SelectedKeys]}
                                selectedKeys={[this.state.SelectedKeys]}
                                defaultOpenKeys={this.state.OpenKeys}
                                mode="inline"
                                style={{height: 500}}
                            >
                                <SubMenu key="sub1"
                                         title={<span><Icon type="form" />作业管理</span>}>
                                    <Menu.Item key='1'><Badge count={0} dot>布置作业</Badge></Menu.Item>
                                    <Menu.Item key='2'><Badge count={1} dot>批阅作业</Badge></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2"
                                         title={<span><Icon type="ordered-list" />班级管理</span>}>
                                    <Menu.Item key='3'>学生管理</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>
                    </Col>
                    <Col span={15}>
                        {component}
                    </Col>
                </Row>
            </div>
        );
    }

}

export default Teacher;

