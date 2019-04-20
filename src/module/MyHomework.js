import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Card,Row,Col,Icon,Button,Typography,Divider,Progress,Steps} from 'antd';
import 'antd/dist/antd.css';
import Cookies from "js-cookie";
import moment from "moment";

const {Text}=Typography;
const {Title}=Typography;

const Step = Steps.Step;

const tabListNoTitle = [{
    key: '进行中',
    tab: '进行中',
}, {
    key: '已完成',
    tab: '已完成',
}];

let homeworkRequest="这就是详细作业要求，赏析这篇文章，批注不少于8句,重点分析这篇文章的写作手法和特定时代背景下的意义大厦将颠卡萨很快就收到货健康的撒谎侃大山";

let teacherComment="完成的很好啥的金黄色即可打虎撒得很快圣诞节客户端看撒谎的撒即可打火机卡刷的卡十多块使雕件客单价的好时机卡回单卡是哪家的哈萨克打卡点时空师大会尽快";

class InProgressHomework extends Component{
    gotoHomework(id){
        window.location.href = "/content/"+id;
    }

    render(){


        return(

            <Card
                type="inner"
                title="作业"
            >
                <Row>
                    {/*<Steps current={this.props.data.type}>*/}
                        {/*<Step title="已发布" icon={<Icon type="file" />} />*/}
                        {/*<Step title="等待完成" icon={<Icon type="highlight" />} />*/}
                        {/*<Step title="已提交批注" icon={<Icon type="check-circle" />} />*/}
                    {/*</Steps>*/}
                    <Progress
                        strokeColor={{
                            // '0%': '#74E046',
                            //  '50': '#FFAF2B',
                            // '100%': '#FFF22B',

                            '0%': '#9CECFB',
                            '50': '#65C7F7',
                            '100%': '#0052d4',
                        }}
                        strokeWidth={3}
                        percent={100}
                        showInfo={false}
                    />
                </Row>
                <br />
                <Row>
                    <Col span={16}>
                        <h1>{this.props.data.homeworkid.bookid.title}</h1>
                    </Col>
                    <Col span={2}>
                    </Col>
                    <Col span={6}>
                        <div className="rightThings">
                            <Icon type="clock-circle" theme="twoTone" />&nbsp;<text display="inline" >{moment(this.props.data.homeworkid.deadline).format("YYYY/MM/DD HH:mm:ss")} 截止</text>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <Card>
                            <Text>{this.props.data.homeworkid.description}</Text>
                        </Card>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={1}>
                    </Col>
                    <Col span={22}>
                        <Button type="primary" className="rightThings" onClick={()=>this.gotoHomework(this.props.data.homeworkid.bookid.id)}>
                            去做作业<Icon type="right" />
                        </Button>
                    </Col>
                    <Col span={1}>
                    </Col>
                </Row>
                <br/>
            </Card>

        )
    }
}

class FinishedHomework extends Component{
    render(){
        return(

            <Card
                type="inner"
                title="作业"
            >
                <Row>
                    <Col span={16}>
                        <h1>{this.props.data.homeworkid.bookid.title}</h1>
                    </Col>
                    <Col span={2}>
                    </Col>
                    <Col span={6}>
                        <div className="rightThings">
                            <h1><font color="#1e90ff">{this.props.data.score} 分</font></h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <Text>{this.props.data.homeworkid.description}</Text>
                        <Divider>
                        </Divider>
                        <Card>
                            <Text>
                                {this.props.data.comment}
                            </Text>
                        </Card>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <br />

            </Card>

        )
    }
}

class UnfinishedHomework extends Component{
    render(){
        return(

        <Card
            type="inner"
            title="作业"
        >
            <Row>
                <Col span={16}>
                    <h1>{this.props.data.homeworkid.bookid.title}</h1>
                </Col>
                <Col span={2}>
                </Col>
                <Col span={6}>
                    <div className="rightThings">
                        <Icon type="close-circle" theme="twoTone" twoToneColor="#FF0000"/>&nbsp;<text display="inline" >已错过提交时间</text>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
                <Col>
                    <Text>{this.props.data.homeworkid.description}</Text>
                </Col>
                <Col>
                </Col>
            </Row>
            <br />

        </Card>

        )
    }
}

class InProgressResult extends Component{
    render(){
        //console.log(this.props.homeworkData);
        return <div>{this.props.homeworkData.map(item =>{
                let timestamp = new Date(item["homeworkid"].deadline).getTime();
                if(timestamp>this.props.nowTime) {
                    return <div><InProgressHomework data={item}/><br/></div>;
                }
            }
        )}</div>;
    }
}

class FinishedResult extends Component{
    render(){
        return <div>{this.props.homeworkData.map(item=>{
            let timestamp = new Date(item.homeworkid.deadline).getTime();
            if(timestamp<=this.props.nowTime) {
                reurn <div><FinishedHomework data={item}/>
                    <br/></div>;
                // else {
                //     return <div><FinishedHomework data={item}/><br/></div>;
                // }
            }
        })
        }</div>;
    }
}



class HomeworkTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'tab1',
            noTitleKey: '进行中',
            class:"",
            data: [{
                homeworkid: {
                    deadline: "2019/4/20 23:59:59",
                    description: "这就是详细作业要求，赏析这篇文章，批注不少于8句,重点分析这篇文章的写作手法和特定时代背景下的意义大厦将颠卡萨很快就收到货健康的撒谎侃大山",
                    bookid: {title: "爱丽丝漫游仙境"},
                },
                comment: "教师尚未批阅",
                score: 0,
            }
            // }, {
            //     bookid:{title: "红楼梦"},
            //     deadline: "2019/4/10 23:59:59",
            //     description: "很快就收到货健康的撒谎侃大山大喊大叫奥斯卡和但萨较大时可能看就卡萨肯定会看见爱上看见会计师能打开的内裤是哪款",
            //     type: 2,
            //     teacherComment: "完成的很好啥的金黄色即可打虎撒得很快圣诞节客户端看撒谎的撒即可打火机卡刷的卡十多块使雕件客单价的好时机卡回单卡是哪家的哈萨克打卡点时空师大会尽",
            //     score: 95,
            // }, {
            //     bookid:{title: "乡村爱情故事"},
            //     deadline: "2019/4/20 23:59:59",
            //     description: "这篇文章的写作手法和特定时代背景下的意义大厦将颠卡萨很快就收到货健康的撒谎侃大山",
            //     type: 2,
            //     teacherComment: "教师尚未批阅",
            //     score: 0,
            // }, {
            //     bookid:{title: "百年孤独"},
            //     deadline: "2019/4/10 23:59:59",
            //     description: "的好时机阿卡电话卡手机号客户端看撒谎的看啥看见好卡很多看撒谎的客户卡萨看的萨博的卡号上半场答辩就科技大河健康大会",
            //     type: 1,
            //     teacherComment: "教师尚未批阅",
            //     score: 0,
            // }
            ],
        };
        this.xmlhttp = new XMLHttpRequest();
        this.homeworkCallback=this.homeworkCallback.bind(this);
        this.classCallback=this.classCallback.bind(this);
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    componentDidMount(){
        let username = Cookies.get('username');
        if(username===""){
            username="Jerry";
        }
        this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Grade/?Grade.userid.username="+username, true);
        //this.xmlhttp.setRequestHeader("Content-Type","application/json");
        this.xmlhttp.onreadystatechange = this.homeworkCallback;
        // let data = JSON.stringify({
        //     "username": username,
        //     "password":"123456",
        //     "auth":"student",
        //     "classid":[{id:1555216961760}],
        // });
        this.xmlhttp.send();
    }

    homeworkCallback(){
        if(this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
            console.log(this.xmlhttp.responseText);
            let data=JSON.parse(this.xmlhttp.responseText).hasOwnProperty("Grade")?JSON.parse(this.xmlhttp.responseText).Grade:[];
            for(let i=0;i<data.length;i++){
                // data[i]["score"]=0;
                // data[i]["type"]=1;
                // data[i]["teacherComment"]="的撒谎的尽快哈开始讲大客户安徽的紧身裤";
                // let mm=moment(data[i].deadline);
                // data[i]["deadline"]=mm.format("YYYY/MM/DD HH:mm:ss");
                if(data[i].score===-1){
                    data[i].score="暂无";
                }
            }
            console.log(data);
            this.setState({data:data});

            // for(let i=0;i<data.length;i++){
            //      this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U13c635fa1f5c90/SmartMark/Grade/?Grade.homeworkid.id="+data[i].id+
            //          "&Grade.userid.username="+Cookies.get('username'), true);
            //      this.xmlhttp.onreadystatechange = ((i)=>this.gradeCallback(i));
            //      this.xmlhttp.send();
            // }
        }
    }


    classCallback(){
        if(this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
            let data=JSON.parse(this.xmlhttp.responseText);
            this.setState({class:data.User[0].classid[0].id});
            this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Homework/?Homework.classid.id="+data.User[0].classid[0].id, true);
            this.xmlhttp.onreadystatechange = this.homeworkCallback;
            this.xmlhttp.send();
        }
    }

    render() {

        // let inProgressArr=[];
        // let finishArr=[];
        let nowTime=new Date().getTime();
        // for(let i=0;i<homeworkData.length;i++){
        //     if(homeworkData[i].time<nowTime) {
        //         let res = <InProgressHomework data={homeworkData[i]} />;
        //         inProgressArr.push(res);
        //     }
        //     else{
        //         if(homeworkData[i].type===1){
        //             let res = <UnfinishedHomework data={homeworkData[i]} />;
        //             finishArr.push(res);
        //         }
        //         else{
        //             let res = <FinishedHomework data={homeworkData[i]} />;
        //             finishArr.push(res);
        //         }
        //     }
        // }


        let contentListNoTitle = {
            进行中:<InProgressResult homeworkData={this.state.data} nowTime={nowTime}/>,
            已完成:<FinishedResult homeworkData={this.state.data} nowTime={nowTime}/>,
        };

        return (
            <div>
                <Row>
                    <Col span={4} />
                    <Col span={16}><Card
                        style={{ width: '100%' }}
                        tabList={tabListNoTitle}
                        activeTabKey={this.state.noTitleKey}
                        onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
                    >
                        {contentListNoTitle[this.state.noTitleKey]}
                    </Card></Col>
                    <Col span={4} />
                </Row>
            </div>
        );
    }
}



export default HomeworkTest;
