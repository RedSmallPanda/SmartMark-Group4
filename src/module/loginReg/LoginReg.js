import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Input, Avatar,BackTop,message } from 'antd/lib/index';
//import { browserHistory} from 'react-router'
import Cookies from 'js-cookie';
import Login from './Login'
import Register from './Register'
import "../../css/App.css"
import Button from "antd/es/button";


const SubMenu = Menu.SubMenu;
const Search = Input.Search;


class LoginReg extends Component {
    constructor(props) {
        super(props)
        this.xmlhttp = new XMLHttpRequest();
        this.state = {
            isLogin: this.props.isLogin,
            isAdmin: this.props.isAdmin,
            visible: !this.props.isLogin,
            regVisible: false,
            type: '',
            current: window.location.pathname,
            search: '',
            imgUrl: '',
            user:"",
        };
    }
    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);

    }

    handleLogout = () =>{
        // axios.get("/logout")
        //     .then(function(response){
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        this.props.handleLogin({
            isLogin: false,
            isAdmin: false,
        });
        Cookies.remove('username');
        this.handleHomePage();
    };

    handleHomePage = () =>{
     //   browserHistory.push('/home');
        this.setState({
            current: window.location.pathname,
        });
    };

    testcookie=()=>{
        let p=Cookies.get("classes");
        console.log((p[0]).id)
        alert(JSON.parse(p)[0].id)
    }

    handleCancel = () => {
      //  this.setState({ visible: false });
    };

    handleReset = () => {
        this.setState({
            visible: false,
        });
  //      browserHistory.push("/resetPassword");
    };

    handleCreate = () => {
        let self = this;
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

          let username=form.getFieldValue("username");
            let password=form.getFieldValue("password");
            alert(username+"    "+password)

            this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/User/?User.username="+username+"&"+"User.password="+password, true);
            let response="";
            this.xmlhttp.onreadystatechange = ()=>{
                if(this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
                    alert(this.xmlhttp.responseText)
                    if(this.xmlhttp.responseText==="{}"){
                        alert("用户名密码错误" )
                        form.resetFields();
                        window.location.reload();
                        return;
                    }

                    response=this.xmlhttp.responseText;
                    let user=JSON.parse(response).User[0];
                    let userid=user.id;
                    let auth=user.auth;
                    let classes=user.classid;
                    Cookies.set('userid', userid);
                    Cookies.set('username',form.getFieldValue("username"))
                    Cookies.set('auth', auth);
                    Cookies.set('classes',classes)

                    if (values.username === 'admin') {
                        self.setState({
                            visible: false,
                        });
                        self.props.handleLogin({
                            isLogin: true,
                            isAdmin: true,
                        });
                    } else {
                        self.setState({
                            visible: false,
                        });
                        self.props.handleLogin({
                            isLogin: true,
                            isAdmin: false,
                        });
                    }
                    form.resetFields();
                    window.location.reload();
                }
                else if(this.xmlhttp.readyState === 4 && this.xmlhttp.status != 200){
                    alert("登录失败")
                    form.resetFields();
                    window.location.reload();
                }
            };
            this.xmlhttp.send();


        });
    };

    loginToRegister = () =>{
        this.setState({
            visible:false,
            regVisible:true,
        })
    };

    RegisterToLogin = () =>{
        this.setState({
            visible:true,
            regVisible:false,
        })
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    showRegModal = () => {
        this.setState({ regVisible: true });
    };

    handleRegCancel = () => {
   //     this.setState({ regVisible: false });
    };



    saveRegFormRef = (formRef) => {
        this.regFormRef = formRef;
    };

    render() {


        let self = this;
        let renderHeader =
            <div>

                <Login
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onLogin={this.handleCreate}
                    loginToRegister={this.loginToRegister}
                    onReset={this.handleReset}
                />
                <Register
                    wrappedComponentRef={this.saveRegFormRef}
                    visible={this.state.regVisible}
                    onCancel={this.handleRegCancel}

                    RegisterToLogin={this.RegisterToLogin}
                />


                <Button onClick={this.testcookie}> TEST COOKIE  </Button>

            </div>;
        return (
            renderHeader
        )
    }
}
//props : isLogin , isAdmin, handleLogin
export default LoginReg;
