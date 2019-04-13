import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Card, Row, Col, message, Divider} from 'antd';
import List from "antd/es/list";

const testImg = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555149598771&di=cc9731ab518cf536911ef138782ec329&imgtype=0&src=http%3A%2F%2Fwww.kfzimg.com%2FG06%2FM00%2FD0%2FCC%2Fp4YBAFq49ZuAGMHzAAEH07dRn8A748_b.jpg";
const testData = [{
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
}, {
    id: 6,
    title: '大学数学',
    info: '微积分'
}, {
    id: 7,
    title: '大学数学',
    info: '微积分'
},];

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.state = {
            search: window.location.search,
            mouseOver: 0,
            data: testData,
        };
        this.postResource = this.postResource.bind(this);
        this.renderResult = this.renderResult.bind(this);
    }

    postResource() {
        // this.xmlhttp.open("POST", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Sentence/", true);
        // this.xmlhttp.setRequestHeader("Content-Type","application/json");
        // let data = JSON.stringify({
        //     "sentencecontent": "test value"
        // });
        // this.xmlhttp.send(data);
    }

    renderResult() {
        const self = this;
        return (
            <List
                itemLayout="horizontal"
                dataSource={self.state.data}
                renderItem={item => {
                    return item.title.indexOf(decodeURI(this.state.search).substring(1, decodeURI(this.state.search).length)) === -1?
                        <div/> :
                        <List.Item>
                            <List.Item.Meta
                                avatar={<img style={{height: 220}} src={testImg}/>}
                                title={
                                    <div style={{paddingTop: 10, paddingBottom: 10}}>
                                        <a style={{fontSize: 25}} href={"/content/" + item.id}>{item.title}</a>
                                    </div>
                                }
                                description={item.info}
                            />
                            <div style={{paddingRight: 200, textAlign: 'right', verticalAlign: 'bottom'}}>Content</div>
                        </List.Item>;
                }}
            />
        );
    }

    render() {
        return (
            <div className="SearchResult">
                <Col span={4}/>
                <Col span={16}>
                    <h2>搜索结果</h2>
                    <Row>{this.renderResult()}</Row>
                </Col>
                <Col span={4}/>
            </div>
        );
    }
}

export default SearchResult;

