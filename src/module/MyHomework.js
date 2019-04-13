import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Card,Row,Col,Icon,Button,Typography,Divider,Progress,Steps} from 'antd';
import 'antd/dist/antd.css'

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
    render(){
        return(

            <Card
                type="inner"
                title="作业"
            >
                <Row>
                    <Steps current={this.props.data.type}>
                        <Step title="已发布" icon={<Icon type="file" />} />
                        <Step title="等待完成" icon={<Icon type="highlight" />} />
                        <Step title="已提交批注" icon={<Icon type="check-circle" />} />
                    </Steps>
                </Row>
                <br />
                <Row>
                    <Col span={8}>
                        <h1>{this.props.data.bookname}</h1>
                    </Col>
                    <Col span={10}>
                    </Col>
                    <Col span={6}>
                        <div className="rightThings">
                            <Icon type="clock-circle" theme="twoTone" />&nbsp;<text display="inline" >{this.props.data.time} 截止</text>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <Card>
                            <Text>{this.props.data.homeworkRequest}</Text>
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
                        <Button type="primary" className="rightThings">
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
                    <Col span={8}>
                        <h1>{this.props.data.bookname}</h1>
                    </Col>
                    <Col span={10}>
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
                        <Text>{this.props.data.homeworkRequest}</Text>
                        <Divider>
                        </Divider>
                        <Card>
                            <Text>
                                {this.props.data.teacherComment}
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
                <Col span={8}>
                    <h1>{this.props.data.bookname}</h1>
                </Col>
                <Col span={10}>
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
                    <Text>{this.props.data.homeworkRequest}</Text>
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
        return <div>{this.props.homeworkData.map(item =>{
                let timestamp = new Date(item.time).getTime();
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
            let timestamp = new Date(item.time).getTime();
            if(timestamp<=this.props.nowTime) {
                if (item.type === 1) {
                    return <div><UnfinishedHomework data={item}/>
                        <br/></div>;
                }
                else {
                    return <div><FinishedHomework data={item}/><br/></div>;
                }
            }
        })
        }</div>;
    }
}

// const contentListNoTitle = {
//     进行中: <Card
//         type="inner"
//         title="作业"
//     >
//         <Row>
//             <Steps current={1}>
//                 <Step title="已发布" icon={<Icon type="file" />} />
//                 <Step title="等待完成" icon={<Icon type="highlight" />} />
//                 <Step title="已提交批注" icon={<Icon type="check-circle" />} />
//             </Steps>
//         </Row>
//         <br />
//         <Row>
//             <Col span={8}>
//                 <h1>爱丽丝漫游仙境</h1>
//             </Col>
//             <Col span={10}>
//             </Col>
//             <Col span={6}>
//                 <div className="rightThings">
//                 <Icon type="clock-circle" theme="twoTone" />&nbsp;<text display="inline" >2019/4/12 23:59:59 截止</text>
//                 </div>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//             </Col>
//             <Col>
//                 <Card>
//                 <Text>{homeworkRequest}</Text>
//                 </Card>
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//         <br />
//         <Row>
//             <Col span={1}>
//             </Col>
//             <Col span={22}>
//             <Button type="primary" className="rightThings">
//                 去做作业<Icon type="right" />
//             </Button>
//             </Col>
//             <Col span={1}>
//             </Col>
//         </Row>
//
//     </Card>,
//     已完成: <div>
//         <Card
//         type="inner"
//         title="作业"
//     >
//         <Row>
//             <Col span={8}>
//                 <h1>爱丽丝漫游仙境</h1>
//             </Col>
//             <Col span={10}>
//             </Col>
//             <Col span={6}>
//                 <div className="rightThings">
//                     <h1><font color="#1e90ff">95 分</font></h1>
//                 </div>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//             </Col>
//             <Col>
//                 <Text>{homeworkRequest}</Text>
//                 <Divider>
//                 </Divider>
//                 <Card>
//                     <Text>
//                         {teacherComment}
//                     </Text>
//                 </Card>
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//         <br />
//
//     </Card>
//         <br/>
//         <Card
//             type="inner"
//             title="作业"
//         >
//             <Row>
//                 <Col span={8}>
//                     <h1>乡村爱情故事</h1>
//                 </Col>
//                 <Col span={10}>
//                 </Col>
//                 <Col span={6}>
//                     <div className="rightThings">
//                         <Icon type="close-circle" theme="twoTone" twoToneColor="#FF0000"/>&nbsp;<text display="inline" >已错过提交时间</text>
//                     </div>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                 </Col>
//                 <Col>
//                     <Text>{homeworkRequest}</Text>
//                 </Col>
//                 <Col>
//                 </Col>
//             </Row>
//             <br />
//
//         </Card>
//     </div>,
// };


class HomeworkTest extends React.Component {
    state = {
        key: 'tab1',
        noTitleKey: '进行中',
        data:[{
            bookname: "爱丽丝漫游仙境",
            time:"2019/4/20 23:59:59",
            homeworkRequest:"这就是详细作业要求，赏析这篇文章，批注不少于8句,重点分析这篇文章的写作手法和特定时代背景下的意义大厦将颠卡萨很快就收到货健康的撒谎侃大山",
            type:1,
            teacherComment:"教师尚未批阅",
            score:0,
        },{
            bookname: "红楼梦",
            time:"2019/4/10 23:59:59",
            homeworkRequest:"很快就收到货健康的撒谎侃大山大喊大叫奥斯卡和但萨较大时可能看就卡萨肯定会看见爱上看见会计师能打开的内裤是哪款",
            type:2,
            teacherComment:"完成的很好啥的金黄色即可打虎撒得很快圣诞节客户端看撒谎的撒即可打火机卡刷的卡十多块使雕件客单价的好时机卡回单卡是哪家的哈萨克打卡点时空师大会尽",
            score:95,
        },{
            bookname: "乡村爱情故事",
            time:"2019/4/20 23:59:59",
            homeworkRequest:"这篇文章的写作手法和特定时代背景下的意义大厦将颠卡萨很快就收到货健康的撒谎侃大山",
            type:2,
            teacherComment:"教师尚未批阅",
            score:0,
        },{
            bookname: "百年孤独",
            time:"2019/4/10 23:59:59",
            homeworkRequest:"的好时机阿卡电话卡手机号客户端看撒谎的看啥看见好卡很多看撒谎的客户卡萨看的萨博的卡号上半场答辩就科技大河健康大会",
            type:1,
            teacherComment:"教师尚未批阅",
            score:0,
        }],
    };

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    }

    render() {

        let homeworkData=this.state.data;
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
            进行中:<InProgressResult homeworkData={homeworkData} nowTime={nowTime}/>,
            已完成:<FinishedResult homeworkData={homeworkData} nowTime={nowTime}/>,
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
