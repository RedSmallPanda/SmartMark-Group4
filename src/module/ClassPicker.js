import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {message, Select} from 'antd';

const Option = Select.Option;

class ClassPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            loading: true,
            classes: [],
        };
        this.xmlhttp = new XMLHttpRequest();
        this.getClasses = this.getClasses.bind(this);
    }

    componentDidMount() {
        this.getClasses();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({...nextProps});
    }

    getClasses() {
        this.xmlhttp.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark2/Class/", true);
        this.xmlhttp.onreadystatechange = () => {
            if (this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
                let classList = JSON.parse(this.xmlhttp.responseText);
                if (classList.hasOwnProperty("Class")) {
                    this.setState({
                        loading: false,
                        classes: classList["Class"],
                    });
                }
            } else if (this.xmlhttp.readyState === 4) {
                this.setState({
                    loading: false,
                });
                message.error('> ClassPicker < get class Failure.', 8);
            }
        };
        this.xmlhttp.send();
    }

    renderClassOptions() {
        return this.state.classes.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>);
    }

    render() {
        const {onChange, mode, style, placeholder} = this.props;
        return (
            <Select value={this.state.value} loading={this.state.loading} allowClear
                    placeholder={placeholder} onChange={onChange} mode={mode} style={style}>
                {this.renderClassOptions()}
            </Select>
        );
    }
}

ClassPicker.defaultProps = {
    value: [],
    mode: "",
    style: {width: 400, marginRight: 10},
    placeholder: "选择班级",
};

export default ClassPicker;

