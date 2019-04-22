import React, {Component} from 'react';
import {Card, Row, Col, PageHeader, message, Button, Icon} from 'antd';

const testImg = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555149598771&di=cc9731ab518cf536911ef138782ec329&imgtype=0&src=http%3A%2F%2Fwww.kfzimg.com%2FG06%2FM00%2FD0%2FCC%2Fp4YBAFq49ZuAGMHzAAEH07dRn8A748_b.jpg";
const {Meta} = Card;

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mouseOver: 0,//cover id
            closeCrossColor: '#ccc',
            lastRead: {
                id: 1,
                title: '数据挖掘概念与技术',
                info: 'introduction of the book'
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
                        title="上次阅读" subTitle={this.state.lastRead.title}
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
                    <Card style={{width: 160, height: 320, marginTop: 6}} hoverable
                          cover={<img style={{width: 158}} src={item.url}/>}
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
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        {this.renderLastRead()}
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        <h2>为你推荐</h2>
                        <Row>{this.renderBook()}</Row>
                    </Col>
                </Row>

                <Button htmlType={'button'} onClick={this.sendIndividualRequest}>send individual request</Button>

            </div>
        );
    }
}

export default HomePage;

