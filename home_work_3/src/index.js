import React, {Component} from 'react';
import ReactDom from 'react-dom';
import ProductList from './screens/ProductList';
import newsItems from './news';

ReactDom.render(<ProductList />, document.getElementById('root'));
