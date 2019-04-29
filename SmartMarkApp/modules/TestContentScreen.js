import React, {Component} from "react";
import {Text, ScrollView,View,Image,StyleSheet,ImageBackground,Modal} from "react-native";

import Popover from "@ant-design/react-native/es/popover";
import Button from "@ant-design/react-native/es/button";
import {List} from "@ant-design/react-native";
import TextAreaItem from "@ant-design/react-native/es/textarea-item";


type Props = {};
export default class TestContentScreen extends Component<Props> {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('titleParam', 'Loading ...'),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            bookid: this.props.navigation.state.params.bookId,
            userid: 1555599840309,
            marks: [],
            content: {},
            supMarkId: 0,
        };
    }

    componentDidMount() {
        this.getSentences();
    }

    getSentences = () => {
        if (this.state.bookid !== undefined && this.state.bookid !== null && this.state.bookid !== '') {
            fetch("http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Sentence/" +
                "?Sentence.bookid.id=" + this.state.bookid)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.hasOwnProperty("Sentence")) {
                        let unsorted = responseJson["Sentence"];
                        this.props.navigation.setParams({titleParam: unsorted[0].bookid.title});
                        this.getMarks(unsorted);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    getMarks = (unsorted) => {
        if (this.state.bookid !== undefined && this.state.bookid !== null && this.state.bookid !== '') {
            if (this.state.userid === undefined || this.state.userid === null || this.state.userid === '') {
                return;
            }
            fetch("http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Mark/" +
                "?Mark.bookid.id=" + this.state.bookid +
                "&Mark.userid.id=" + this.state.userid)
                .then((response) => response.json())
                .then((responseJson) => {
                    let myMarks = [];
                    if (responseJson.hasOwnProperty("Mark")) {
                        myMarks = responseJson["Mark"];
                    }
                    this.sortSentence(unsorted, myMarks);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
    sortSentence = (unsorted, myMarks) => {
        let sorted = {};
        let marks = {};
        unsorted.map(sentence => {
            let paragraphProp = "p" + sentence.paragraph;
            let sequenceProp = "s" + sentence.sequence;
            if (!sorted.hasOwnProperty(paragraphProp)) {
                sorted[paragraphProp] = {};
            }
            if (!sorted[paragraphProp].hasOwnProperty(sequenceProp)) {
                sorted[paragraphProp][sequenceProp] = {};
            }
            sorted[paragraphProp][sequenceProp] = sentence;
            sorted[paragraphProp][sequenceProp]["mark"] = [];
        });
        myMarks.map(mark => {
            marks["id" + mark.id] = mark;
            sorted = this.combineMark(mark, sorted);
        });
        this.setState({
            content: sorted,
            marks: marks,
        });
    };

    combineMark = (mark, sorted) => {
        let p = mark.start.paragraph;
        if (p === mark.end.paragraph) {
            for (let s = mark.start.sequence; s <= mark.end.sequence; s++) {
                sorted["p" + p]["s" + s]["mark"].push(mark);
            }
        } else {
            let from = mark.start.sequence;
            for (; p < mark.end.paragraph; p++) {
                for (let s = from; sorted["p" + p].hasOwnProperty("s" + s); s++) {
                    sorted["p" + p]["s" + s]["mark"].push(mark);
                }
                from = 0;
            }
            if (p === mark.end.paragraph) {
                for (let s = 0; s <= mark.end.sequence; s++) {
                    sorted["p" + p]["s" + s]["mark"].push(mark);
                }
            } else {
                // alert("combine error");
            }
        }
        return sorted;
    };


    onCancel = () => {
        this.setState({
            supMarkId: 0,

        })
    };
    supOnClick = (markId) => {
        this.onCancel();
        this.setState({supMarkId: markId});
    };
    render() {


        let contentRender = [];
        let i = 0;

        let modalvalue="";
        while (this.state.content.hasOwnProperty("p" + i)) {
            let temp_p = this.state.content["p" + i];
            let para = [];
            let j = 0;
            while (temp_p.hasOwnProperty("s" + j)) {
                let temp_s = this.state.content["p" + i]["s" + j];
                if (temp_s.mark.length > 0) {

                        para.push(
                            <Text className='sentence' style={{backgroundColor: "#a2d2cb"
                                ,color: '#2f2f2f',fontSize:20}}

                                  >
                                {temp_s.content}
                            </Text>
                        );


                    for (let m = 0; m < temp_s.mark.length; m++) {
                        if (temp_s.mark[m].end.id === temp_s.id) {
                            if (this.state.supMarkId === temp_s.mark[m].id) {
                                para.push(
                                        <Text style={{color: "blue"}} onPress={() => this.supOnClick((temp_s.mark)[m].id)}>[M]</Text>
                                );
                                modalvalue=this.state.marks[("id" + temp_s.mark[m].id)].content;
                            }
                            else {
                                para.push(
                                    <Text style={{color: "red"}} onPress={() => this.supOnClick((temp_s.mark)[m].id)}>[M]</Text>
                                );
                            }
                        }
                    }
                }
                else {

                        para.push(
                            <Text className='sentence'
                                  style={{
                                      fontSize: 20
                                  }}
                                 >
                                {temp_s.content}
                            </Text>
                        );


                }
                j++;
            }
            contentRender.push(<View ><Text>&ensp;&ensp;&ensp;&ensp;{para}</Text></View>);

           // console.log(para);
            i++;

        }
        if(this.state.supMarkId!==0) {
            contentRender.push(<View style={{flex: 1}}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.supMarkId !== 0}
                    onRequestClose={() => {
                        this.onCancel();
                    }}
                >

                    <View style={{marginTop:'50%',margin:50}}>
                        <List renderHeader="批注">
                            <TextAreaItem editable={false} value={modalvalue}/>
                        </List>
                        <Button  onPress={this.onCancel}>关闭 </Button>
                    </View>
                </Modal></View>)
        }



        return (
            <ImageBackground style={{flex:1}} source={require('./paper_texture.png')}>
            <ScrollView

            >
                <Text>content</Text>
                <Text>{`book id: ${this.props.navigation.state.params.bookId}`}</Text>
                {/*<Text>{JSON.stringify(this.state.content)}</Text>*/}
                {contentRender}

            </ScrollView>
            </ImageBackground>
        );
    }
};