import { getApiData } from '../callCreator'
import { API_ACTIVATE_COIN, API_REMOVE_COIN, POST } from '../../constants/componentConstants'

/**
 * Makes an api call to activate a chain and returns the API call result
 * @param {String} chainTicker The chain to start's chain ticker, e.g. 'VRSC'
 * @param {String} mode native || electrum || eth
 * 
 * // Native Options
 * @param {String[]} startupOptions (Native only) An array of the paramters to be passed to the daemon on chain start, 
 * e.g. ['-mint', '-pubkey=...']
 * @param {String} daemon (Native only) The name of the chain daemon executable. 
 * @param {Object} dirNames (Native only) The names of the chains data directory on darwin, linux, and windows
 * "verusd" for Verus based coins and "komodod" for Komodo based coins
 * @param {String} confName (Native only) Name of the conf file of the chain (without .conf)
 * 
 * // Electrum Options
 * @param {String[]} customServers (Electrum only) An array of custom electrum servers to use in 
 * place of the default servers
 */
export const initCoin = async (chainTicker, mode, options) => {  
  try {
    return await getApiData(
      mode,
      API_ACTIVATE_COIN,
      {
        chainTicker,
        launchConfig: options
      },
      POST
    );
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