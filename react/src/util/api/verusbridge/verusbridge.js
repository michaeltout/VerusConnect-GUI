import { getApiData } from '../callCreator'
import { API_BRIDGEKEEPER_START, API_BRIDGEKEEPER_STOP } from '../../constants/componentConstants'

export const startBridgekeeperprocess = async (mode, chain, filename) => {
  let params = { chain, filename };

  try {
    return await getApiData(mode, API_BRIDGEKEEPER_START, params);
  } catch (e) {
    throw e;
  }
};

export const stopBridgekeeperprocess = async (mode, chain, filename) => {
    let params = { chain, filename };
  
    try {
      return await getApiData(mode, API_BRIDGEKEEPER_STOP, params);
    } catch (e) {
      throw e;
    }
};