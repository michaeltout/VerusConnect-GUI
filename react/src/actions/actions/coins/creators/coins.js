import {
  SET_COIN_STATUS,
  SET_ACTIVATED_COINS,
  SET_COIN_DISPLAY_CURRENCY,
} from "../../../../util/constants/storeType";


export const setCoinStatus = (chainTicker, status) => {
  return {
    type: SET_COIN_STATUS,
    chainTicker,
    status
  }
}

export const setCoinDisplayCurrency = (chainTicker, currencyTicker) => {
  return {
    type: SET_COIN_DISPLAY_CURRENCY,
    chainTicker,
    currencyTicker
  }
}

export const setActivatedCoins = (activatedCoins) => {
  return {
    type: SET_ACTIVATED_COINS,
    activatedCoins
  }
}