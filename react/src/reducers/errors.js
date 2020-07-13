/*
  This reducer stores error handling data for API call information
*/

import { 
  ERROR_COIN_ADDRESSES,
  ERROR_COIN_BALANCES,
  ERROR_COIN_DEFINEDCHAINS,
  ERROR_COIN_INFO,
  ERROR_COIN_MININGINFO,
  ERROR_COIN_TRANSACTIONS,
  ERROR_COIN_ZOPERATIONS,
  ERROR_COIN_FIATPRICE,
  SET_COIN_ADDRESSES,
  SET_COIN_BALANCES,
  SET_COIN_DEFINEDCHAINS,
  SET_COIN_INFO,
  SET_COIN_MININGINFO,
  SET_COIN_TRANSACTIONS,
  SET_COIN_ZOPERATIONS,
  SET_COIN_FIATPRICE,
  ERROR_ACTIVATE_COIN,
  ACTIVATE_COIN,
  SET_COIN_IDENTITIES,
  SET_COIN_NAME_COMMITMENTS,
  ERROR_COIN_IDENTITIES,
  ERROR_COIN_ALL_CURRENCIES,
  ERROR_COIN_NAME_COMMITMENTS,
  SET_CPU_TEMP,
  SET_SYS_TIME,
  ERROR_CPU_TEMP,
  ERROR_CPU_LOAD,
  ERROR_SYS_TIME,
  SET_CPU_LOAD,
  SET_COIN_CURRENTSUPPLY,
  ERROR_COIN_CURRENTSUPPLY,
  ERROR_COIN_BLOCKREWARD,
  SET_COIN_BLOCKREWARD,
  SET_COIN_ALL_CURRENCIES,
  SET_COIN_CURRENCY_DATA_MAP,
  ERROR_COIN_CURRENCY_DATA_MAP
} from '../util/constants/storeType'
import {
  API_GET_ZOPERATIONSTATUSES,
  API_GET_BALANCES,
  API_GET_DEFINEDCHAINS,
  API_GET_BLOCKREWARD,
  API_GET_INFO,
  API_GET_TRANSACTIONS,
  API_GET_MININGINFO,
  API_GET_ADDRESSES,
  API_GET_FIATPRICE,
  API_ACTIVATE_COIN,
  API_GET_IDENTITIES,
  API_GET_NAME_COMMITMENTS,
  API_GET_CPU_TEMP,
  API_GET_CPU_LOAD,
  API_GET_SYS_TIME,
  API_GET_CURRENTSUPPLY,
  API_GET_ALL_CURRENCIES,
  API_GET_CURRENCY_DATA_MAP
} from '../util/constants/componentConstants'

export const errors = (state = {
  // Ledger calls for coins
  [API_ACTIVATE_COIN]: {},
  [API_GET_BALANCES]: {},
  [API_GET_TRANSACTIONS]: {},
  [API_GET_INFO]: {},
  [API_GET_ADDRESSES]: {},
  [API_GET_MININGINFO]: {},
  [API_GET_ZOPERATIONSTATUSES]: {},
  [API_GET_DEFINEDCHAINS]: {},
  [API_GET_FIATPRICE]: {},
  [API_GET_IDENTITIES]: {},
  [API_GET_ALL_CURRENCIES]: {},
  [API_GET_NAME_COMMITMENTS]: {},
  [API_GET_CURRENTSUPPLY]: {},
  [API_GET_BLOCKREWARD]: {},
  [API_GET_CURRENCY_DATA_MAP]: {},

  // System information calls
  [API_GET_CPU_TEMP]: {},
  [API_GET_CPU_LOAD]: {},
  [API_GET_SYS_TIME]: {}
}, action) => {
  switch (action.type) {
    case ERROR_ACTIVATE_COIN:
      return {
        ...state,
        [API_ACTIVATE_COIN]: {...state[API_ACTIVATE_COIN], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_ADDRESSES:
      return {
        ...state,
        [API_GET_ADDRESSES]: {...state[API_GET_ADDRESSES], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_BALANCES:
      return {
        ...state,
        [API_GET_BALANCES]: {...state[API_GET_BALANCES], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_DEFINEDCHAINS:
      return {
        ...state,
        [API_GET_DEFINEDCHAINS]: {...state[API_GET_DEFINEDCHAINS], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_CURRENTSUPPLY:
      return {
        ...state,
        [API_GET_CURRENTSUPPLY]: {...state[API_GET_CURRENTSUPPLY], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_BLOCKREWARD:
      return {
        ...state,
        [API_GET_BLOCKREWARD]: {...state[API_GET_BLOCKREWARD], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_INFO:
      return {
        ...state,
        [API_GET_INFO]: {...state[API_GET_INFO], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_MININGINFO:
      return {
        ...state,
        [API_GET_MININGINFO]: {...state[API_GET_MININGINFO], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_TRANSACTIONS:
      return {
        ...state,
        [API_GET_TRANSACTIONS]: {...state[API_GET_TRANSACTIONS], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_ZOPERATIONS:
      return {
        ...state,
        [API_GET_ZOPERATIONSTATUSES]: {...state[API_GET_ZOPERATIONSTATUSES], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_FIATPRICE:
      return {
        ...state,
        [API_GET_FIATPRICE]: {...state[API_GET_FIATPRICE], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_IDENTITIES:
      return {
        ...state,
        [API_GET_IDENTITIES]: {...state[API_GET_IDENTITIES], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_ALL_CURRENCIES:
      return {
        ...state,
        [API_GET_ALL_CURRENCIES]: {...state[API_GET_ALL_CURRENCIES], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_CURRENCY_DATA_MAP:
      return {
        ...state,
        [API_GET_CURRENCY_DATA_MAP]: {...state[API_GET_CURRENCY_DATA_MAP], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_COIN_NAME_COMMITMENTS:
      return {
        ...state,
        [API_GET_NAME_COMMITMENTS]: {...state[API_GET_NAME_COMMITMENTS], [action.chainTicker]: {error: true, result: action.result}}
      };
    case ERROR_CPU_TEMP:
      return {
        ...state,
        [API_GET_CPU_TEMP]: {error: true, result: action.result}
      };
    case ERROR_CPU_LOAD:
      return {
        ...state,
        [API_GET_CPU_LOAD]: {error: true, result: action.result}
      };
    case ERROR_SYS_TIME:
      return {
        ...state,
        [API_GET_SYS_TIME]: {error: true, result: action.result}
      };
    case ACTIVATE_COIN:
      return {
        ...state,
        [API_ACTIVATE_COIN]: {...state[API_ACTIVATE_COIN], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_ADDRESSES:
      return {
        ...state,
        [API_GET_ADDRESSES]: {...state[API_GET_ADDRESSES], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_BALANCES:
      return {
        ...state,
        [API_GET_BALANCES]: {...state[API_GET_BALANCES], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_DEFINEDCHAINS:
      return {
        ...state,
        [API_GET_DEFINEDCHAINS]: {...state[API_GET_DEFINEDCHAINS], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_CURRENTSUPPLY:
      return {
        ...state,
        [API_GET_CURRENTSUPPLY]: {...state[API_GET_CURRENTSUPPLY], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_BLOCKREWARD:
      return {
        ...state,
        [API_GET_BLOCKREWARD]: {...state[API_GET_BLOCKREWARD], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_INFO:
      return {
        ...state,
        [API_GET_INFO]: {...state[API_GET_INFO], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_MININGINFO:
      return {
        ...state,
        [API_GET_MININGINFO]: {...state[API_GET_MININGINFO], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_TRANSACTIONS:
      return {
        ...state,
        [API_GET_TRANSACTIONS]: {...state[API_GET_TRANSACTIONS], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_ZOPERATIONS:
      return {
        ...state,
        [API_GET_ZOPERATIONSTATUSES]: {...state[API_GET_ZOPERATIONSTATUSES], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_FIATPRICE:
      return {
        ...state,
        [API_GET_FIATPRICE]: {...state[API_GET_FIATPRICE], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_IDENTITIES:
      return {
        ...state,
        [API_GET_IDENTITIES]: {...state[API_GET_IDENTITIES], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_ALL_CURRENCIES:
      return {
        ...state,
        [API_GET_ALL_CURRENCIES]: {...state[API_GET_ALL_CURRENCIES], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_CURRENCY_DATA_MAP:
      return {
        ...state,
        [API_GET_CURRENCY_DATA_MAP]: {...state[API_GET_CURRENCY_DATA_MAP], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_COIN_NAME_COMMITMENTS:
      return {
        ...state,
        [API_GET_NAME_COMMITMENTS]: {...state[API_GET_NAME_COMMITMENTS], [action.chainTicker]: {error: false, result: null}}
      };
    case SET_CPU_TEMP:
      return {
        ...state,
        [API_GET_CPU_TEMP]: {error: false, result: null}
      };
    case SET_CPU_LOAD:
      return {
        ...state,
        [API_GET_CPU_LOAD]: {error: false, result: null}
      };
    case SET_SYS_TIME:
      return {
        ...state,
        [API_GET_SYS_TIME]: {error: false, result: null}
      };
    default:
      return state;
  }
}