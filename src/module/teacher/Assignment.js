import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Tabs} from 'antd';
import AssignCurrent from "./AssignCurrent";
import AssignNew from "./AssignNew";

const TabPane = Tabs.TabPane;

class Assignment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{marginLeft: 20}}>
                <Tabs tabBarExtraContent={null}>
                    <TabPane tab="当前作业" key="1">
                        <AssignCurrent/>
                    </TabPane>
                    <TabPane tab="发布新作业" key="2">
                        <AssignNew/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Assignment;

