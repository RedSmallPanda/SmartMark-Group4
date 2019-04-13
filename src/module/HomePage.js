import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Card, Row, Col, message, Divider} from 'antd';

const testImg = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555149598771&di=cc9731ab518cf536911ef138782ec329&imgtype=0&src=http%3A%2F%2Fwww.kfzimg.com%2FG06%2FM00%2FD0%2FCC%2Fp4YBAFq49ZuAGMHzAAEH07dRn8A748_b.jpg";
const { Meta } = Card;
class HomePage extends Component {

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.state = {
            mouseOver: 0,
            data: [{
                id: 1,
                title: '数据挖掘概念与技术',
                info: 'introduction of the book'
            }, {
                id: 2,
                title: '软件测试',
                info: '一个软件工艺师的方法'
            }, {
                id: 3,
                title: '大学数学',
                info: '微积分'
            }, {
                id: 4,
                title: '大学数学',
                info: '微积分'
            }, {
                id: 5,
                title: '大学数学',
                info: '微积分'
            }, ]
        };
        this.postResource = this.postResource.bind(this);
        this.renderBook = this.renderBook.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    postResource() {
        this.xmlhttp.open("POST", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Sentence/", true);
        this.xmlhttp.setRequestHeader("Content-Type","application/json");
        let data = JSON.stringify({
            "sentencecontent": "test value"
        });
        this.xmlhttp.send(data);
    }

    handleMouseOver(id) {
        this.setState({mouseOver: id});
    }

    handleMouseOut(id) {
        if (this.state.mouseOver === id) {
            this.setState({mouseOver: 0});
        }
    }

    handleClick(id) {
        window.location.href = "/content/" + id;
        // window.location.assign("/content/" + id);
    }

    renderBook() {
        const self = this;
        return (
            this.state.data.map(item =>
                <Col span={item.id === self.state.mouseOver ? 8 : 4}>
                    <Card style={{width: 160, height: 320, marginTop: 6}} hoverable
                          cover={<img style={{width: 160}} src={testImg}/>}
                          onMouseOver={() => self.handleMouseOver(item.id)}
                          onMouseOut={() => self.handleMouseOut(item.id)}
                          onClick={() => self.handleClick(item.id)}>
                        <Meta
                            title={item.title}
                            description={item.info}
                        />
                    </Card>
                </Col>
            )
        );
    }

    render() {
        return (
            <div className="HomePage">
                <Link to='/'>back to app</Link><br/>
                <Col span={4}/>
                <Col span={10}/>
                <Col span={6}>
                    <h2 align="right">我的书架</h2>
                    <Row>{this.renderBook()}</Row>
                </Col>
                <Col span={4}/>
                <Divider/>
            </div>
        );
    }
}

export default HomePage;

