/*
  This reducer contains information to indicate the loading state
  of certain wallet locations, in case loading happens asynchronously
  and needs to persist when the component is unmounted.
*/

import { 
  START_LOADING_MINING_FUNCTIONS,
  FINISH_LOADING_MINING_FUNCTIONS
} from '../util/constants/storeType'
import {
  MINING_FUNCTIONS
} from "../util/constants/componentConstants";

export const loading = (state = {
  [MINING_FUNCTIONS]: {}
}, action) => {
  switch (action.type) {
    case START_LOADING_MINING_FUNCTIONS:
      return {
        ...state,
        [MINING_FUNCTIONS]: {
          ...state[MINING_FUNCTIONS],
          [action.chainTicker]: true
        }
      };
    case FINISH_LOADING_MINING_FUNCTIONS:
      return {
        ...state,
        [MINING_FUNCTIONS]: {
          ...state[MINING_FUNCTIONS],
          [action.chainTicker]: false
        }
      };
    default:
      return state;
  }
}