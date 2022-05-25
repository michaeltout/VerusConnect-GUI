import { getApiData } from '../callCreator'
import { API_BRIDGEKEEPER_START, API_BRIDGEKEEPER_STOP, API_BRIDGEKEEPER_STATUS, NATIVE } from '../../constants/componentConstants'

export const startBridgekeeperprocess = async (chainTicker) => {
  let params = { chainTicker }

  try {
    return await getApiData(NATIVE, API_BRIDGEKEEPER_START, params);
  } catch (e) {
    throw e;
  }
};

export const stopBridgekeeperprocess = async (chainTicker) => {
  let params = { chainTicker }
  
    try {
      return await getApiData(NATIVE, API_BRIDGEKEEPER_STOP, params);
    } catch (e) {
      throw e;
    }
};

export const bridgekeeperStatus = async (chainTicker) => {
  let params = { chainTicker }

  try {
    return await getApiData(NATIVE, API_BRIDGEKEEPER_STATUS, params);
  } catch (e) {
    throw e;
  }
};