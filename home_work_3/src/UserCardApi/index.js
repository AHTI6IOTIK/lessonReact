import React, {Component} from 'react';
import RenderUserCard from '../RenderUserCard';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default class UserCardApi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            userCard: null,
            dott: '.'
        }
    }

    reverse = false;

    concatDot = () => {

        if (!this.state.isLoading) return;

        if (this.state.dott.length <= 5 && !this.reverse) {
            this.setState({dott: this.state.dott += '.'});
            if (this.state.dott.length === 6) this.reverse = true;
        }

        if (this.reverse) {
            this.setState({dott: this.state.dott.substr(0, this.state.dott.length -1)});
            if (this.state.dott.length === 0) this.reverse = false;
        }
    };

    async getDataFromApi() {

        this.setState({isLoading: true});
        setInterval(this.concatDot, 500);
        const {company, address, posts, accountHistory, ...userCard} =  await fetch('http://faker.hook.io?property=helpers.createCard&locale=ru').then(res => res.json());
        await sleep(5000);

        this.setState({isLoading: false, userCard: {...userCard}});
    }

    componentDidMount() {

        this.getDataFromApi();

    }

    render() {

        if (this.state.isLoading) {

            return (
                <div>
                    <p>загрузка {this.state.dott}</p>
                </div>
            )
        }

        return (
            <div>
                <p>Hello</p>
                <RenderUserCard {...this.state.userCard} />
            </div>
        )
    }
}