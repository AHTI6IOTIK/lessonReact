import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RenderItem from './RenderItem';
import _ from 'lodash';

const propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
};

export default class RenderUserCart extends Component {

    constructor(props) {
        super(props);

        const {...userInfo} = this.props;

        this.state = {
            user: {...userInfo},
        }
    }

    render() {

        return (
            <div>
                {
                    _.map(this.state.user, (item, key) => {

                        return (
                            <RenderItem text={item} key={key} title={key} hide={false} />
                        )

                    })
                }
            </div>
        )
    }
}


RenderUserCart.propTypes = propTypes;