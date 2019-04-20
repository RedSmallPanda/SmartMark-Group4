import React, { Component } from 'react';
import { Table, Divider, Tag ,Button,Icon,Row,Col,Input,Upload} from 'antd';


const data = [{
    key: '1',
    bookname: "爱丽丝漫游仙境",
    imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555175349781&di=9a5355723d090bf56cc2287928ae48c2&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dace576ca2140000018c1b05dbb0.jpg%403000w_1l_2o_100sh.jpg",
}, {
    key: '2',
    bookname: "乡村爱情故事",
    imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555175349781&di=9a5355723d090bf56cc2287928ae48c2&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dace576ca2140000018c1b05dbb0.jpg%403000w_1l_2o_100sh.jpg",
}];

class BookManage extends Component {

    constructor(props){
        super(props);
        this.state={
            addBook:0,
            sentenceVec:[],
            bookname:"",
            coverURL:"",
            // data:[
            //     {
            //         title: "爱丽丝漫游仙境",
            //         coverURL:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555175349781&di=9a5355723d090bf56cc2287928ae48c2&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dace576ca2140000018c1b05dbb0.jpg%403000w_1l_2o_100sh.jpg",
            //     },
            //     {
            //         title: "乡村爱情故事",
            //         coverURL:"https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=1964fc87b31bb0519b29bb7a5713b1d1/30adcbef76094b361cbceb48a3cc7cd98d109d6d.jpg",
            //     }
            // ],
            data:[],
        };
        this.columns = [{
            title: '缩略图',
            key: 'url',
            render: (text, record) => (<img width={60} height={80} src={record.url}/>)
        },
            {
                title: '书名',
                dataIndex: 'title',
                render: (text, record) => (<div>
                    <p>{record.bookid.title}</p>
                </div>)
            },
            // {
            //     title: '操作',
            //     key: 'action',
            //     render: (text, record) => (
            //         <span>
            //             <a href="javascript:;" onClick={() => this.deleteBook(record.id)}>删除</a>
            //         </span>
            //     ),
            // }
             ];
        this.addBook=this.addBook.bind(this);
        this.finishAddBook=this.finishAddBook.bind(this);
        this.filesOnChange=this.filesOnChange.bind(this);
        this.handleBooknameInput=this.handleBooknameInput.bind(this);
        this.handleCoverInput=this.handleCoverInput.bind(this);
        this.handleInfoInput=this.handleInfoInput.bind(this);
        this.deleteBook=this.deleteBook.bind(this);
    }

    componentDidMount(){
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Cover/", true);
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let data = JSON.parse(xmlhttp.responseText).hasOwnProperty('Cover') ? JSON.parse(xmlhttp.responseText).Cover : [];
                this.setState({data: data});
                console.log(xmlhttp.responseText);
                console.log(data);
            }
        }
        xmlhttp.send();
    }

    addBook(){
        this.setState({addBook:1});
    }

    deleteBook(id){
        let newHttp = new XMLHttpRequest();
        // newHttp.open("POST", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Cover", true);
        // newHttp.setRequestHeader("Content-Type", "application/json");
        // let coverData = {
        //     "url": "sadasdasd",
        //     "bookid": {"id":1555570572282},
        // };
        newHttp.open("PUT", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Cover/1555573062094", true);
        newHttp.setRequestHeader("Content-Type", "application/json");
        let coverData = {
            "url": "sadasdasdhjkhjkhjk",
        };
        newHttp.send(JSON.stringify(coverData));
        // let newData=[];
        // for(let i=0;i<this.state.data.length;i++){
        //     if(this.state.data[i].id!==id){
        //         newData.push(this.state.data[i]);
        //     }
        // }
        // this.setState({data:newData});
    }

    finishAddBook(){
        console.log(this.state);

        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Book/", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        let bookData = {
            "title": this.state.bookname,
            "info": this.state.info,
        };
        let newData=this.state.data;
        let newUrl=this.state.coverURL;
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                console.log(xmlhttp.responseText);
                let data = JSON.parse(xmlhttp.responseText).hasOwnProperty('id') ? JSON.parse(xmlhttp.responseText) : [];
                console.log(data);

                this.setState({data: newData});

                let newhttp = new XMLHttpRequest();
                newhttp.open("POST", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Cover/", true);
                newhttp.setRequestHeader("Content-Type", "application/json");
                let coverData = {
                    "url": newUrl,
                    "bookid": {"id":data.id},
                };
                let newCoverData=coverData;
                newCoverData.bookid["title"]=data.title;

                console.log(newCoverData);

                newData.push(newCoverData);
                this.setState({data:newData});
                newhttp.send(JSON.stringify(coverData));

                let stVec=this.state.sentenceVec;
                let stAmount=[];
                let allAmount=0;
                for(let i=0;i<stVec.length;i++){
                    stAmount.push(stVec[i].length);
                    allAmount+=stVec[i].length;
                }


                let sentencehttp = new XMLHttpRequest();
                sentencehttp.open("POST", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Sentence/", true);
                sentencehttp.setRequestHeader("Content-Type", "application/json");
                let count=0;
                let para=0;
                let seq=0;
                let sentenceData = {
                    "content": stVec[para][seq],
                    "paragraph":para,
                    "sequence":seq,
                    "bookid": {"id":data.id},
                };
                sentencehttp.onreadystatechange = () =>{
                    if(sentencehttp.readyState === 4 && sentencehttp.status === 200 && count < allAmount){
                        count++;
                        if(seq<stAmount[para]){
                            seq++;
                        }
                        else{
                            para++;
                            seq=0;
                        }
                        sentenceData = {
                            "content": stVec[para][seq],
                            "paragraph":para,
                            "sequence":seq,
                            "bookid": {"id":data.id},
                        };
                        sentencehttp.open("POST", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Sentence/", true);
                        sentencehttp.setRequestHeader("Content-Type", "application/json");
                        sentencehttp.send(JSON.stringify(sentenceData));
                    }
                    else if(sentencehttp.readyState === 4 && sentencehttp.status === 200 && count >= allAmount){
                        this.setState({
                            addBook:0,
                            sentenceVec:[],
                            bookname:"",
                            coverURL:"",
                            info:"",
                            data:newData,
                        });
                    }

                }
                sentencehttp.send(JSON.stringify(sentenceData));


            }

        }
        xmlhttp.send(JSON.stringify(bookData));

    }

    handleBooknameInput = () => {
        this.setState({bookname:document.getElementById("Bookname").value});
    }

    handleCoverInput = () => {
        this.setState({coverURL:document.getElementById("Cover").value});
        console.log(this.state.coverURL);
    }

    handleInfoInput = () => {
        this.setState({info:document.getElementById("Info").value});
    }

    filesOnChange=()=>{
        let myFile=document.getElementById("files");
        let strVec=[];
        if(myFile.files[0]!=null) {
            let file = myFile.files[0];
            let reader = new FileReader();
            reader.readAsText(file, 'gb2312');
            reader.onload = function () {
                let paraVec=[];
                let flag=0;
                let start=0;
                let end=0;
                let realStr=reader.result.split("\n");
                for(let j=0;j<realStr.length;j++) {
                    start=0;
                    end=0;
                    paraVec=[];
                    for (let i = 0; i < realStr[j].length; i++) {
                        if ((realStr[j][i] === "。" || realStr[j][i] === "？" || realStr[j][i] === "！") && flag === 0) {
                            end = i + 1;
                            paraVec.push(realStr[j].substring(start, end));
                            start = end;
                        }
                        if (realStr[j][i] === "“") {
                            flag++;
                        }
                        if (realStr[j][i] === "”") {
                            flag--;
                        }
                    }
                    if(start<realStr[j].length){
                        paraVec.push(realStr[j].substring(start));
                    }
                    strVec.push(paraVec);
                }
                //let n=reader.result.split(".");
                //console.log(strVec);
            }
        }
        this.setState({sentenceVec:strVec});
    }

    render(){
        let inputBook=<div>
            <br/>
            <Row>
                <input type="file" name="files" id="files" onChange={this.filesOnChange} />
            </Row>
            <br/>
            <Row>
                <Col span={15}>
                    <Input placeholder="封面图" id="Cover" onChange={this.handleCoverInput}/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={5}>
                    <Col span={23}>
                        <Input placeholder="书名" id="Bookname" onChange={this.handleBooknameInput}/>
                    </Col>
                </Col>
                <Col span={5}>
                    <Col span={23}>
                        <Input placeholder="简介" id="Info" onChange={this.handleInfoInput}/>
                    </Col>
                </Col>
                <Col span={5}>
                    <Button onClick={this.finishAddBook}>添加</Button>
                </Col>
            </Row>
            <br/>
        </div>;

        let inputNull=<br/>;
        let inputWhat=inputNull;
        if(this.state.addBook==0){
            inputWhat=inputNull;
        }
        else if(this.state.addBook==1){
            inputWhat=inputBook;
        }

        let userTable = <div>
            <Button onClick={this.addBook}>
                <Icon type="plus" />上架新书
            </Button>
            {inputWhat}
            <br />
            <Table columns={this.columns} dataSource={this.state.data} />
        </div>;
        return(
            userTable
        )
    }
}

export default BookManage;