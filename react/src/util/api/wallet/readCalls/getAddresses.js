import { getApiData } from '../../callCreator'
import { API_GET_ADDRESSES } from '../../../constants/componentConstants'

/**
 * Function to get addresses for specific mode 
 * @param {String} mode native || electrum || eth
 * @param {String} chainTicker Ticker symbol for coin to fetch addresses for
 * @param {Boolean} includePrivateAddresses Include private addresses (native only)
 * @param {Boolean} includePrivateBalances Include private balances (native only)
 */
export const getAddresses = async (mode, chainTicker, includePrivateAddresses = false, includePrivateBalances = false) => {
  const params = {chainTicker, includePrivateAddresses, includePrivateBalances}
  let addresses = {}

  try {
    addresses = await getApiData(mode, API_GET_ADDRESSES, params)
  } catch (e) {
    throw e
  }
  
  return addresses
}