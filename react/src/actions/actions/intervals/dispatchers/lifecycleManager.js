import { refreshCoinIntervals } from '../../../actionDispatchers'
import {
  NATIVE,
  ETH,
  ELECTRUM,
  PRE_DATA,
  SYNCING,
  POST_SYNC,
  API_GET_INFO,
  ERC20
} from "../../../../util/constants/componentConstants";
import { setCoinStatus } from '../../../actionCreators'

export const activateChainLifecycle = (mode, chainTicker) => {
  const ON_COMPLETE_FUNCTIONS = {
    [NATIVE]: nativeGetInfoOnComplete,
    [ELECTRUM]: {},
    [ETH]: {}, //TODO: FINISH,
    [ERC20]: {}
  }

  if (mode === NATIVE) {
    refreshCoinIntervals(mode, chainTicker, {[API_GET_INFO]: {update_expired_oncomplete: ON_COMPLETE_FUNCTIONS[mode]}})
  } else if (mode === ETH || mode === ELECTRUM || mode === ERC20) {
    refreshCoinIntervals(mode, chainTicker)
  } else {
    throw new Error(`${mode} is not a supported coin mode.`)
  }
}

export const nativeGetInfoOnComplete = (state, dispatch, chainTicker) => {
  const currentStatus = state.coins.activatedCoins[chainTicker].status;
  const getInfoResult = state.ledger.info[chainTicker];
  const getInfoError = state.errors[API_GET_INFO][chainTicker];
  const refresh = () =>
    refreshCoinIntervals(NATIVE, chainTicker, {
      [API_GET_INFO]: { update_expired_oncomplete: nativeGetInfoOnComplete }
    });

  if (getInfoError && getInfoError.error) return;

  if (
    typeof getInfoResult !== "object" ||
    !getInfoResult.hasOwnProperty("blocks")
  ) {
    if (currentStatus !== PRE_DATA) {
      dispatch(setCoinStatus(chainTicker, PRE_DATA));
      refresh();
    }
  } else if (
    getInfoResult.longestchain != null &&
    (getInfoResult.longestchain === 0 ||
      getInfoResult.longestchain > getInfoResult.blocks)
  ) {
    if (currentStatus !== SYNCING) {
      dispatch(setCoinStatus(chainTicker, SYNCING));
      refresh();
    }
  } else {
    if (currentStatus !== POST_SYNC) {
      dispatch(setCoinStatus(chainTicker, POST_SYNC));
      refresh();
    }
  }
};