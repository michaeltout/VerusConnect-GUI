import {
  START_LOADING_MINING_FUNCTIONS,
  FINISH_LOADING_MINING_FUNCTIONS
} from "../../../../util/constants/storeType";

export const startLoadingMiningFunctions = (chainTicker) => {
  return {
    type: START_LOADING_MINING_FUNCTIONS,
    chainTicker
  }
}

export const finishLoadingMiningFunctions = (chainTicker) => {
  return {
    type: FINISH_LOADING_MINING_FUNCTIONS,
    chainTicker
  }
}