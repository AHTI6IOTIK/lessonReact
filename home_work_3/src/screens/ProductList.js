import React, {Component} from 'react';
import products from '../products';
import ListItem from './productList/ListItem';

const itemStyle = {
    margin: 5,
    width: 200,
    float: 'left'
};

export default class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            detail: false
        }
    }
    render() {
        return (
            <div style={{width: 420}}>
                {
                    products.map((item, index) => {

                        return (
                            <ListItem key={index} item={item}/>
                        )
                    })
                }

            </div>
        )
    }
}