//import React, { Component } from 'react';
import React from '../_react'

const { Component } = React

const styles = {
  ulStyle : {
    listStyle: 'outside none none',
    marginTop: '5px',
    marginLeft: '10px',
    marginRight: '5px',
    marginBottom: '5px',
    textAlign: 'center'
    //borderBottom : '2px solid rgba(164, 135, 212, 1)'
  }
};


class TabPane extends Component {

  constructor(props){
    super();
    const components = props.children.map((tab, index) => {
       return  React.cloneElement(tab.props.children, { key : 'comp' + index });
    })
    this.state = {
      selectedTabIndex : 0,
      components
    }
  }

  _handlerClickTab = (index, tabEl) => {
    this.setState({selectedTabIndex : index});
    if (typeof tabEl.props.onClick === 'function'){
      tabEl.props.onClick();
    }
  }

  _renderTabs = (children) => {
       const {selectedTabIndex} = this.state;
       return children.map((tab, index) => {
          const isSelected = (index === selectedTabIndex) ? true : false;
          return React.cloneElement(tab, { key : index, onClick : this._handlerClickTab.bind(this, index, tab), isSelected })
          //return React.cloneElement(tab, { key : index, onClick : () => { console.log(index); }, isSelected })
       })
  }

  /*
  _renderComponents = (children) => {
      const {selectedTabIndex} = this.state;
      return children.map((tab, index) => {
         const divStyle = (index === selectedTabIndex)
                    ? {display: 'block', width: "100%", height : "100%"}
                    : {display : 'none'};
         const comp = React.cloneElement(tab.props.children, { key : index, ref : 'comp' + index});
         return (
             <div style={divStyle}>
                {comp}
             </div>
           )
      })
  }
  */

  _renderComponents2 = () => {
      const {selectedTabIndex, components} = this.state;
      return components.map((comp, index) => {
         const divStyle = (index === selectedTabIndex)
                    ? {display: 'block', width: "100%", height : "100%"}
                    : {display : 'none'};
          return (
             <div style={divStyle} key={'a'+index}>
                {comp}
             </div>
           )
      })
  }

  render(){
    const { children, width, height } = this.props;
    return (
      <div style={{width, height}}>
        <ul className="tabpane__tabs" style={styles.ulStyle}>
           {this._renderTabs(children)}
        </ul>
        <div style={ {width: "100%", height : "100%"}}>
           {this._renderComponents2()}
        </div>
      </div>
    )
  }

  getSelectedTabIndex = () => {
    return this.state.selectedTabIndex;
  }
}

export default TabPane
