import { getApiData } from '../../callCreator'
import { API_GET_CURRENCY } from '../../../constants/componentConstants'

/**
 * Function to get information about one currency
 * @param {String} mode (native only)
 * @param {String} chainTicker Ticker symbol for chain the currency is on
 * @param {String} identity The name or address of the currency to get
 */
export const getCurrency = async (mode, chainTicker, name) => {
  let params = {chainTicker, name}

  try {
    return await getApiData(mode, API_GET_CURRENCY, params)
  } catch (e) {
    throw e
  }
}