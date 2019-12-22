import { getApiData } from '../callCreator'
import { API_CALL_DAEMON, NATIVE } from '../../constants/componentConstants'

/**
 * Function to get addresses for specific mode 
 * @param {String} chainTicker Ticker symbol for coin to fetch addresses for
 * @param {String} cmd The API command to make through RPC
 * @param {Array[]} rpcParams An array of parameters
 */
export const customRpcCall = async (chainTicker, cmd, rpcParams) => {
  const params = { chainTicker, cmd, params: rpcParams }

  try {
    const response = await getApiData(NATIVE, API_CALL_DAEMON, params)
    return response
  } catch (e) {
    throw e
  }
}