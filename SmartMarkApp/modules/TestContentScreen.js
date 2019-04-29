import React, {Component} from "react";
import {Text, ScrollView} from "react-native";

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

    render() {
        return (
            <ScrollView
                style={{
                    flex: 1,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: '#F5FCFF',
                }}
            >
                <Text>content</Text>
                <Text>{`book id: ${this.props.navigation.state.params.bookId}`}</Text>
                <Text>{JSON.stringify(this.state.content)}</Text>
            </ScrollView>
        );
    }
};