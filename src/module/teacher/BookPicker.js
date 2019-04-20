import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {message, Select} from 'antd';

const Option = Select.Option;

class BookPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            loading: true,
            books: [],
        };
        this.getBooks = this.getBooks.bind(this);
    }

    componentDidMount() {
        this.getBooks();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({...nextProps});
    }

    getBooks() {
        let request = new XMLHttpRequest();
        request.open("GET", "http://47.103.7.215:8080/Entity/U65af91833eaa4/SmartMark3/Book/");
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                let bookList = JSON.parse(request.responseText);
                if (bookList.hasOwnProperty("Book")) {
                    this.setState({
                        loading: false,
                        books: bookList["Book"],
                    });
                }
            } else if (request.readyState === 4) {
                this.setState({
                    loading: false,
                });
                message.error('> BookPicker < get book Failure.', 8);
            }
        };
        request.send();
    }
    renderClassOptions() {
        return this.state.books.map(item => <Option key={item.id} value={item.id}>{item.title}</Option>);
    }

    render() {
        const {onChange, mode, style, placeholder, allowClear, disabled} = this.props;
        return (
            <Select value={this.state.value} loading={this.state.loading} allowClear={allowClear} disabled={disabled}
                    placeholder={placeholder} onChange={onChange} mode={mode} style={style}>
                {this.renderClassOptions()}
            </Select>
        );
    }
}

BookPicker.defaultProps = {
    value: [],
    mode: "",
    style: {width: 400, marginRight: 10},
    placeholder: "选择书籍",
    allowClear: true,
    disabled: false,
};

export default BookPicker;

