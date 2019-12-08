/*
  This reducer contains user configurable settings data (in config) and
  other internal settings that can be changed on the fly
*/

import { 
  SET_CONFIG,
  SET_FIATPRICE_CURRENCY,
  SET_CONFIG_SCHEMA
} from '../util/constants/storeType'

export const settings = (state = {
  config: {
    native: {},
    electrum: {},
    verus: {},
    fiatCurrency: 'USD'
  },
  configSchema: {}
}, action) => {
  switch (action.type) {
  case SET_CONFIG:
    return {
      ...state,
      config: action.config
    };
  case SET_CONFIG_SCHEMA:
    return {
      ...state,
      configSchema: action.schema
    };
  case SET_FIATPRICE_CURRENCY:
    return {
      ...state,
      config: {...state.config, fiatCurrency: action.fiatCurrency}
    };
  default:
    return state;
  }
}