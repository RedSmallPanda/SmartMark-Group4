import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Input, Avatar,BackTop,message } from 'antd/lib/index';
//import { browserHistory} from 'react-router'
import Cookies from 'js-cookie';
import Login from './Login'
import Register from './Register'
import "../../css/App.css"


const SubMenu = Menu.SubMenu;
const Search = Input.Search;


class LoginReg extends Component {
    state = {
        isLogin: this.props.isLogin,
        isAdmin: this.props.isAdmin,
        visible: !this.props.isLogin,
        regVisible: false,
        type: '',
        current: window.location.pathname,
        search: '',
        imgUrl: '',
    };

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

    showModal = () => {
        this.setState({ visible: true });
    };

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
            console.log('Received values of form username: '+form.getFieldValue("username"));
            console.log('password: '+form.getFieldValue("password"));

            let params = new URLSearchParams();
            params.append("username", JSON.stringify(form.getFieldValue("username")));
            params.append("password", JSON.stringify(form.getFieldValue("password")));
            // axios.post("/login",params)
            //     .then(function(response){
            //         console.log(response.data);
            //         if(response.data===null){
            //             self.setState({
            //                 visible: false,
            //             });
            //             message.error("用户名或密码错误");
            //         } else if (response.data === "banned") {
            //             self.setState({
            //                 visible: false,
            //             });
            //             message.info("该账户已被禁用");
            //         } else if (response.data === "unactivated") {
            //             self.setState({
            //                 visible: false,
            //             });
            //             message.info("账户尚未激活，请先查看注册邮箱进行激活。");
            //         } else {
            //             Cookies.set('username', values.username);
            //             if (values.username === 'admin') {
            //                 self.setState({
            //                     visible: false,
            //                 });
            //                 self.props.handleLogin({
            //                     isLogin: true,
            //                     isAdmin: true,
            //                 });
            //             } else {
            //                 self.setState({
            //                     visible: false,
            //                 });
            //                 self.props.handleLogin({
            //                     isLogin: true,
            //                     isAdmin: false,
            //                 });
            //             }
            //             window.location.reload();
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });

            Cookies.set('username', values.username);
            Cookies.set('auth', values.username);
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
                            window.location.reload();
            form.resetFields();
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

    handleRegCreate = () => {
        let self = this;
        const form = this.regFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form username: '+form.getFieldValue("username") );
            console.log('password: '+form.getFieldValue("password"));
            console.log('nickname: '+form.getFieldValue("nickname"));
            console.log('email: '+form.getFieldValue("email"));
            console.log('phone: '+form.getFieldValue("phone"));

            let params = new URLSearchParams();
            params.append("username", JSON.stringify(form.getFieldValue("username")));
            params.append("password", JSON.stringify(form.getFieldValue("password")));
            params.append("nickname", JSON.stringify(form.getFieldValue("nickname")));
            params.append("email", JSON.stringify(form.getFieldValue("email")));
            params.append("phone", JSON.stringify(form.getFieldValue("phone")));
            // axios.post("/register",params)
            //     .then(function(response){
            //         console.log(response.data);
            //         if(response.data===null){//TODO: more detail about reg failure
            //             self.setState({
            //                 regVisible: false,
            //             });
            //             message.info("注册失败");
            //         } else {
            //             message.info("验证邮件已发到邮箱，请前往激活！");
            //             self.setState({
            //                 regVisible: false,
            //             });
            //             window.location.reload();
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
                        self.setState({
                            regVisible: false,
                        });
                        window.location.reload();
            form.resetFields();
        });
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
                    onLogin={this.handleRegCreate}
                    RegisterToLogin={this.RegisterToLogin}
                />


            </div>;
        return (
            renderHeader
        )
    }
}
//props : isLogin , isAdmin, handleLogin
export default LoginReg;
