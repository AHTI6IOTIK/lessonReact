import React, {Component} from 'react';

export default class NewsItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collapse: !!!this.props.collapse
        }

    }

    togleHeightText(e) {

        this.setState({collapse: !this.state.collapse});

        this.props.onClick && this.props.onClick(!this.state.collapse);
    }

    render() {
        const {
            title,
            author,
            publishDate,
            text
        } = this.props.data;

        let styleText = this.state.collapse ? styleCollapseText : styleUnCollapseText ;

        return (

            <div style={styleContainer}>
                <h2>{title}</h2>
                <p>{author}</p>
                <p>{publishDate}</p>
                <p onClick={this.togleHeightText.bind(this)} style={styleText}>{text}</p>
            </div>
        )
    }
}


const styleContainer = {
    borderBottom: '1px dotted black',
    padding: 10,
};
const styleCollapseText = {
    height: '20px',
    overflow: 'hidden'
};
const styleUnCollapseText = {
    height: '100%'
};
