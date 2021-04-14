import { getApiData } from '../../callCreator'
import { API_GET_ALL_CURRENCIES } from '../../../constants/componentConstants'

/**
 * Function to get all currencies on a chain
 * @param {String} mode (native only)
 * @param {String} chainTicker Ticker symbol for chain to fetch currencies for
 * @param {Object} query {(json, optional) specify valid query conditions
                            "launchstate": ("prelaunch" | "launch" | "refund") (optional) return only currencies in that state
                            "systemtype": ("local" | "gateway" | "pbaas")
                          "converter": bool (bool, optional) default false, only return fractional currency converters
                          }
 */
export const getAllCurrencies = async (mode, chainTicker, query = {}) => {
  let params = { chainTicker, query }

  try {
    return await getApiData(mode, API_GET_ALL_CURRENCIES, params)
  } catch (e) {
    throw e
  }
}