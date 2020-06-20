import {
  SET_COIN_STATUS,
  SET_ACTIVATED_COINS,
} from "../../../../util/constants/storeType";


export const setCoinStatus = (chainTicker, status) => {
  return {
    type: SET_COIN_STATUS,
    chainTicker,
    status
  }
}

export const setActivatedCoins = (activatedCoins) => {
  return {
    type: SET_ACTIVATED_COINS,
    activatedCoins
  }
}