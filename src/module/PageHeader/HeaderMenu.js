import React, {Component} from 'react';
import {Avatar, BackTop, Col, Icon, Input, Menu, Row} from 'antd';
import Cookies from 'js-cookie';
import "../../css/App.css"

const Search = Input.Search;


class HeaderMenu extends Component {
    state = {
        isLogin: this.props.isLogin,
        isAdmin: this.props.isAdmin,
        auth: "",
        visible: false,
        regVisible: false,
        type: '',
        current: (window.location.pathname === '/homework' ? '/work' : window.location.pathname),
        search: '',
        imgUrl: '',
    };

    componentWillMount() {
        let tempauth = Cookies.get("auth");
        if (typeof(tempauth) !== "undefined" && tempauth !== '') {
            this.setState({
                auth: tempauth
            });
        }
        console.log(this.state.auth + "curent " + this.state.current);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState(nextProps);
        console.log(nextProps.auth + "curent " + nextProps.current);
    }


    handleSearch = (value) => {
        window.location.href = '/search?' + encodeURI(value);
    };

    handleHomework = () => {
        this.setState({
            current: "/homework"
        });
        window.location.href = '/homework';
    };

    handleTeacher = () => {
        this.setState({
            current: "/teacher"
        });
        window.location.href = '/teacher';
    };

    handleLogout = () => {
        this.props.handleLogin({
            isLogin: false,
            isAdmin: false,
        });
        Cookies.remove('username');
        Cookies.remove('auth');
        Cookies.remove('userid');
        Cookies.remove('classes');
        this.handleHomePage();
    };

    handleAdminPage=()=>{
        window.location.href = '/admin';
        this.setState({
            current: "/admin"
        })
    }
    handleHomePage = () => {
        window.location.href = '/home';
        this.setState({
            current: "/home"
        })
    };

    handleAvatar = () => {
        if (Cookies.get("auth") === "student") {
            window.location.href = '/homework';
        }
        window.location.href = '/info';
    };

    render() {
        let adminButton =
            <Menu
                mode="horizontal"
                style={{border: 0}}
            >
                <Menu.Item  onClick={this.handleAdminPage}>管理</Menu.Item>
            </Menu>;
        let touristButton =
            <Menu
                mode="horizontal"
                style={{border: 0}}
                selectedKeys={this.state.current}
                defaultSelectedKeys="/home"
            >
                <Menu.Item key="/home" onClick={this.handleHomePage}>首页</Menu.Item>
            </Menu>;
        let studentButton =
            <Menu
                mode="horizontal"
                style={{border: 0}}
                selectedKeys={this.state.current}
                //defaultSelectedKeys="/home"
            >
                <Menu.Item key="/home" onClick={this.handleHomePage}>首页</Menu.Item>
                <Menu.Item key="/work" onClick={this.handleHomework}> 写作业</Menu.Item>
            </Menu>;
        let teacherButton =
            <Menu
                mode="horizontal"
                style={{border: 0}}
                selectedKeys={this.state.current}
                defaultSelectedKeys="/home"
            >
                <Menu.Item key="/home" onClick={this.handleHomePage}>首页</Menu.Item>
                <Menu.Item key="/teacher" onClick={this.handleTeacher}>作业管理</Menu.Item>
            </Menu>;

        let quitButton =
            <Menu mode="horizontal" style={{border: 0}}>
                <Menu.Item key="1" onClick={this.handleLogout}>退出</Menu.Item>

            </Menu>;

        let mainButton = null;

        if (this.state.isLogin && this.state.isAdmin) {
            mainButton = adminButton;
        }
        else if (this.state.isLogin && this.state.auth === 'student') {
            mainButton = studentButton;
        }
        else if (this.state.isLogin && this.state.auth === 'teacher') {
            mainButton = teacherButton;
        }
        else if (this.state.isLogin && this.state.auth === 'tourist') {
            mainButton = touristButton;
        }

        let renderHeader =
            <div>
                <Menu mode="horizontal">
                    <Row>
                        <Col span={3} onClick={this.handleHomePage}>
                            <div align="center">
                                <Icon type="global" style={{cursor: "pointer"}}/>
                                <span style={{cursor: "pointer"}}>SmartMark</span>
                            </div>
                        </Col>
                        <Col span={7}>
                            {mainButton}
                        </Col>
                        <Col span={7}>
                            <Search
                                onSearch={value => this.handleSearch(value)}
                                defaultValue={this.state.search}
                                style={{paddingTop: 8}}
                                enterButton
                                placeholder="搜索书籍"
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={3}>
                            {
                                <div>
                                <Avatar icon="user"
                                        ></Avatar>
                                    <text>&nbsp;&nbsp;</text><text className="font-base">&nbsp;&nbsp;{Cookies.get("username")}</text>
                                </div>

                            }
                        </Col>
                        <Col span={2}>
                            {quitButton}
                        </Col>
                    </Row>
                </Menu>
                <BackTop style={{
                    bottom: 50,
                    right: 50,
                }}/>
            </div>;
        return (
            renderHeader
        )
    }
}

export default HeaderMenu;
