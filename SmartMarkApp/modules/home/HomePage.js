import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {SearchBar} from "@ant-design/react-native";
import SearchResult from "./SearchResult";

type Props = {};
export default class HomePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            toSearch: false,
            searched: false,
            search: '',
            data: [],
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
                        />
                        :
                        <Text>home page</Text>
                }
            </View>
        );
    }
}
