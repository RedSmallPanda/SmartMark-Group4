/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Icon, TabBar} from '@ant-design/react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'homeTab',
        };
    }

    onChangeTab(tabName) {
        this.setState({
            selectedTab: tabName,
        });
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="#f5f5f5"
            >
                <TabBar.Item title="Home" icon={<Icon name="home"/>}
                             selected={this.state.selectedTab === 'homeTab'}
                             onPress={() => this.onChangeTab('homeTab')}
                >
                    <View style={styles.container}>
                        <Text style={styles.welcome}>Smart Mark APP</Text>
                        <Text style={styles.welcome}>Welcome to React Native!</Text>
                    </View>
                </TabBar.Item>
                <TabBar.Item title="Instruction" icon={<Icon name="home"/>}
                             selected={this.state.selectedTab === 'instructionTab'}
                             onPress={() => this.onChangeTab('instructionTab')}
                >
                    <View style={styles.container}>
                        <Text style={styles.instructions}>To get started, edit App.js</Text>
                        <Text style={styles.instructions}>{instructions}</Text>
                    </View>
                </TabBar.Item>
            </TabBar>
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
