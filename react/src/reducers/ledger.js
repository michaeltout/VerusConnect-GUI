/*
  This reducer contains ledger data (balances, transactions, wallet info, mining info)
  for each coin
*/
import { 
  SET_COIN_ADDRESSES,
  SET_COIN_BALANCES,
  SET_COIN_INFO,
  SET_COIN_MININGINFO,
  SET_COIN_TRANSACTIONS,
  SET_COIN_DEFINEDCHAINS,
  SET_COIN_ZOPERATIONS,
  SET_COIN_FIATPRICE,
  DEACTIVATE_COIN
} from '../util/constants/storeType'

export const ledger = (state = {
  balances: {},
  transactions: {},
  info: {},
  addresses: {},
  miningInfo: {},
  zOperations: {},
  definedChains: {},
  fiatPrices: {}
}, action) => {
  switch (action.type) {
    case DEACTIVATE_COIN:
      const {
        balances,
        transactions,
        info,
        addresses,
        miningInfo,
        zOperations,
        definedChains,
        fiatPrices
      } = state
      let newLedger = {
        balances,
        transactions,
        info,
        addresses,
        miningInfo,
        zOperations,
        definedChains,
        fiatPrices
      }

      Object.keys(newLedger).map(infoType => {
        delete newLedger[infoType][action.chainTicker]
      })

      return {
        ...state,
        ...newLedger
      };
    case SET_COIN_BALANCES:
      return {
        ...state,
        balances: {...state.balances, [action.chainTicker]: action.balances}
      };
    case SET_COIN_TRANSACTIONS:
      return {
        ...state,
        transactions: {...state.transactions, [action.chainTicker]: action.transactions}
      };
    case SET_COIN_INFO:
      return {
        ...state,
        info: {...state.info, [action.chainTicker]: action.info}
      };
    case SET_COIN_ADDRESSES:
      return {
        ...state,
        addresses: {...state.addresses, [action.chainTicker]: action.addresses}
      };
    case SET_COIN_MININGINFO:
      return {
        ...state,
        miningInfo: {...state.miningInfo, [action.chainTicker]: action.miningInfo}
      };
    case SET_COIN_ZOPERATIONS:
      return {
        ...state,
        zOperations: {...state.zOperations, [action.chainTicker]: action.zOperations}
      };
    case SET_COIN_DEFINEDCHAINS:
      return {
        ...state,
        definedChains: {...state.definedChains, [action.chainTicker]: action.definedChains}
      };
    case SET_COIN_FIATPRICE:
      return {
        ...state,
        fiatPrices: {...state.fiatPrices, [action.chainTicker]: action.fiatPrice}
      }
    default:
      return state;
  }
}