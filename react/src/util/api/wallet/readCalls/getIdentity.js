import { getApiData } from '../../callCreator'
import { API_GET_IDENTITY } from '../../../constants/componentConstants'

/**
 * Function to get information about one VerusID
 * @param {String} mode (native only)
 * @param {String} chainTicker Ticker symbol for coin to fetch identities for
 * @param {String} identity The name or address of the identity to get
 */
export const getIdentity = async (mode, chainTicker, identity) => {
  let params = {chainTicker, name: identity}

  try {
    return await getApiData(mode, API_GET_IDENTITY, params)
  } catch (e) {
    throw e
  }
}