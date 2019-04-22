import React, {Component} from 'react';
import {Card, Row, Col, PageHeader, message, Button, Icon} from 'antd';
import Cookies from 'js-cookie';

const testImg = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555149598771&di=cc9731ab518cf536911ef138782ec329&imgtype=0&src=http%3A%2F%2Fwww.kfzimg.com%2FG06%2FM00%2FD0%2FCC%2Fp4YBAFq49ZuAGMHzAAEH07dRn8A748_b.jpg";
const {Meta} = Card;

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mouseOver: 0,//cover id
            closeCrossColor: '#ccc',
            lastRead: {
                id: 1555942146453,
                title: '目送',
                info: '龙应台作品'
            },
            data: [{
                id: 11,
                url: testImg,
                bookid: {
                    id: 1,
                    title: '数据挖掘概念与技术',
                    info: 'introduction of the book'
                }
            }, {
                id: 12,
                url: testImg,
                bookid: {
                    id: 2,
                    title: '软件测试',
                    info: '一个软件工艺师的方法'
                }
            }, {
                id: 13,
                url: testImg,
                bookid: {
                    id: 3,
                    title: '大学数学',
                    info: '微积分'
                }
            },]
        };
        this.renderBook = this.renderBook.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    renderLastRead = () => {
        return (
            this.state.lastRead !== null &&
            <PageHeader style={{border: '1px #ccc solid', borderRadius: 8}}
                        title="上次阅读" subTitle={"《" + this.state.lastRead.title + "》--- " + this.state.lastRead.info}
                        extra={[
                            <Button onClick={() => window.location.href = "/content/" + this.state.lastRead.id}>
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"/>
                                &ensp;继续阅读
                            </Button>,
                            <a style={{textDecoration: 'underline', paddingLeft: 12}}
                               onClick={this.cancelLastRead}>不再提示</a>,
                            <a style={{color: this.state.closeCrossColor, paddingLeft: 12}}
                               onMouseOver={() => this.setState({closeCrossColor: '#777'})}
                               onMouseOut={() => this.setState({closeCrossColor: '#ccc'})}
                               onClick={this.cancelLastRead}>
                                <Icon type="close-circle" theme="filled"/>
                            </a>
                        ]}>
            </PageHeader>
        );
    };

    cancelLastRead = () => {
        this.setState({lastRead: null})
    };

    handleMouseOver(id) {
        this.setState({mouseOver: id});
    }

    handleMouseOut(id) {
        if (this.state.mouseOver === id) {
            this.setState({mouseOver: 0});
        }
    }

    handleClick(bookId) {
        window.location.href = "/content/" + bookId;
    }

    renderBook() {
        const self = this;
        return (
            this.state.data.map(item =>
                <Col span={item.id === self.state.mouseOver ? 4 : 4}>
                    <Card style={{width: 180, height: 350, marginTop: 6}} hoverable
                          cover={<img style={{width: 178}} src={item.url}/>}
                          onMouseOver={() => self.handleMouseOver(item.id)}
                          onMouseOut={() => self.handleMouseOut(item.id)}
                          onClick={() => self.handleClick(item.bookid.id)}>
                        <Meta
                            title={item.bookid.title}
                            description={item.bookid.info}
                        />
                    </Card>
                </Col>
            )
        );
    }

    sendIndividualRequest = () => {
        let msg = window.confirm("确认发送？（请仔细检查url）");
        if (msg) {
            let request = new XMLHttpRequest();
            request.open("PUT", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Cover/1555590059263", true);
            request.setRequestHeader("Content-Type", "application/json");
            let data = JSON.stringify({
                url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555953285088&di=4ff02952c1e5c8bf852b3516ddb68ae2&imgtype=0&src=http%3A%2F%2Fimg.11665.com%2Fimage_p2%2Fi7%2FT1viWTXqJcXXagOFbX.jpeg",
                bookid: {
                    id: 1555590059092
                },
            });
            // request.send(data);
        } else {
            message.info("没发送");
        }
    };

    render() {
        return (
            <div className="HomePage">
                <Row style={{paddingTop: 15}}>
                    <Col span={4}/>
                    <Col span={16}>
                        {this.renderLastRead()}
                    </Col>
                </Row>
                <Row style={{paddingTop: 40}}>
                    <Col span={4}/>
                    <Col span={20}>
                        <h2>为你推荐</h2>
                        <Row>{this.renderBook()}</Row>
                    </Col>
                </Row>
                <Button htmlType={'button'} onClick={this.sendIndividualRequest} type={'danger'}>send individual
                    request</Button>
            </div>
        );
    }

    componentDidMount() {
        let coverHttp = new XMLHttpRequest();
        coverHttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Cover/", true);
        coverHttp.onreadystatechange = () => {
            if (coverHttp.readyState === 4 && coverHttp.status === 200) {
                let coverData = JSON.parse(coverHttp.responseText).hasOwnProperty("Cover") ? JSON.parse(coverHttp.responseText).Cover : [];

                let newHttp = new XMLHttpRequest();
                newHttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Mark/", true);
                newHttp.onreadystatechange = () => {
                    if (newHttp.readyState === 4 && newHttp.status === 200) {
                        let markData = JSON.parse(newHttp.responseText).hasOwnProperty("Mark") ? JSON.parse(newHttp.responseText).Mark : [];
                        console.log(markData);
                        let bookList = {};
                        if (Cookies.get("userid") == null) {
                            return;
                        }
                        let ckUID = parseInt(Cookies.get("userid"));
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
                        for (var user in similarUser) {
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


                    }
                };
                newHttp.send();
            }
        };
        coverHttp.send();

    }
}

export default HomePage;

