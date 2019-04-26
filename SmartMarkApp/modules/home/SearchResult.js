import React, {Component} from 'react';
import {Text, View, Image, FlatList} from 'react-native';
import List from "@ant-design/react-native/es/list";
import Item from "@ant-design/react-native/es/list/ListItem";

type Props = {};
export default class SearchResult extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            searched: false,
            search: '',
            data: [],
        };
    }

    static getDerivedStateFromProps(nextProps) {
        return {...nextProps};
    }

    render() {
        return (
            this.state.searched ?
                <View style={{width: '100%', flex: 1}}>
                    <List renderHeader={`以下是 "${this.state.search}" 的搜索结果`}/>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item, index, separators}) =>
                            <Item key={item.id}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image
                                        key={item.id}
                                        style={{height: 150, width: 100, resizeMode: 'contain'}}
                                        source={{uri: item.url}}
                                    />
                                    <View style={{marginLeft: 8}}>
                                        <Text>{item.bookid.title}</Text>
                                        <Text>{item.bookid.info}</Text>
                                    </View>
                                </View>
                            </Item>
                        }/>
                </View>
                :
                <View style={{width: '100%', flex: 1}}>
                    <List renderHeader={`搜索：${this.state.search}`}/>
                </View>
        );
    }
}

