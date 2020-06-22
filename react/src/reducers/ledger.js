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
  DEACTIVATE_COIN,
  SET_COIN_IDENTITIES,
  SET_COIN_NAME_COMMITMENTS,
  SET_COIN_CURRENTSUPPLY,
  SET_COIN_BLOCKREWARD,
  SET_COIN_ALL_CURRENCIES,
  SET_COIN_CURRENCY_DATA_MAP
} from '../util/constants/storeType'

export const ledger = (state = {
  balances: {},
  transactions: {},
  info: {},
  addresses: {},
  miningInfo: {},
  zOperations: {},
  definedChains: {},
  fiatPrices: {},
  identities: {},
  allCurrencies: {},
  nameCommitments: {},
  currentSupply: {},
  blockReward: {},
  currencyDataMap: {},
  multiverseNameMap: {},
  currencyConversionGraph: {}
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
        fiatPrices,
        identities,
        nameCommitments,
        currentSupply,
        blockReward,
        allCurrencies,
        currencyDataMap,
        multiverseNameMap,
        currencyConversionGraph
      } = state
      let newLedger = {
        balances,
        transactions,
        info,
        addresses,
        miningInfo,
        zOperations,
        definedChains,
        fiatPrices,
        identities,
        nameCommitments,
        currentSupply,
        blockReward,
        allCurrencies,
        currencyDataMap,
        multiverseNameMap,
        currencyConversionGraph
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
      if (state.miningInfo[action.chainTicker]) {
        if (
          state.miningInfo[action.chainTicker].maxrecordedhps <
          action.miningInfo.localhashps
        ) {
          action.miningInfo.maxrecordedhps = action.miningInfo.localhashps;
        } else {
          action.miningInfo.maxrecordedhps = state.miningInfo[action.chainTicker].localhashps;
        }
          
      } else action.miningInfo.maxrecordedhps = 0;

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
    case SET_COIN_BLOCKREWARD:
      return {
        ...state,
        blockReward: {...state.blockReward, [action.chainTicker]: action.blockReward}
      };
    case SET_COIN_FIATPRICE:
      return {
        ...state,
        fiatPrices: {...state.fiatPrices, [action.chainTicker]: action.fiatPrice}
      }
    case SET_COIN_IDENTITIES:
      return {
        ...state,
        identities: {...state.identities, [action.chainTicker]: action.identities},
        multiverseNameMap: {
          ...state.multiverseNameMap,
          [action.chainTicker]: {
            ...state.multiverseNameMap[action.chainTicker],
            ...action.nameMap,
          },
        },
      }
    case SET_COIN_ALL_CURRENCIES:
      return {
        ...state,
        allCurrencies: {...state.allCurrencies, [action.chainTicker]: action.currencies}
      }
    case SET_COIN_NAME_COMMITMENTS:
      return {
        ...state,
        nameCommitments: {...state.nameCommitments, [action.chainTicker]: action.nameCommitments}
      }
    case SET_COIN_CURRENTSUPPLY:
      return {
        ...state,
        currentSupply: {...state.currentSupply, [action.chainTicker]: action.currentSupply}
      }
    case SET_COIN_CURRENCY_DATA_MAP:
      return {
        ...state,
        currencyDataMap: {
          ...state.currencyDataMap,
          [action.chainTicker]: action.dataMap.currencyData,
        },
        multiverseNameMap: {
          ...state.multiverseNameMap,
          [action.chainTicker]: {
            ...state.multiverseNameMap[action.chainTicker],
            ...action.dataMap.currencyNames,
          },
        },
        currencyConversionGraph: {
          ...state.currencyConversionGraph,
          [action.chainTicker]: action.conversionGraph,
        },
      };
    default:
      return state;
  }
}