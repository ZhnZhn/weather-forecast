//import React, { Component } from 'react';
import React from '../_react'
//import PropTypes from 'prop-types';

import withTheme from '../hoc/withTheme'
import fnLeaflet from './fnLeaflet';

import throttle from '../../utils/throttle'

import { sPlace } from '../../flux/selectors';
import { placeRequested } from '../../flux/place/actions'

const { Component } = React

const PERIOD_MS = 5000;

const S = {
  ROOT_DIV : {
    width:'100%',
    height: '650px',
    transition: 'transform .3s, width .6s'
  }
}

class LeafletMap extends Component{
  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    store : PropTypes.object
  }
  */

  componentDidMount(){
    const { id, store } = this.props
    this.unsubsribe = store.subscribe(this._onStore);
    this.map = fnLeaflet.createMap(id);
    //this.map.on('click', this._handleClickMap)
    this.map.on('click', throttle(
      this._handleClickMap, PERIOD_MS, {
        trailing: false
      }
    ))
  }
  componentWillUnmount(){
    this.unsubsribe();
  }

  _handleClickMap = (e) => {
    const { store } = this.props;
    const { lat, lng } = e.latlng;
    store.dispatch(placeRequested({ lat, lot:lng }))
  }

 _onStore = () => {
   const { store, theme } = this.props
       , state = store.getState()
       , recent = sPlace.recent(state);
   if ( (recent && recent !== this.recent)
        || recent === 0 ){      
     fnLeaflet.addMarker(
        sPlace.byId(state, recent),
        theme.themeName,
        this.map
     );
     this.recent = recent;
   }
 }

  render(){
    const { id, rootStyle } = this.props;
    return (
      <div
        style={{ ...S.ROOT_DIV, ...rootStyle }}
        id={id}
      >
        LeafletMap Loading...
      </div>
    );
  }
}

export default withTheme(LeafletMap)
