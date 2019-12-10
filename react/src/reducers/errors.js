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
  ERROR_COIN_NAME_COMMITMENTS
} from '../util/constants/storeType'
import {
  API_GET_ZOPERATIONSTATUSES,
  API_GET_BALANCES,
  API_GET_DEFINEDCHAINS,
  API_GET_INFO,
  API_GET_TRANSACTIONS,
  API_GET_MININGINFO,
  API_GET_ADDRESSES,
  API_GET_FIATPRICE,
  API_ACTIVATE_COIN,
  API_GET_IDENTITIES,
  API_GET_NAME_COMMITMENTS
} from '../util/constants/componentConstants'

export const errors = (state = {
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
  [API_GET_NAME_COMMITMENTS]: {}
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
    case ERROR_COIN_NAME_COMMITMENTS:
      return {
        ...state,
        [API_GET_NAME_COMMITMENTS]: {...state[API_GET_NAME_COMMITMENTS], [action.chainTicker]: {error: true, result: action.result}}
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
    case SET_COIN_NAME_COMMITMENTS:
      return {
        ...state,
        [API_GET_NAME_COMMITMENTS]: {...state[API_GET_NAME_COMMITMENTS], [action.chainTicker]: {error: false, result: null}}
      };
    default:
      return state;
  }
}