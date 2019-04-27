import {Component} from "react";
import {Text, View} from "react-native";
import React from "react";

type Props = {};
export default class TestContentScreen extends Component<Props> {
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
                <Text>content</Text>
                <Text>{`book id: ${this.props.navigation.state.params.bookId}`}</Text>
            </View>
        );
    }
}