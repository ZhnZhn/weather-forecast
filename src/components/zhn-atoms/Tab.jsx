//import React, { Component } from 'react';
import React from '../_react'

const { Component } = React;

const S = {
  LI : {
    display : 'inline-block',
    color : '#9E9E9E',
    paddingLeft : '10px',
    paddingRight : '10px',
    paddingTop : '6px',
    paddingBottom : '6px',
    fontWeight : 'bold',
    borderBottom : '3px solid #9E9E9E',
    cursor : 'pointer'
  },
  SELECTED : {
    color : '#434348',
    borderBottom : '3px solid #2F7ED8'
  }
};

class Tab extends Component {
    render(){
    const {
            title,
            isSelected, selectedStyle,
            onClick
          } = this.props;
    const _selectedStyle = isSelected
             ? { ...S.SELECTED, ...selectedStyle }
             : null;
    return (
       <li
          style={{ ...S.LI, ..._selectedStyle }}
          onClick={onClick}
       >
          <span>{title}</span>
       </li>
    );
  }
}

export default Tab
