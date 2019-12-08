import { getApiData } from '../../callCreator'
import { API_GET_DEFINEDCHAINS } from '../../../constants/componentConstants'

/**
 * Function to get pbaas definedchains (native only for now)
 * @param {String} mode native
 * @param {String} chainTicker Ticker symbol for coin to fetch info for
 */
export const getDefinedChains = async (mode, chainTicker) => {
  const params = {chainTicker}
  let definedChains = {}

  try {
    definedChains = await getApiData(mode, API_GET_DEFINEDCHAINS, params)
  } catch (e) {
    throw e
  }
  
  return definedChains
}