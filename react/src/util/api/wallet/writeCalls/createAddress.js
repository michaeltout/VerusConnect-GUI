import { getApiData } from '../../callCreator'
import { API_CREATE_ADDRESS } from '../../../constants/componentConstants'

/**
 * Function to create new address (native only)
 * @param {String} mode native
 * @param {String} chainTicker Ticker symbol for coin to fetch addresses for
 * @param {Boolean} zAddress Create a z address
 */
export const createAddress = async (mode, chainTicker, zAddress) => {
  const params = { chainTicker, zAddress }
  let newAddress = {}

  try {
    newAddress = await getApiData(mode, API_CREATE_ADDRESS, params)
  } catch (e) {
    throw e
  }
  
  return newAddress
}