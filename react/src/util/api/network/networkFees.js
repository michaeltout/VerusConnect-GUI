import { apiGet } from '../callCreator'
import { API_GET_NETWORK_FEES } from '../../constants/componentConstants'

/**
 * Gets the fastest, mid and slowest estimated fees for a network, provided
 * this method is supported for that network in the API
 * @param chainTicker The network to fetch fees for
 */
export const getNetworkFees = async (chainTicker) => {
  try {
   return await apiGet(API_GET_NETWORK_FEES, {chainTicker})
  } catch (e) {
    throw e
  }
}