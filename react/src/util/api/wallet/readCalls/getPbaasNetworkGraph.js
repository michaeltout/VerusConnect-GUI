import { getApiData } from '../../callCreator'
import { API_GET_PBAAS_NETWORK_GRAPH } from '../../../constants/componentConstants'

export const getPbaasNetworkGraph = async (mode, chainTicker) => {
  let params = {chainTicker}

  try {
    return await getApiData(mode, API_GET_PBAAS_NETWORK_GRAPH, params)
  } catch (e) {
    throw e
  }
}