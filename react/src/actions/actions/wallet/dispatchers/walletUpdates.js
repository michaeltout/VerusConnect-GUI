import { updateAddresses } from './updateAddresses'
import { updateAllBalances } from './updateBalances'
import { updateDefinedChains } from './updateDefinedChains'
import { updateInfo } from './updateInfo'
import { updateMiningInfo } from './updateMiningInfo'
import { updateTransactions } from './updateTransactions'
import { updateZOperations } from './updateZOperationStatuses'
import { updateFiatPrice } from './updateFiatPrice'
import { updateIdentities } from './updateIdentities'
import { updateAllCurrencies } from './updateAllCurrencies'
import { updateNameCommitments } from './updateNameCommitments'
import { updateCurrentSupply } from './updateCurrentSupply'
import { readNavigationUrl } from '../../../../util/navigationUtils'
import { updateBlockReward } from './updateBlockReward'
import {
  API_GET_ADDRESSES,
  API_GET_BALANCES,
  API_GET_DEFINEDCHAINS,
  API_GET_BLOCKREWARD,
  API_GET_INFO,
  API_GET_MININGINFO,
  API_GET_TRANSACTIONS,
  API_GET_ZOPERATIONSTATUSES,
  API_GET_FIATPRICE,
  API_ABORTED,
  API_ERROR,
  API_SUCCESS,
  API_GET_IDENTITIES,
  API_GET_ALL_CURRENCIES,
  API_GET_NAME_COMMITMENTS,
  ALWAYS_ACTIVATED,
  API_GET_CURRENTSUPPLY,
  API_GET_CURRENCY_DATA_MAP
} from '../../../../util/constants/componentConstants'
import {
  renewData,
  occupyCoinApiCall,
  freeCoinApiCall
} from "../../../actionCreators";
import { createExpireTimeout } from '../../../actionDispatchers'
import { logDebugWarning } from '../../debug/creators/debugWarnings'
import { updateCurrencyDataMap } from './updateCurrencyDataMap'

// Map of update functions to be able to call them through standardized 
// API call constants. Each function requires the same three parameters: (store, mode, chainTicker)
export const walletUpdates = {
  [API_GET_ADDRESSES]: updateAddresses,
  [API_GET_BALANCES]: updateAllBalances,
  [API_GET_DEFINEDCHAINS]: updateDefinedChains,
  [API_GET_INFO]: updateInfo,
  [API_GET_MININGINFO]: updateMiningInfo,
  [API_GET_TRANSACTIONS]: updateTransactions,
  [API_GET_ZOPERATIONSTATUSES]: updateZOperations,
  [API_GET_FIATPRICE]: updateFiatPrice,
  [API_GET_IDENTITIES]: updateIdentities,
  [API_GET_NAME_COMMITMENTS]: updateNameCommitments,
  [API_GET_CURRENTSUPPLY]: updateCurrentSupply,
  [API_GET_BLOCKREWARD]: updateBlockReward,
  [API_GET_ALL_CURRENCIES]: updateAllCurrencies,
  [API_GET_CURRENCY_DATA_MAP]: updateCurrencyDataMap
}

/**
 * Calls the specified API update function and renews (un-expires) the data in the 
 * redux store if the API call succeeded.
 * @param {Object} state Reference to redux state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native || electrum || eth
 * @param {String} chainTicker Chain ticker symbol of chain being called
 * @param {String} updateId Name of API call to update
 * @param {Function} onExpire (Optional) Function to execute on data expiry
 */
export const udpateWalletData = async (state, dispatch, mode, chainTicker, updateId, onExpire) => {
  dispatch(occupyCoinApiCall(chainTicker, updateId))
  let callCompleted = false

  try {
    if(await walletUpdates[updateId](state, dispatch, mode, chainTicker)) {
      if (state.updates.coinUpdateIntervals[chainTicker][updateId].expire_timeout !== ALWAYS_ACTIVATED) {
        dispatch(renewData(chainTicker, updateId))
      }

      if (state.updates.coinUpdateIntervals[chainTicker][updateId].expire_id) {
        //console.log(`Going to clear expire timeout for ${updateId}: ${state.updates.coinUpdateIntervals[chainTicker][updateId].expire_id}`)
        clearTimeout(state.updates.coinUpdateIntervals[chainTicker][updateId].expire_id)
      }
      createExpireTimeout(state.updates.coinUpdateIntervals[chainTicker][updateId].expire_timeout, chainTicker, updateId, onExpire)
      callCompleted = true
    }
  } catch (e) {
    console.error(e)
  }
  
  dispatch(freeCoinApiCall(chainTicker, updateId))
  
  return callCompleted
}

/**
 * Calls an api fetch and dispatch function if all conditions of an update are met according
 * to that updates tracker in the store. Returns 'aborted' if api call was not made due to conditions,
 * 'success' if the call succeeded and 'error' if the call failed.
 * @param {Object} state Reference to redux state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native || electrum || eth
 * @param {String} chainTicker Chain ticker symbol of chain being called
 * @param {String} updateId Name of API call to update
 */
export const conditionallyUpdateWallet = async (state, dispatch, mode, chainTicker, updateId) => {
  const updateInfo = state.updates.coinUpdateTracker[chainTicker][updateId]
  const currentModalPath = state.navigation.modalPath
  const currentMainPath = state.navigation.mainPath
  const TEST_PASS = 1
  const TEST_EMPTY = 0
  const TEST_FAIL = -1
  
  if (updateInfo && updateInfo.needs_update && !updateInfo.busy) {
    // -1 denotes a failed restriction test, 0 denotes empty, and 1 denotes a pass
    let restrictionResults = []
    
    //TODO: Fix testspass to be an OR rather than and AND
    
    if (updateInfo.location_restrictions && updateInfo.location_restrictions.length > 0) {
      let testPassed = updateInfo.location_restrictions.every((locationRestriction) => {
        const locationRestrictions = readNavigationUrl(locationRestriction)
        if (!(currentMainPath.includes(locationRestrictions.mainPath)) || !(currentModalPath.includes(locationRestrictions.modalPath))) {
          return false
        } else return true
      })

      if (testPassed) restrictionResults.push(TEST_PASS)
      else restrictionResults.push(TEST_FAIL)
    } else {
      restrictionResults.push(TEST_EMPTY)
    }
    
    if (updateInfo.location_and_type_restrictions && updateInfo.location_and_type_restrictions.length > 0) {
      let testPassed = updateInfo.location_and_type_restrictions.every((locationAndTypeRestriction) => {
        const location = locationAndTypeRestriction[0]
        const type = locationAndTypeRestriction[1]
        const locationRestrictions = readNavigationUrl(location)
        const activeCoinTags = state.coins.activatedCoins[chainTicker].options.tags

        if (!(currentMainPath.includes(locationRestrictions.mainPath) && activeCoinTags.includes(type)) || !(currentMainPath.includes(locationRestrictions.modalPath) && activeCoinTags.includes(type))) {
          return false
        } else return true
      })

      if (testPassed) restrictionResults.push(TEST_PASS)
      else restrictionResults.push(TEST_FAIL)
    } else {
      restrictionResults.push(TEST_EMPTY)
    }
    
    if (restrictionResults.reduce((accumulator, currentValue) => accumulator + currentValue) < 0) return API_ABORTED

    if(await udpateWalletData(state, dispatch, mode, chainTicker, updateId)) {
      return API_SUCCESS
    }
    else return API_ERROR
  } else if (updateInfo && updateInfo.needs_update && updateInfo.busy) {
    dispatch(logDebugWarning(`The ${updateId} call for ${chainTicker} is taking a very long time to complete. This may impact performace.`))

    // TODO: Deprecated, delete
    /*if (!updateWarningSnackDisabled) {
      // Disable spamming of update warnings if many updates are taking a while,
      // max. 1 warning every 60 seconds
      
      dispatch(disableUpdateWarningSnack())
      dispatch(
        newSnackbar(
          WARNING_SNACK,
          `The ${updateId} call for ${chainTicker} is taking a very long time to complete. This may impact performace.`,
          MID_LENGTH_ALERT
        )
      );
      
      setTimeout(() => {
        dispatch(enableUpdateWarningSnack())
      }, 300000)
    }*/
  }

  return API_ABORTED
}