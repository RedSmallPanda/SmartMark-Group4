import React from 'react';
import {Button, Modal, Form, Input,Icon,Row,Col} from 'antd/lib/index'
import "../../css/App.css"
import {Select} from "antd";

const Option = Select.Option;
const FormItem = Form.Item;
const Register = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.xmlhttp = new XMLHttpRequest();
            this.state = {
                username:"",
                password:"",
                classid:"",
                multiclassid:"",
                auth:"tourist",
                Classes: [],
                confirmDirty: false,
            };
        }

        componentWillMount() {
            this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Class", true);
            // this.xmlhttp.open("GET", "http://www.baidu.com", true);
            // this.xmlhttp.setRequestHeader("Content-Type","application/json");
            // let data = JSON.stringify({
            //     "name": "F1603703",
            // });
            this.xmlhttp.onreadystatechange = ()=>{
                if(this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
                    let meta=JSON.parse(this.xmlhttp.responseText);
                    let temp_classes=meta.Class;
                    this.setState({
                        Classes: temp_classes
                    })

                }
            };
             this.xmlhttp.send();

            // this.xmlhttp.send(data);
        }

        clearstate=()=>{
            this.setState({
                username:"",
                password:"",
                classid:"",
                auth:"student",
                Classes: [],
                multiclassid:"",
                confirmDirty: false,
            })
        }

        register=()=>{

            alert(this.state.username+" pass: "+this.state.password+" calss:"+this.state.classid+"multiclasses : "+this.state.multiclassid)
            if(this.state.username==="" | this.state.password===""){
                alert("请输入用户名或密码")
                return;
            }
            else if(this.state.username.length<5 |this.state.username.length>12|this.state.password.length<6|this.state.password.length>18){
                alert("用户名或密码不规范")
                return;
            }
            if(this.state.auth==="student"&&this.state.classid===""){
                alert("请选择班级")
                return;
            }
            if(this.state.auth==="teacher"&&this.state.multiclassid.length==0){
                alert("请选择班级")
                return;
            }
            this.xmlhttp.open("POST", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/User", true);
            this.xmlhttp.setRequestHeader("Content-Type","application/json");
            this.xmlhttp.onreadystatechange = ()=>{
                if(this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {

                    alert("注册成功！");
                    this.clearstate();
                    window.location.reload();
                    }
            }
            if(this.state.auth==="tourist"){
                let data = JSON.stringify({
                    "username": this.state.username,
                    "password":this.state.password,
                    "auth":"tourist",
                });
                this.xmlhttp.send(data);
            }
            else if(this.state.auth==="student"){
                let data = JSON.stringify({
                    "username": this.state.username,
                    "password": this.state.password,
                    "auth": this.state.auth,
                    "classid": [{"id": this.state.classid}],
                });
                this.xmlhttp.send(data);
            }
            else if(this.state.auth==="teacher"){
                let m=[];
                for(var i=0;i<this.state.multiclassid.length;i++){
                    m.push({"id":this.state.multiclassid[i]});
                }
                let data = JSON.stringify({
                    "username": this.state.username,
                    "password": this.state.password,
                    "auth": this.state.auth,
                    "classid": m,
                });
                this.xmlhttp.send(data);
            }

        }
        inputusername=(e)=>{
            this.setState({
                username:e.target.value,
            })
        }
        inputpassword=(e)=>{
            this.setState({
                password:e.target.value
            })
        }
        selectclass=(e)=>{
            this.setState({
                classid:e
            })
        }
        selectauth=(e)=>{
            this.setState({
                auth:e,
                classid:"",
                multiclassid:"",
            })
        }
        selectmulticlass=(e)=>{
            this.setState({
                multiclassid:e,
            })
        }

        render() {//TODO: set nickname when register.
            const {visible, onCancel, form, onLogin} = this.props;
            const {getFieldDecorator} = form;

            let p=[];
            let temp=this.state.Classes;
            let classes=temp;
            for(var i=0;i<temp.length;i++){
                p.push(<Option value={temp[i].id}>{temp[i].name}</Option>);
            }

            let touristselect=<Select style={{ width: 200 }} value="null" >

            </Select>
            let studentselect=<Select style={{ width: 200 }} defaultValue="" onChange={this.selectclass} value={this.state.classid}>
                {p}
            </Select>
            let teacherselect=<Select mode="multiple" style={{ width: 200 }} defaultValue="null" onChange={this.selectmulticlass} value={this.state.multiclassid}>
                {p}
            </Select>

            let select=touristselect;
            if(this.state.auth==="student"){
                select=studentselect;

            }
            if(this.state.auth==="teacher"){
                select=teacherselect;
            }
            return (
                <Modal
                    visible={visible}
                    title={null}
                    onCancel={onCancel}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose={true}
                    width="400px"
                >
                    <div className="padding">
                        <p className="letters">注册</p>

                                    <p>
                                        <Input className="input" placeholder="用户名（5-12位）" onChange={this.inputusername}
                                               prefix={<Icon type="user"/>}/>
                                    </p>



                                    <p>
                                        <Input className="input" onChange={this.inputpassword}
                                               placeholder="密码（6-18位）"
                                               prefix={<Icon type="lock"/>}
                                               type="password"/>
                                    </p>


                        <p>
                            <Select style={{ width: 200 }} defaultValue="游客" onChange={this.selectauth}>
                               < Option value="tourist">游客</Option>
                                <Option value="student">学生</Option>
                                <Option value="teacher">老师</Option>

                            </Select>
                            <p>   选择角色</p>
                        </p>
                        <p>
                            {select}
                            <p>   选择班级</p>
                        </p>
                            <Row>
                                <Col span={6}>
                                    <Button type="primary" onClick={this.register} size="large"> 注册 </Button>
                                </Col>
                                <Col span={13}/>
                                <Col span={5}>
                                    <Button type="normal" onClick={this.props.RegisterToLogin}
                                            size="large"> 登录 </Button>
                                </Col>
                            </Row>

                    </div>
                </Modal>
            );
        }
    }
);

export default Register;