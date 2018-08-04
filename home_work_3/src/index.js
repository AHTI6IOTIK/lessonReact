import React, {Component} from 'react';
import ReactDom from 'react-dom';
import NewsList from './NewsList'
import newsItems from './news';
import UserCardApi from './UserCardApi';

ReactDom.render(<UserCardApi />, document.getElementById('root'));
