import {Component} from "react";
import {Text, View} from "react-native";
import React from "react";
import MyLogin from "./loginReg/MyLogin";

type Props = {};
export default class TestAuthScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
        };
    }
    onLogin=()=>{
        this.props.navigation.navigate('App')
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,

                    backgroundColor: '#F5FCFF',
                }}
            >
                <MyLogin
                    onLogin={this.onLogin}
                />
                <Text onPress={() => this.props.navigation.navigate('App')}>
                    Press me!!!!!!
                </Text>
            </View>
        );
    }
}