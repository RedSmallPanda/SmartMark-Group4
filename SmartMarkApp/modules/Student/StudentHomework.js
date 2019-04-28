import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Card, WhiteSpace, WingBlank ,Flex,Button,Icon} from '@ant-design/react-native';
import moment from "moment";

type props = {};

class Homework extends Component<props>{
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render(){
        return(
                <Card style={{width:350}}>
                    <Card.Header
                        title={this.props.data.homeworkid.bookid.title}
                        //thumbStyle={{ width: 30, height: 30 }}
                        extra={moment(this.props.data.homeworkid.deadline).format("YYYY/MM/DD HH:mm:ss")+" 截止"}
                    />
                    <Card.Body>
                        <View>
                            <Text style={{ marginLeft: 16 }}>{this.props.data.homeworkid.description}</Text>
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                        </View>
                        <Flex>
                            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                            </Flex.Item>
                            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                            </Flex.Item>
                            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                                <Button size="small" type="primary">去做作业 ></Button>
                            </Flex.Item>
                        </Flex>
                    </Card.Body>
                </Card>
        );
    }
}

class InProgressResult extends Component<props>{
    constructor(props) {
        super(props);
    }

    render(){
        let self=this;
        //console.log(this.props.homeworkData);
        return <View>{self.props.homeworkData.map(function(item){
                let timestamp = new Date(item["homeworkid"].deadline).getTime();
                if(timestamp>self.props.nowTime) {
                    return <View><Homework data={item}/><WhiteSpace size="lg" /></View>;
                }
            }
        )}</View>;
    }
}


export default class StudentHomework extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "homeworkid":{
                        "bookid":{"title":"asdasd"},
                        "deadline":"2019/5/1 23:59:59"
                    }
                }
            ]
        };
    }

    componentDidMount() {
        fetch('http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Grade/?Grade.userid.username=Tom')//暂时写死username
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.hasOwnProperty("Grade")?responseJson.Grade:[],
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        let nowTime=new Date().getTime();
        return (
            <View>
            <InProgressResult homeworkData={this.state.data} nowTime={nowTime} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
