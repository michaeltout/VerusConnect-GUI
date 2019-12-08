import { getApiData } from '../../callCreator'
import { API_GET_PUBKEY, POST } from '../../../constants/componentConstants'

/**
 * Function to get public key for an address (native and electrum only)
 * @param {String} mode native || electrum
 * @param {String} chainTicker Ticker symbol for coin to pub key on
 * @param {String} address Address to fetch pubkey of
 */
export const getPubkey = async (mode, chainTicker, address) => {
  const params = {chainTicker, address}
  let pubKey = {}

  try {
    pubKey = await getApiData(mode, API_GET_PUBKEY, params, POST)
  } catch (e) {
    throw e
  }
  
  return pubKey
}