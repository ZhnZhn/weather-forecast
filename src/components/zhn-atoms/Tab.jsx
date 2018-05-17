//import React, { Component } from 'react';
import React from '../_react'

const { Component } = React

const S = {
  LI2 : {
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
  LI : {
    /*float : 'left',*/
    display : 'inline-block',

    backgroundColor : '#232F3B',

    color : 'rgba(164, 135, 212, 1)',
    /*color : 'gray',*/
    paddingLeft : '10px',
    paddingRight : '10px',
    paddingTop : '6px',
    paddingBottom : '6px',
    borderTopLeftRadius : '8px',
    borderTopRightRadius : '8px',
    cursor : 'pointer',

    fontWeight : 'bold',
    //border: '2px solid rgb(44, 40, 40)',
    border: '2px solid gray',
    borderBottom : 'none',
    //borderTop : 'none'
  },
  SELECTED : {
    borderColor : 'rgba(164, 135, 212, 1)',
    color : 'rgba(164, 135, 212, 1)'
  },
  SELECTED2 : {
    color : '#434348',
    borderBottom : '3px solid #2F7ED8'
    //borderBottom : '3px solid green'
  }
}

//const Tab = (props) => {
class Tab extends Component {
    render(){
    const { title, isSelected, onClick } = this.props;
    const _selectedStyle = (isSelected) ? S.SELECTED2 : null;
    return (
       <li
          style={Object.assign({}, S.LI2, _selectedStyle)}
          onClick={onClick}
          //onClick={_hClick.bind(null, props)}
          //onClick={() => {console.log('click');}}
       >
          <span>{title}</span>
       </li>
    )
  }
}

export default Tab
