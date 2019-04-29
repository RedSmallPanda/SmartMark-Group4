import React, {Component} from 'react';
import {Text, View,AsyncStorage} from 'react-native';
import {List, InputItem, Button,} from "@ant-design/react-native";
import {classes} from "istanbul-lib-coverage";

type Props = {};
export default class MyLogin extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            username:"",
            auth:"",
            password:"",
            data: [],
            info:"",
        };
    }

    toReg=()=>{
        this.setState({
            info:"denglu"
        })
    }
    clear = () => {
        this.setState({usernmae: '', password: "",auth:""})
    };
    setCookie=async (resJson)=>{
        await AsyncStorage.clear();
        await AsyncStorage.setItem("userid",""+(resJson.User)[0].id);
        await AsyncStorage.setItem("auth",""+(resJson.User)[0].auth);
        await AsyncStorage.setItem("classes",""+JSON.stringify((resJson.User)[0].classid));
    }

    getCookie=async ()=>{
        await  AsyncStorage.getItem("classes",(error,class_str)=>{
            let classes=JSON.parse(class_str);
            this.setState({
                info: "get class id from storage: "+classes[0].id
            })
        })
    }

    onSubmit = () => {

        this.setState({
            info:"username: "+this.state.username
        })

        if(this.state.username===""||this.state.password===""){return}
        fetch("http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/User/?User.username="+this.state.username+"&"+"User.password="+this.state.password )
            .then((response) => response.json())
            .then((responseJson) => {

                if(!responseJson.hasOwnProperty("User")){
                    this.setState({
                        info:"用户名密码错误"
                    })
                    return
                }
                this.setCookie(responseJson);
                this.setState({
                    id:(responseJson.User)[0].id,

                    auth:(responseJson.User)[0].auth,
                })

                this.props.onLogin();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            <View style={{width: '100%', flex: 1}}>
                <List style={{marginTop:40}}>
                    <InputItem placeholder={'用户名'}  onChange={(value)=>{
                        this.setState({
                            username : value
                        })

                    }}>
                    </InputItem>

                    <InputItem type={'password'}   placeholder={'密码'} onChange={(value)=>{
                        this.setState({
                            password : value
                        })
                    }}>
                    </InputItem>
                </List>
                <Text>debug info   : {this.state.info}</Text>
                <Button type="primary" size={'large'} style={{margin:10}} onPress={this.onSubmit}>登录</Button>
                <Button type="primary" size={'large'} style={{margin:10}} onPress={this.getCookie}>注册</Button>
            </View>
        );
    }
}







