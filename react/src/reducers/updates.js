/*
  This reducer contains the API fetch update state to 
  manage data retreival from the API efficiently.
*/
import { 
  SET_UPDATE_DATA, 
  EXPIRE_DATA, 
  RENEW_DATA, 
  SET_UPDATE_EXPIRED_ID, 
  SET_EXPIRE_ID, 
  CLEAR_UPDATE_EXPIRED_ID, 
  CLEAR_EXPIRE_ID, 
  OCCUPY_API_CALL,
  FREE_API_CALL,
  ENABLE_UPDATE_WARNING_SNACK,
  DISABLE_UPDATE_WARNING_SNACK} from '../util/constants/storeType'

export const updates = (state = {
  updateTracker: {},
  updateIntervals: {},
  updateWarningSnackDisabled: false
}, action) => {
  switch (action.type) {
    case SET_UPDATE_DATA:
      return {
        ...state,
        updateIntervals: {...state.updateIntervals, [action.chainTicker]: action.updateIntervalData},
        updateTracker: {...state.updateTracker, [action.chainTicker]: action.updateTrackingData},
      };
    case EXPIRE_DATA: 
      return {
        ...state,
        updateTracker: {
          ...state.updateTracker, 
          [action.chainTicker]: {
            ...state.updateTracker[action.chainTicker], 
            [action.dataType]: {
              ...state.updateTracker[action.chainTicker][action.dataType],
              needs_update: true
            }}}
      }
    case RENEW_DATA: 
      return {
        ...state,
        updateTracker: {
          ...state.updateTracker, 
          [action.chainTicker]: {
            ...state.updateTracker[action.chainTicker], 
            [action.dataType]: {
              ...state.updateTracker[action.chainTicker][action.dataType],
              needs_update: false
            }}}
      }
    case OCCUPY_API_CALL: 
      return {
        ...state,
        updateTracker: {
          ...state.updateTracker, 
          [action.chainTicker]: {
            ...state.updateTracker[action.chainTicker], 
            [action.dataType]: {
              ...state.updateTracker[action.chainTicker][action.dataType],
              busy: true
            }}}
      }
    case FREE_API_CALL: 
      return {
        ...state,
        updateTracker: {
          ...state.updateTracker, 
          [action.chainTicker]: {
            ...state.updateTracker[action.chainTicker], 
            [action.dataType]: {
              ...state.updateTracker[action.chainTicker][action.dataType],
              busy: false
            }}}
      }
    case SET_EXPIRE_ID: 
      return {
        ...state,
        updateIntervals: {
          ...state.updateIntervals, 
          [action.chainTicker]: {
            ...state.updateIntervals[action.chainTicker], 
            [action.dataType]: {
              ...state.updateIntervals[action.chainTicker][action.dataType],
              expire_id: action.timeoutId
            }}}
      }
    case CLEAR_EXPIRE_ID: 
      return {
        ...state,
        updateIntervals: {
          ...state.updateIntervals, 
          [action.chainTicker]: {
            ...state.updateIntervals[action.chainTicker], 
            [action.dataType]: {
              ...state.updateIntervals[action.chainTicker][action.dataType],
              expire_id: null
            }}}
      }
    case SET_UPDATE_EXPIRED_ID: 
      return {
        ...state,
        updateIntervals: {
          ...state.updateIntervals, 
          [action.chainTicker]: {
            ...state.updateIntervals[action.chainTicker], 
            [action.dataType]: {
              ...state.updateIntervals[action.chainTicker][action.dataType],
              update_expired_id: action.intervalId
            }}}
      }
    case CLEAR_UPDATE_EXPIRED_ID: 
      return {
        ...state,
        updateIntervals: {
          ...state.updateIntervals, 
          [action.chainTicker]: {
            ...state.updateIntervals[action.chainTicker], 
            [action.dataType]: {
              ...state.updateIntervals[action.chainTicker][action.dataType],
              update_expired_id: null
            }}}
      }
    case ENABLE_UPDATE_WARNING_SNACK:
      return {
        ...state,
        updateWarningSnackDisabled: false
      }
    case DISABLE_UPDATE_WARNING_SNACK:
      return {
        ...state,
        updateWarningSnackDisabled: true
      }
    default:
      return state;
  }
}