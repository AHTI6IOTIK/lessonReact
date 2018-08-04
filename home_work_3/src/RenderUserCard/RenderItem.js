import React, {Component} from 'react';

export default class RenderItem extends Component {

    state = {
        hide: this.props.hide
    };

    onClick(e) {

        this.setState(({hide}) => {return({hide: !hide})});
        this.props.onClick && this.props.onClick(e);
    }

    render() {

        const {text, title} = this.props;

        const styleBlock = {
            display:'inline-block'
        };

        const styleHide = {
            display: 'none'
        };

        const itemStyle = !this.state.hide? styleBlock : styleHide;

        return (
            <div>
                <p style={{display:'inline-block'}}>{title}</p>
                <input type="checkbox" onClick={this.onClick.bind(this)} />
                <p style={itemStyle}>{text}</p>
            </div>
        )
    }
}