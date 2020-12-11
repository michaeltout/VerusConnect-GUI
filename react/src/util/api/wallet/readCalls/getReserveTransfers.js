import { getApiData } from '../../callCreator'
import { API_GET_RESERVE_TRANSFERS } from '../../../constants/componentConstants'

export const getReserveTransfers = async (mode, chainTicker) => {
  let params = {chainTicker}

  try {
    return await getApiData(mode, API_GET_RESERVE_TRANSFERS, params)
  } catch (e) {
    throw e
  }
}