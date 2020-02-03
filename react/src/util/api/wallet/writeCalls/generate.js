import { getApiData } from '../../callCreator'
import { API_START_MINING, API_START_STAKING, API_STOP_MINING, API_STOP_STAKING } from '../../../constants/componentConstants'

/**
 * Function to start mining (native only)
 * @param {String} mode native
 * @param {String} chainTicker Ticker symbol for coin to fetch addresses for
 * @param {Number} numThreads Number of threads to mine with
 */
export const startMining = async (mode, chainTicker, numThreads) => {
  const params = { chainTicker, numThreads }
  let completed = false

  try {
    //TODO: DELETE
    console.log("STARTING MINING")

    completed = await getApiData(mode, API_START_MINING, params)

    //TODO: DELETE
    console.log("FINISHED CALL")
  } catch (e) {
    throw e
  }
  
  return completed
}

/**
 * Function to start staking (native only)
 * @param {String} mode native
 * @param {String} chainTicker Ticker symbol for coin to fetch addresses for
 */
export const startStaking = async (mode, chainTicker) => {
  const params = { chainTicker }
  let completed = false

  try {
    completed = await getApiData(mode, API_START_STAKING, params)
  } catch (e) {
    throw e
  }
  
  return completed
}

/**
 * Function to stop mining (native only)
 * @param {String} mode native
 * @param {String} chainTicker Ticker symbol for coin to fetch addresses for
 */
export const stopMining = async (mode, chainTicker) => {
  const params = { chainTicker }
  let completed = false

  try {
    completed = await getApiData(mode, API_STOP_MINING, params)
  } catch (e) {
    throw e
  }
  
  return completed
}

/**
 * Function to stop staking (native only)
 * @param {String} mode native
 * @param {String} chainTicker Ticker symbol for coin to fetch addresses for
 */
export const stopStaking = async (mode, chainTicker) => {
  const params = { chainTicker }
  let completed = false

  try {
    completed = await getApiData(mode, API_STOP_STAKING, params)
  } catch (e) {
    throw e
  }
  
  return completed
}

