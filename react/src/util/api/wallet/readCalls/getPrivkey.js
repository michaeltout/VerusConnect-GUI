import { getApiData } from '../../callCreator'
import { API_GET_PRIVKEY, POST } from '../../../constants/componentConstants'

/**
 * Function to get private key for an address (native and electrum only)
 * @param {String} mode native || electrum
 * @param {String} chainTicker Ticker symbol for coin to priv key on
 * @param {String} address Address to fetch privkey of
 */
export const getPrivkey = async (mode, chainTicker, address) => {
  const params = {chainTicker, address}
  let privKey = {}

  try {
    privKey = await getApiData(mode, API_GET_PRIVKEY, params, POST)
  } catch (e) {
    throw e
  }
  
  return privKey
}