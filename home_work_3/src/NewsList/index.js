import React, {Component} from 'react';
import NewsItem from '../NewsItem';
import isEqual from 'lodash/isEqual';

export default class NewsList extends Component {

    renderItem() {

        return(

            this.props.data.map((item, index) => {
                return(
                    <NewsItem key={index} data={item} />
                )
            })
        )
    }

    render() {

        return(
            <div style={containerStyle}>
                {this.renderItem()}
            </div>
        )
    }
}

const containerStyle = {
    backgroundColor: 'lightblue',
    maxWidth: 600,
};
