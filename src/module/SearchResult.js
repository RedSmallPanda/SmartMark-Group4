import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Card, Row, Col, message, Divider} from 'antd';
import List from "antd/es/list";
import Empty from "antd/es/empty";

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.xmlhttp = new XMLHttpRequest();
        this.state = {
            search: window.location.search,
            loading: true,
            mouseOver: 0,
            data: [],
        };
        this.getResource = this.getResource.bind(this);
        this.renderResult = this.renderResult.bind(this);
    }

    componentDidMount() {
        this.getResource();
    }

    getResource() {
        this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Cover/", true);
        this.xmlhttp.onreadystatechange = () => {
            if (this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
                let coverList = JSON.parse(this.xmlhttp.responseText);
                if (coverList.hasOwnProperty("Cover")) {
                    this.setState({
                        loading: false,
                        data: coverList["Cover"],
                    });
                }
            } else if (this.xmlhttp.readyState === 4) {
                this.setState({
                    loading: false,
                });
                message.error('> BookPicker < get book Failure.', 8);
            }
        };
        this.xmlhttp.send();
    }

    renderResult() {
        const self = this;
        return (
            <List
                itemLayout="horizontal"
                dataSource={self.state.data}
                renderItem={item => {
                    let queryStr = decodeURI(this.state.search);
                    queryStr = queryStr.substring(1, queryStr.length).toLowerCase();
                    return item.bookid.title.toLowerCase().indexOf(queryStr) === -1 ?
                        <div/> :
                        <List.Item>
                            <List.Item.Meta
                                avatar={<img style={{height: 220}} src={item.url}/>}
                                title={
                                    <div style={{paddingTop: 10, paddingBottom: 10}}>
                                        <a style={{fontSize: 25}}
                                           href={"/content/" + item.bookid.id}>{item.bookid.title}</a>
                                    </div>
                                }
                                description={item.bookid.info}
                            />
                            <div style={{paddingRight: 120, textAlign: 'right', verticalAlign: 'bottom', height: 0}}>
                                <a href={"/content/" + item.bookid.id} style={{fontSize: 20}}>
                                    前往阅读
                                </a>
                            </div>
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

