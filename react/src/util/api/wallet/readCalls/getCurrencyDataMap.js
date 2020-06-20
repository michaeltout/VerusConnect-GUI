import { getApiData } from '../../callCreator'
import { API_GET_CURRENCY_DATA_MAP } from '../../../constants/componentConstants'

/**
 * Function to get a list of currencies and some associated, processed data
 * @param {String} mode (native only)
 * @param {String} chainTicker Ticker symbol for chain to fetch currencies for
 * @param {String[]} currencies List of currencies to get
 */
export const getCurrencyDataMap = async (mode, chainTicker, currencies = []) => {
  let params = { chainTicker, currencies }

  try {
    return await getApiData(mode, API_GET_CURRENCY_DATA_MAP, params)
  } catch (e) {
    throw e
  }
}