import { getTransactions } from '../../../../util/api/wallet/walletCalls'
import { NATIVE, ETH, ELECTRUM } from '../../../../util/constants/componentConstants'
import { SET_COIN_TRANSACTIONS, ERROR_COIN_TRANSACTIONS } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for the specified mode's transaction
 * update and dispatches a transaction update or error action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native || electrum || eth
 * @param {String} chainTicker Chain ticker id for chain to fetch transactions for
 */
export const updateTransactions = async (state, dispatch, mode, chainTicker) => {
  let transactionAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE || mode === ETH || mode === ELECTRUM) {
    //if (mode === NATIVE && !state.settings.config.coin.native.includePrivateTransactions.hasOwnProperty(chainTicker)) throw new Error(`${chainTicker} has no config setting set for includePrivateTransactions`)
    
    try {
      const apiResult = await getTransactions(
        mode,
        chainTicker,
        null,
        mode === NATIVE
          ? state.settings.config.coin.native.includePrivateTransactions[
              chainTicker
            ]
          : null,
        state.settings.config.general.native.listtransactionsMaxLength
      );
      
      if (apiResult.msg === 'success') {
        transactionAction = {...transactionAction, type: SET_COIN_TRANSACTIONS, transactions: apiResult.result}
      } else {
        transactionAction = {...transactionAction, type: ERROR_COIN_TRANSACTIONS, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode, expected native, eth or electrum.`)
  }

  dispatch(transactionAction)
  return wasSuccess
}