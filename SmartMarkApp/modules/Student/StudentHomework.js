import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Card, WhiteSpace, WingBlank, Flex, Button, Icon} from '@ant-design/react-native';
import moment from "moment";

type Props = {};
export default class StudentHomework extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "homeworkid": {
                        "bookid": {"title": "asdasd"},
                        "deadline": "2019/5/1 23:59:59"
                    }
                }
            ]
        };
        this.onNavigation = this.onNavigation.bind(this);
    }

    componentDidMount() {
        fetch('http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Grade/?Grade.userid.username=Tom')//暂时写死username
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.hasOwnProperty("Grade") ? responseJson.Grade : [],
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onNavigation(bookId) {
        this.props.navigation.navigate("Content", {bookId: bookId});
    }

    render() {
        let nowTime = new Date().getTime();
        let self = this;
        let homeworkData = this.state.data;
        //console.log(this.props.homeworkData);
        return <View>{homeworkData.map(function (item) {
                let timestamp = new Date(item["homeworkid"].deadline).getTime();
                if (timestamp > nowTime) {
                    return (
                        <View style={{paddingLeft: '5%', paddingRight: '5%'}}>
                            <WhiteSpace size="lg"/>
                            <Card style={{width: '100%'}}>
                                <Card.Header
                                    title={item.homeworkid.bookid.title}
                                    //thumbStyle={{ width: 30, height: 30 }}
                                    extra={moment(item.homeworkid.deadline).format("YYYY/MM/DD HH:mm:ss") + " 截止"}
                                />
                                <Card.Body>
                                    <View>
                                        <Text style={{marginLeft: 16}}>{item.homeworkid.description}</Text>
                                        <WhiteSpace size="lg"/>
                                        <WhiteSpace size="lg"/>
                                    </View>
                                    <Flex>
                                        <Flex.Item style={{paddingLeft: 4, paddingRight: 4}}>
                                        </Flex.Item>
                                        <Flex.Item style={{paddingLeft: 4, paddingRight: 4}}>
                                        </Flex.Item>
                                        <Flex.Item style={{paddingLeft: 4, paddingRight: 4}}>
                                            <Button size="small" type="primary"
                                                    onPress={() => self.onNavigation(item.homeworkid.bookid.id)}>去做作业 ></Button>
                                        </Flex.Item>
                                    </Flex>
                                </Card.Body>
                            </Card>
                        </View>
                    );
                }
            }
        )}</View>;
    }
}

