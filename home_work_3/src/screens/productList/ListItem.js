import React, {Component, Fragment} from 'react';

const itemStyle = {
    margin: 5,
    width: 200,
    float: 'left'
};

const itemModal = {
    position: 'fixed',
    backgroundColor: 'rgb(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%'

};

export default class ListItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
            detail: false
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.setState(({detail}) => ({detail: !detail}));
    }

    render() {

        const {list, detail} = this.state.item;

        if (this.state.detail) {
            return (
                <div style={itemModal} onClick={this.onClick}>
                    <figure style={{backgroundColor: '#fff', padding: 10}}>
                        <img src={detail.img} width={"100"} />
                        <figcaption>
                            <p>{detail.name}</p>
                            <p>{detail.description}</p>
                            <p>{detail.price}</p>
                        </figcaption>
                    </figure>
                </div>
            )
        }
        return (
            <div style={itemStyle} onClick={this.onClick}>
                <figure>
                    <img src={list.img} width={"100"}/>
                    <figcaption>
                        <p>{list.name}</p>
                        <p>{list.description}</p>
                        <p>{list.price}</p>
                    </figcaption>
                </figure>
            </div>
        )

    }
}