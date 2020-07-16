/*
  This reducer contains information about the 
  currency blacklists and whitelists stored locally.
  Graylists are contained in the ledger reducer, as they
  are going to be fetched from the blockchain. 
*/

import { 
  SET_ALL_CURRENCY_WHITELISTS,
  SET_ALL_CURRENCY_BLACKLISTS,
  SET_CURRENCY_BLACKLIST,
  SET_CURRENCY_WHITELIST
} from '../util/constants/storeType'
import {
  BLACKLISTS,
  WHITELISTS
} from "../util/constants/componentConstants";

export const localCurrencyLists = (state = {
  [BLACKLISTS]: {},
  [WHITELISTS]: {}
}, action) => {
  switch (action.type) {
    case SET_ALL_CURRENCY_BLACKLISTS:
      return {
        ...state,
        [BLACKLISTS]: action.data
      };
    case SET_ALL_CURRENCY_WHITELISTS:
      return {
        ...state,
        [WHITELISTS]: action.data
      };
    case SET_CURRENCY_BLACKLIST:
      return {
        ...state,
        [BLACKLISTS]: {
          ...state[BLACKLISTS],
          [action.chainTicker]: action.list
        }
      };
    case SET_CURRENCY_WHITELIST:
      return {
        ...state,
        [WHITELISTS]: {
          ...state[WHITELISTS],
          [action.chainTicker]: action.list
        }
      };
    default:
      return state;
  }
}