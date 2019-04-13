import React, { Component } from 'react';
import { Table, Divider, Tag ,Button,Icon,Row,Col,Input,Upload} from 'antd';

const columns = [{
    title: '名字',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
}, {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
},  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="javascript:;">Delete</a>
    </span>
    ),
}];

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
        };
        this.columns = [{
            title: '缩略图',
            key: 'img',
            render: (text, record) => (<img width={60} src={record.imgUrl}/>)
        },
            {
                title: '书名',
                dataIndex: 'bookname',
                render: (text, record) => (<div>
                    <p>{record.bookname}</p>
                </div>)
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;">删除</a>
                    </span>
                ),
            }];
        this.addBook=this.addBook.bind(this);
        this.finishAddBook=this.finishAddBook.bind(this);
        this.filesOnChange=this.filesOnChange.bind(this);
        this.handleBooknameInput=this.handleBooknameInput.bind(this);
    }

    addBook(){
        this.setState({addBook:1});
    }

    finishAddBook(){
        console.log(this.state);

        this.setState({
            addBook:0,
            sentenceVec:[],
            bookname:"",
        });
    }

    handleBooknameInput = () => {
        this.setState({bookname:document.getElementById("Bookname").value});
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
                <Col span={5}>
                    <Col span={23}>
                        <Input placeholder="书名" id="Bookname" onChange={this.handleBooknameInput}/>
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
            <Table columns={this.columns} dataSource={data} />
        </div>;
        return(
            userTable
        )
    }
}

export default BookManage;