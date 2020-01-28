import { getApiData } from '../../callCreator'
import { API_GET_BLOCKREWARD } from '../../../constants/componentConstants'

/**
 * Function to get chain block subsidy for a specific height (native only for now)
 * @param {String} mode native
 * @param {String} chainTicker Ticker symbol for coin to fetch info for
 * @param {String} height Height to fetch reward for (omit for current height)
 */
export const getBlockReward = async (mode, chainTicker, height = null) => {
  const params = { chainTicker, height }

  try {
    return await getApiData(mode, API_GET_BLOCKREWARD, params)
  } catch (e) {
    throw e
  }
}