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
  FIX_CHARACTER,
  VERUSID,
  MINING_POSTFIX,
  MINING,
  API_SUCCESS,
  PBAAS_POSTFIX,
  MULTIVERSE
} from "../../../util/constants/componentConstants";
import { checkAuthentication } from '../../../util/api/users/userData';

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
      const { activatedCoins, dispatch, activeUser, identities } = this.props

      Object.values(activeUser.startCoins).map(async (coinObj) => {
        let authCheck;
        let authenticated = false;

        if (coinObj.mode !== NATIVE) {
          authCheck = await checkAuthentication(coinObj.mode)
          authenticated = authCheck && authCheck.msg === API_SUCCESS && authCheck.result
        }

        if (coinObj.mode === NATIVE || authenticated) {
           await activateCoin(
            coinObj,
            coinObj.mode,
            activeUser.startupOptions[coinObj.mode][coinObj.id] != null
              ? activeUser.startupOptions[coinObj.mode][coinObj.id]
              : [],
            dispatch
          );
        }
      })
  
      // TODO: Investigate why this isnt working, if navigation is in coin wallet it 
      // will always go back to dashboard
      if (navLocation.includes(`${FIX_CHARACTER}${CHAIN_POSTFIX}`)) {
        const coinWalletName = navLocation.split('/').filter(value => {
          return value.includes(`${FIX_CHARACTER}${CHAIN_POSTFIX}`)
        })
        
        if (!activatedCoins[coinWalletName[0]]) {
          dispatch(setMainNavigationPath(`${POST_AUTH}/${APPS}/${WALLET}`))
          return
        }
      } 

      if (navLocation.includes(`${FIX_CHARACTER}${ID_POSTFIX}`)) {
        const identityWalletName = navLocation.split('/').filter(value => {
          return value.includes(`${FIX_CHARACTER}${ID_POSTFIX}`)
        })
        
        if (!identities[identityWalletName[1]] || !identities[identityWalletName[1]][[Number(identityWalletName[0])]]) {
          dispatch(setMainNavigationPath(`${POST_AUTH}/${APPS}/${VERUSID}`))
          return
        }
      }

      if (navLocation.includes(`${FIX_CHARACTER}${MINING_POSTFIX}`)) {
        const miningWalletName = navLocation.split('/').filter(value => {
          return value.includes(`${FIX_CHARACTER}${MINING_POSTFIX}`)
        })
        
        if (!activatedCoins[miningWalletName[0]]) {
          dispatch(setMainNavigationPath(`${POST_AUTH}/${APPS}/${MINING}`))
          return
        }
      }

      if (navLocation.includes(`${FIX_CHARACTER}${PBAAS_POSTFIX}`)) {
        const pbaasChainName = navLocation.split('/').filter(value => {
          return value.includes(`${FIX_CHARACTER}${PBAAS_POSTFIX}`)
        })
        
        if (!activatedCoins[pbaasChainName[0]]) {
          dispatch(setMainNavigationPath(`${POST_AUTH}/${APPS}/${MULTIVERSE}`))
          return
        }
      }
  
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
    activatedCoins: state.coins.activatedCoins,
    identities: state.ledger.identities
  };
};

export default connect(mapStateToProps)(UxSelector);