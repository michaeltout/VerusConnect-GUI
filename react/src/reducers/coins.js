/*
  The coin reducer conatains general coin information aggregated
  when a coin is added.
*/
import {
  SET_ACTIVATED_COINS,
  SET_COIN_STATUS,
  ACTIVATE_COIN,
  DEACTIVATE_COIN,
  SET_COIN_DISPLAY_CURRENCY,
} from "../util/constants/storeType";

export const coins = (state = {
  activatedCoins: {}
}, action) => {
  switch (action.type) {
    case SET_ACTIVATED_COINS:
      return {
        ...state,
        activatedCoins: action.activatedCoins,
      };
    case ACTIVATE_COIN:
      return {
        ...state,
        activatedCoins: {...state.activatedCoins, [action.chainTicker]: action.activatedCoin},
      };
    case DEACTIVATE_COIN:
      let newCoins = { ...state.activatedCoins }
      delete newCoins[action.chainTicker]

      return {
        ...state,
        activatedCoins: newCoins
      };
    case SET_COIN_STATUS:
      return {
        ...state,
        activatedCoins: {
          ...state.activatedCoins,
          [action.chainTicker]: {
            ...state.activatedCoins[action.chainTicker],
            status: action.status
          }
        }
      }
    case SET_COIN_DISPLAY_CURRENCY:
      return {
        ...state,
        activatedCoins: {
          ...state.activatedCoins,
          [action.chainTicker]: {
            ...state.activatedCoins[action.chainTicker],
            display_currency: action.currencyTicker
          }
        }
      }
    default:
      return state;
  }
}