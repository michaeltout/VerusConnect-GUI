/*
  This reducer contains warnings that can be thrown
  during front-end application work, for debugging 
  purposes.
*/

import { 
  LOG_WARNING
} from '../util/constants/storeType'

export const debug = (state = {
  warnings: []
}, action) => {
  switch (action.type) {
    case LOG_WARNING:
      return {
        ...state,
        warnings: [...warnings, action.warning]
      }
    default:
      return state;
  }
}