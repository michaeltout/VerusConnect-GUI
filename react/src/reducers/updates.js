/*
  This reducer contains the API fetch update state to 
  manage data retreival from the API efficiently.
*/
import {
  SET_COIN_UPDATE_DATA,
  SET_SYSTEM_UPDATE_DATA,
  EXPIRE_COIN_DATA,
  RENEW_COIN_DATA,
  SET_COIN_UPDATE_EXPIRED_ID,
  SET_COIN_EXPIRE_ID,
  CLEAR_COIN_UPDATE_EXPIRED_ID,
  CLEAR_COIN_EXPIRE_ID,
  OCCUPY_COIN_API_CALL,
  FREE_COIN_API_CALL,
  ENABLE_UPDATE_WARNING_SNACK,
  DISABLE_UPDATE_WARNING_SNACK,
  SET_SYSTEM_UPDATE_INTERVAL_ID,
  CLEAR_SYSTEM_UPDATE_INTERVAL_ID,
  OCCUPY_SYSTEM_API_CALL,
  FREE_SYSTEM_API_CALL
} from "../util/constants/storeType";

export const updates = (state = {
  coinUpdateTracker: {},
  coinUpdateIntervals: {},
  systemUpdateTracker: {},
  systemUpdateIntervals: {},
  updateWarningSnackDisabled: false,
}, action) => {
  switch (action.type) {
    case SET_COIN_UPDATE_DATA:
      return {
        ...state,
        coinUpdateIntervals: {...state.coinUpdateIntervals, [action.chainTicker]: action.updateIntervalData},
        coinUpdateTracker: {...state.coinUpdateTracker, [action.chainTicker]: action.updateTrackingData},
      };
    case EXPIRE_COIN_DATA: 
      return {
        ...state,
        coinUpdateTracker: {
          ...state.coinUpdateTracker, 
          [action.chainTicker]: {
            ...state.coinUpdateTracker[action.chainTicker], 
            [action.dataType]: {
              ...state.coinUpdateTracker[action.chainTicker][action.dataType],
              needs_update: true
            }}}
      }
    case RENEW_COIN_DATA: 
      return {
        ...state,
        coinUpdateTracker: {
          ...state.coinUpdateTracker, 
          [action.chainTicker]: {
            ...state.coinUpdateTracker[action.chainTicker], 
            [action.dataType]: {
              ...state.coinUpdateTracker[action.chainTicker][action.dataType],
              needs_update: false
            }}}
      }
    case OCCUPY_COIN_API_CALL: 
      return {
        ...state,
        coinUpdateTracker: {
          ...state.coinUpdateTracker, 
          [action.chainTicker]: {
            ...state.coinUpdateTracker[action.chainTicker], 
            [action.dataType]: {
              ...state.coinUpdateTracker[action.chainTicker][action.dataType],
              busy: true
            }}}
      }
    case FREE_COIN_API_CALL: 
      return {
        ...state,
        coinUpdateTracker: {
          ...state.coinUpdateTracker, 
          [action.chainTicker]: {
            ...state.coinUpdateTracker[action.chainTicker], 
            [action.dataType]: {
              ...state.coinUpdateTracker[action.chainTicker][action.dataType],
              busy: false
            }}}
      }
    case SET_COIN_EXPIRE_ID: 
      return {
        ...state,
        coinUpdateIntervals: {
          ...state.coinUpdateIntervals, 
          [action.chainTicker]: {
            ...state.coinUpdateIntervals[action.chainTicker], 
            [action.dataType]: {
              ...state.coinUpdateIntervals[action.chainTicker][action.dataType],
              expire_id: action.timeoutId
            }}}
      }
    case CLEAR_COIN_EXPIRE_ID: 
      return {
        ...state,
        coinUpdateIntervals: {
          ...state.coinUpdateIntervals, 
          [action.chainTicker]: {
            ...state.coinUpdateIntervals[action.chainTicker], 
            [action.dataType]: {
              ...state.coinUpdateIntervals[action.chainTicker][action.dataType],
              expire_id: null
            }}}
      }
    case SET_COIN_UPDATE_EXPIRED_ID: 
      return {
        ...state,
        coinUpdateIntervals: {
          ...state.coinUpdateIntervals, 
          [action.chainTicker]: {
            ...state.coinUpdateIntervals[action.chainTicker], 
            [action.dataType]: {
              ...state.coinUpdateIntervals[action.chainTicker][action.dataType],
              update_expired_id: action.intervalId
            }}}
      }
    case CLEAR_COIN_UPDATE_EXPIRED_ID: 
      return {
        ...state,
        coinUpdateIntervals: {
          ...state.coinUpdateIntervals, 
          [action.chainTicker]: {
            ...state.coinUpdateIntervals[action.chainTicker], 
            [action.dataType]: {
              ...state.coinUpdateIntervals[action.chainTicker][action.dataType],
              update_expired_id: null
            }}}
      }
    case SET_SYSTEM_UPDATE_DATA:
      return {
        ...state,
        systemUpdateTracker: action.updateTrackingData,
        systemUpdateIntervals: action.updateIntervalData
      };
    case SET_SYSTEM_UPDATE_INTERVAL_ID:
      return {
        ...state,
        systemUpdateIntervals: {
          ...state.systemUpdateIntervals,
          [action.dataType]: {
            ...state.systemUpdateIntervals[action.dataType],
            interval_id: action.intervalId
          }
        }
      }
    case CLEAR_SYSTEM_UPDATE_INTERVAL_ID:
      return {
        ...state,
        systemUpdateIntervals: {
          ...state.systemUpdateIntervals,
          [action.dataType]: {
            ...state.systemUpdateIntervals[action.dataType],
            interval_id: null
          }
        }
      }
    case OCCUPY_SYSTEM_API_CALL:
      return {
        ...state,
        systemUpdateTracker: {
          ...state.systemUpdateTracker,
          [action.dataType]: {
            ...state.systemUpdateTracker[action.dataType],
            busy: true
          }
        }
      }
    case FREE_SYSTEM_API_CALL:
      return {
        ...state,
        systemUpdateTracker: {
          ...state.systemUpdateTracker,
          [action.dataType]: {
            ...state.systemUpdateTracker[action.dataType],
            busy: false
          }
        }
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