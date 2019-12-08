import { getApiData } from '../callCreator'
import { API_ACTIVATE_COIN, API_REMOVE_COIN, POST } from '../../constants/componentConstants'

/**
 * Makes an api call to activate a chain and returns the API call result
 * @param {String} chainTicker The chain to start's chain ticker, e.g. 'VRSC'
 * @param {String} mode native || electrum || eth
 * @param {String[]} startupParams (Native only) An array of the paramters to be passed to the daemon on chain start, 
 * e.g. ['-mint', '-pubkey=...']
 * @param {String} overrideDaemon (Native only) The name of the chain daemon executable. 
 * "verusd" for Verus based coins and "komodod" for Komodo based coins
 */
export const initCoin = async (chainTicker, mode, startupParams, overrideDaemon) => {
  try {
    return await getApiData(mode, API_ACTIVATE_COIN, {chainTicker, launchConfig: {startupParams, overrideDaemon}})
  } catch (e) {
    throw e
  }
}

/**
 * Makes an api call to remove a coins data from the stored api data and returns the result
 * @param {String} chainTicker The chain to start's chain ticker, e.g. 'VRSC'
 * @param {String} mode native || electrum || eth
 */
export const removeCoin = async (chainTicker, mode) => {
  try {
    return await getApiData(mode, API_REMOVE_COIN, { chainTicker }, POST)
  } catch (e) {
    throw e
  }
}