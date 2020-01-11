import React from 'react';
import { connect } from 'react-redux';
import { 
  UxSelectorRender,
} from './uxSelector.render';
import { setMainNavigationPath, getPathParent } from '../../../actions/actionCreators'
import { activateCoin } from '../../../actions/actionDispatchers'

import {
  NATIVE,
  POST_AUTH,
  UX_SELECTOR,
  CHAIN_POSTFIX,
  APPS,
  WALLET,
  ID_POSTFIX,
  VERUSID
} from "../../../util/constants/componentConstants";

class UxSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }

    this.selectUx = this.selectUx.bind(this)
  }

  componentDidMount() {
    const { activeUser } = this.props

    if (activeUser.startLocation !== `${POST_AUTH}/${UX_SELECTOR}`) {
      this.selectUx(activeUser.startLocation)
    }
  }

  async selectUx(navLocation) {
    this.setState({ loading: true }, async () => {
      const { activatedCoins, dispatch, activeUser, authenticated, identities } = this.props

      Object.values(activeUser.startCoins).map(async (coinObj) => {
        if (coinObj.mode === NATIVE || authenticated[coinObj.mode]) {
          await activateCoin(coinObj, coinObj.mode, dispatch)
        }
      })
  
      // TODO: Investigate why this isnt working, if navigation is in coin wallet it 
      // will always go back to dashboard
      if (navLocation.includes(`_${CHAIN_POSTFIX}`)) {
        const coinWalletName = navLocation.split('/').filter(value => {
          return value.includes(`_${CHAIN_POSTFIX}`)
        })
        
        if (!activatedCoins[coinWalletName[0]]) {
          dispatch(setMainNavigationPath(`${POST_AUTH}/${APPS}/${WALLET}`))
          return
        }
      } 

      if (navLocation.includes(`_${ID_POSTFIX}`)) {
        const identityWalletName = navLocation.split('/').filter(value => {
          return value.includes(`_${ID_POSTFIX}`)
        })
        
        if (!identities[identityWalletName[1]] || !identities[identityWalletName[1]][[Number(identityWalletName[0])]]) {
          dispatch(setMainNavigationPath(`${POST_AUTH}/${APPS}/${VERUSID}`))
          return
        }
      }

      // TODO: Mining wallet here as well
  
      dispatch(setMainNavigationPath(navLocation))
      return
    })
    
  }

  render() {
    return UxSelectorRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.users.activeUser,
    mainPathArray: state.navigation.mainPathArray,
    authenticated: state.users.authenticated,
    activatedCoins: state.coins.activatedCoins,
    identities: state.ledger.identities
  };
};

export default connect(mapStateToProps)(UxSelector);