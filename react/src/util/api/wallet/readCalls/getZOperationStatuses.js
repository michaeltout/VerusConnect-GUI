import { getApiData } from '../../callCreator'
import { API_GET_ZOPERATIONSTATUSES } from '../../../constants/componentConstants'

/**
 * Function to get z_operationstatus data (native only for now)
 * @param {String} mode native
 * @param {String} chainTicker Ticker symbol for coin to fetch info for
 */
export const getZOperationStatuses = async (mode, chainTicker) => {
  const params = {chainTicker}
  let getZOperationStatuses = {}

  try {
    getZOperationStatuses = await getApiData(mode, API_GET_ZOPERATIONSTATUSES, params)
  } catch (e) {
    throw e
  }
  
  return getZOperationStatuses
}