import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class Teacher extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            data: "test"
        };
    }

    componentDidMount() {
        fetch('http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Class/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: JSON.stringify(responseJson)
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                <Text style={styles.welcome}>Request Example</Text>
                <Text style={styles.instructions}>
                    {this.state.data}
                </Text>
                <Text style={styles.welcome}>For More:</Text>
                <Text style={styles.instructions}>https://reactnative.cn/docs/network/</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
