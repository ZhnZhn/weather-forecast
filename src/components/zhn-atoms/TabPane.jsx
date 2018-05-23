//import React, { Component } from 'react';
import React from '../_react'

const { Component } = React

const CL = "tabpane__tabs";

const S = {
  UL: {
    listStyle: 'outside none none',
    marginTop: '5px',
    marginLeft: '10px',
    marginRight: '5px',
    marginBottom: '5px',
    textAlign: 'center'
  },
  TABS: {
    width: "100%",
    height : "100%"
  },
  TAB_SELECTED: {
    display: 'block',
    width: "100%",
    height : "100%"
  },
  NONE: {
    display: 'none',
  }
};


class TabPane extends Component {

  constructor(props){
    super();
    const components = props.children.map((tab, index) => {
       return  React.cloneElement(tab.props.children, {
          key : 'comp' + index
        });
    })
    this.state = {
      selectedTabIndex : 0,
      components
    }
  }

  _handlerClickTab = (index, tabEl) => {
    this.setState({ selectedTabIndex : index });
    if (typeof tabEl.props.onClick === 'function'){
      tabEl.props.onClick();
    }
  }

  _renderTabs = (children) => {
       const { selectedTabIndex } = this.state;
       return children.map((tab, index) => {
          const isSelected = (index === selectedTabIndex)
                   ? true : false;
          return React.cloneElement(tab, {
             key : index,
             onClick : this._handlerClickTab.bind(this, index, tab),
             isSelected
           }
         );
       });
  }


  _renderComponents = () => {
      const { selectedTabIndex, components } = this.state;
      return components.map((comp, index) => {
         const divStyle = (index === selectedTabIndex)
                    ? S.TAB_SELECTED
                    : S.NONE;
          return (
             <div style={divStyle} key={'a'+index}>
                {comp}
             </div>
           );
      });
  }

  render(){
    const {
            width, height,
            tabsStyle,
            children
          } = this.props;
    return (
      <div style={{ width, height }}>
        <ul
          className={CL}
          style={{...S.UL, ...tabsStyle }}
        >
           {this._renderTabs(children)}
        </ul>
        <div style={S.TABS}>
           {this._renderComponents()}
        </div>
      </div>
    )
  }

  getSelectedTabIndex() {
    return this.state.selectedTabIndex;
  }
}

export default TabPane
