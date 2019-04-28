import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SearchBar} from "@ant-design/react-native";
import SearchResult from "./SearchResult";
import Icon from "@ant-design/react-native/es/icon";

type Props = {};
export default class HomePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            toSearch: false,
            searched: false,
            search: '',
            data: [],
            showHistory: true,
        };
    }

    onChange = (value) => {
        this.setState({search: value})
    };
    clear = () => {
        this.setState({search: '', toSearch: false})
    };
    onSubmit = () => {
        let searchStr = '';
        if (this.state.search !== '') {
            searchStr = "?Cover.bookid.title=(like)" + this.state.search;
        }
        fetch('http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Cover/' + searchStr)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.hasOwnProperty("Cover")) {
                    this.setState({
                        searched: true,
                        toSearch: true,
                        data: responseJson.Cover
                    })
                } else {
                    this.setState({
                        searched: true,
                        toSearch: true,
                        data: []
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    onFocus = () => {
        this.setState({toSearch: true})
    };

    onNavigate(bookId) {
        this.props.navigation.navigate(
            'Content',
            {bookId: bookId}
        );
    }

    hideHistory = (e) => {
        e.preventDefault();
        this.setState({showHistory: false})
    };

    render() {
        return (
            <View style={{width: '100%', flex: 1}}>
                <SearchBar
                    value={this.state.search}
                    placeholder="搜索"
                    onSubmit={this.onSubmit}
                    onCancel={this.clear}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    // showCancelButton
                />
                {
                    this.state.toSearch ?
                        <SearchResult
                            searched={this.state.searched}
                            search={this.state.search}
                            data={this.state.data}
                            onNavigate={this.onNavigate.bind(this)}
                        />
                        :
                        <View>
                            {
                                this.state.showHistory
                                &&
                                <Text style={styles.column}
                                      onPress={() => this.onNavigate(1555942146453)}>
                                    上次阅读&ensp;
                                    <Text style={{fontSize: 15, flex: 1}}>title</Text>
                                    <Icon name='close' onPress={this.hideHistory}/>
                                </Text>
                            }
                            <Text style={styles.column}>为你推荐</Text>
                            <View style={{flex: 1, flexDirection: 'row', textAlign: 'center'}}>
                                <View style={{flex: 1, height: 100, backgroundColor: '#eee'}}/>
                                <View style={{flex: 1, height: 100, backgroundColor: '#ddd'}}/>
                                <View style={{flex: 1, height: 100, backgroundColor: '#eee'}}/>
                            </View>
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    column: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        flexDirection: 'row',
    },
});