import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {SearchBar, WhiteSpace, Icon} from "@ant-design/react-native";
import SearchResult from "./SearchResult";

type Props = {};
export default class HomePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            toSearch: false,
            searched: false,
            search: '',
            searchData: [],
            data: [],
            showHistory: true,
        };
    }

    onChange = (value) => {
        this.setState({search: value, toSearch: value !== ''})
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
                        searchData: responseJson.Cover
                    })
                } else {
                    this.setState({
                        searched: true,
                        toSearch: true,
                        searchData: []
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

    onNavigate = (bookId) => {
        this.props.navigation.navigate(
            'Content',
            {bookId: bookId}
        );
    };

    hideHistory = (e) => {
        e.preventDefault();
        this.setState({showHistory: false})
    };

    componentDidMount() {
        fetch("http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Cover/")
            .then((response) => response.json())
            .then((responseJson) => {
                let coverData = responseJson.hasOwnProperty("Cover") ? responseJson.Cover : [];

                fetch("http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Mark/")
                    .then((response) => response.json())
                    .then((responseJson) => {
                        let markData = responseJson.hasOwnProperty("Mark") ? responseJson.Mark : [];
                        console.log(markData);
                        let bookList = {};
                        // if (Cookies.get("userid") == null) {
                        //     return;
                        // }
                        //let ckUID = parseInt(Cookies.get("userid"));
                        let ckUID = 1555599840309;
                        for (let mark in markData) { //这个语法对吗？
                            console.log(mark);
                            if (markData[mark].userid.id === ckUID) {
                                bookList["id" + markData[mark].bookid.id] = 1;
                            }
                        }
                        let similarUser = {};
                        for (let mark in markData) {
                            if (markData[mark].userid.id !== ckUID) {
                                if (!similarUser.hasOwnProperty("id" + markData[mark].userid.id)) {
                                    similarUser["id" + markData[mark].userid.id] = {count: 0, books: []};
                                }
                                if (bookList.hasOwnProperty("id" + markData[mark].bookid.id)) {
                                    similarUser["id" + markData[mark].userid.id].count++;
                                }
                                similarUser["id" + markData[mark].userid.id].books.push(markData[mark].bookid);
                            }
                        }

                        let mostSimilarUser = [];
                        for (let user in similarUser) {
                            mostSimilarUser.push({
                                userId: user, //key
                                userCount: similarUser[user].count,
                            });
                        }


                        mostSimilarUser.sort((a, b) => {
                            return b.userCount - a.userCount;
                        });
                        console.log(mostSimilarUser);
                        let bookRes = [];
                        let bookNum = 0;
                        let uid;
                        for (let i = 0; i < mostSimilarUser.length; i++) {
                            if (bookNum >= 5) {
                                break;
                            }
                            uid = mostSimilarUser[i].userId;
                            let tempBooks = {};
                            for (let book in similarUser[uid].books) {
                                if (!tempBooks.hasOwnProperty("id" + similarUser[uid].books[book].id)) {
                                    if (bookNum >= 5) {
                                        break;
                                    }
                                    tempBooks["id" + similarUser[uid].books[book].id] = similarUser[uid].books[book];
                                    bookRes.push(similarUser[uid].books[book]);
                                    bookNum++;
                                }
                            }

                        }
                        let cvData = coverData;
                        let coverRes = [];
                        for (let book in bookRes) {
                            for (let cover in cvData) {
                                if (cvData[cover].bookid.id === bookRes[book].id) {
                                    coverRes.push(cvData[cover]);
                                }
                            }
                        }

                        console.log(coverRes);
                        this.setState({
                            data: coverRes,
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    renderRecommend = () => {
        let self = this;
        let recommendList = [];
        let recommend = [];
        for (let i = 0; i < this.state.data.length; i += 3) {
            for (let j = 0; j < 3 && i + j < this.state.data.length; j++) {
                recommend.push(
                    <View style={{width: '33%', height: 220, padding: 5}}>
                        <Image source={{uri: this.state.data[i + j].url}}
                               style={{height: 160, resizeMode: 'contain'}}
                        />
                        <Text onPress={() => this.onNavigate(this.state.data[i + j].bookid.id)}>
                            {this.state.data[i + j].bookid.title}
                        </Text>
                        <Text>{this.state.data[i + j].bookid.info}</Text>
                    </View>
                );
            }
            recommendList.push(
                <View style={{flex: 1, flexDirection: 'row', height: 220}}>
                    {recommend}
                </View>
            );
            recommend = [];

        }
        return <View>{recommendList}</View>;
    };

    render() {
        return (
            <ScrollView style={{width: '100%', flex: 1}}>
                <SearchBar
                    value={this.state.search}
                    placeholder="搜索"
                    onSubmit={this.onSubmit}
                    onCancel={this.clear}
                    onChange={this.onChange}
                    // onFocus={this.onFocus}
                    // showCancelButton
                />
                {
                    this.state.toSearch ?
                        <SearchResult
                            searched={this.state.searched}
                            search={this.state.search}
                            data={this.state.searchData}
                            onNavigate={this.onNavigate.bind(this)}
                        />
                        :
                        <View>
                            {
                                this.state.showHistory
                                &&
                                <Text style={{...styles.column, width: '100%'}}
                                      onPress={() => this.onNavigate(1555942146453)}>
                                    上次阅读&ensp;
                                    <Text style={{fontSize: 15, width: 150}}>目送</Text>
                                    {/*<Icon name='close' onPress={this.hideHistory}/>*/}
                                </Text>
                            }
                            <Text style={styles.column}>为你推荐</Text>
                            {
                                this.renderRecommend()
                            }
                        </View>
                }
            </ScrollView>
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