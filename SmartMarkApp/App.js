/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator,
} from "react-navigation";
import TestAuthScreen from "./modules/TestAuthScreen";
import TestContentScreen from "./modules/TestContentScreen";
import HomePage from "./modules/home/HomePage";
import Teacher from "./modules/teacher/Teacher";
import Settings from "./modules/Settings";
import {Icon} from "@ant-design/react-native";

const BottomTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({focused, tintColor}) => (<Icon name='home' color={tintColor}/>),
            },
        },
        Homework: {
            screen: Teacher,
            navigationOptions: {
                tabBarLabel: "Homework",
                tabBarIcon: ({focused, tintColor}) => (<Icon name='profile' color={tintColor}/>),
            },
        },
        Setting: {
            screen: Settings,
            navigationOptions: {
                tabBarLabel: "Settings",
                tabBarIcon: ({focused, tintColor}) => (<Icon name='setting' color={tintColor}/>),
            },
        },
    },
    {
        initialRouteName: 'Home'
    }
);
BottomTabNavigator.navigationOptions = {header: null};
const MainNavigator = createStackNavigator(
    {
        MainPage: BottomTabNavigator,
        Content: TestContentScreen
    },
    {
        initialRouteName: 'MainPage'
    }
);
const AppNavigator = createSwitchNavigator(
    {
        App: MainNavigator,
        Auth: TestAuthScreen
    },
    {
        initialRouteName: 'Auth'
    }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return <AppContainer/>;
    }
}

