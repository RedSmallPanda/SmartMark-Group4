import {Component} from "react";
import {Text, View} from "react-native";
import React from "react";

type Props = {};
export default class TestAuthScreen extends Component<Props> {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F5FCFF',
                }}
            >
                <Text>test auth screen</Text>
                <Text onPress={() => this.props.navigation.navigate('App')}>
                    Press me
                </Text>
            </View>
        );
    }
}