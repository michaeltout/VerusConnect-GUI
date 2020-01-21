import { getApiData } from '../../callCreator'
import { API_GET_CURRENTSUPPLY } from '../../../constants/componentConstants'

/**
 * Function to get coin supply of chain on a given blockheight (native only)
 * @param {String} mode native only
 * @param {String} chainTicker Ticker symbol for coin to fetch coin supply for
 * @param {Number} height Blockheight at which to get coin supply
 */
export const getCurrentSupply = async (mode, chainTicker) => {
  const params = { chainTicker }

  try {
    return await getApiData(mode, API_GET_CURRENTSUPPLY, params)
  } catch (e) {
    throw e
  }
}