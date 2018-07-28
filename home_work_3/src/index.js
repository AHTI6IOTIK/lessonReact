import React, {Component} from 'react';
import ReactDom from 'react-dom';
import NewsList from './NewsList'
import newsItems from './news';

ReactDom.render(<NewsList data={newsItems} />, document.getElementById('root'));
