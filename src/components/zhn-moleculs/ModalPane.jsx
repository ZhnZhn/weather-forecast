import React from '../_react'

const { Component } = React;

class ModalPane extends Component {
  static defaultProps = {
    onClose: () => {}
  }

  componentDidUpdate(prevProps){
    if (this.props !== prevProps){
      if (this.props.isShow){
        document.addEventListener('click', this._handleClickOutside, true)
      } else {
        document.removeEventListener('click', this._handleClickOutside, true)
      }
    }
  }


  _handleClickOutside = (event) => {
    const { onClose } = this.props;
    if (this.rootNode && !this.rootNode.contains(event.target)) {
      onClose(event)
    }
  }

  _refRootNode = n => this.rootNode = n

  render(){
    const { style, children } = this.props;
    return (
      <div
        style={style}
        ref={this._refRootNode}
      >
        {children}
      </div>
    );
  }
}

export default ModalPane
