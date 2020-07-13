import { getApiData } from '../../callCreator'
import { API_GET_ALL_CURRENCIES } from '../../../constants/componentConstants'

/**
 * Function to get all currencies on a chain
 * @param {String} mode (native only)
 * @param {String} chainTicker Ticker symbol for chain to fetch currencies for
 * @param {Boolean} includeExpired If true, includes currencies that are no longer active
 */
export const getAllCurrencies = async (mode, chainTicker, includeExpired = false) => {
  let params = { chainTicker, includeExpired }

  try {
    return await getApiData(mode, API_GET_ALL_CURRENCIES, params)
  } catch (e) {
    throw e
  }
}