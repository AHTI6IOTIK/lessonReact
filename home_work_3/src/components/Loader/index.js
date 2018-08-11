import React, {Component} from 'react';

const urlLoader = "https://vezzet.ru/images/loading.gif";

const Loader = ({containerStyle, imageStyle={width: 50, height: 50}}) => (
  <div style={containerStyle} >
      <img src={urlLoader} alt="" style={imageStyle}/>
  </div>
);

export default Loader;