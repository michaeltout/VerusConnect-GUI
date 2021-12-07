import Store from '../../../../store'
import { setModalParams } from '../../modal/creators/modal';
import { setModalNavigationPath } from '../creators/navigator';
import {
  ID_INFO,
  CURRENCY_INFO,
  ADD_COIN,
  SELECT_COIN,
  BASIC_MODAL,
  SPLIT_MODAL,
  ADD_DEFAULT_COIN,
  LOCK_WITH_DELAY,
  SETUP_VAULT,
  CONFIGURE_TIMELOCK
} from "../../../../util/constants/componentConstants";

export const openModal = (modal, modalParams = {}, modalType = BASIC_MODAL) => {
  Store.dispatch(setModalParams(modal, modalParams));
  Store.dispatch(setModalNavigationPath(`${modalType}/${modal}`));
}

export const openCurrencyCard = (currency, chainTicker, identities, isInDisplayFormat = false) => {
  Store.dispatch(setModalNavigationPath(null))
  openModal(CURRENCY_INFO, {
    chainTicker,
    [isInDisplayFormat ? "currencyInfo" : "activeCurrency"]: currency,
    openIdentityCard,
    openCurrencyCard,
    identities
  });
}

export const openIdentityCard = (activeIdentity, chainTicker, initialTab) => {
  Store.dispatch(setModalNavigationPath(null))
  openModal(ID_INFO, { chainTicker, activeIdentity, initialTab, openIdentityCard, openCurrencyCard });
}

export const openAddCoinModal = (mode = ADD_DEFAULT_COIN) => {
  openModal(
    `${ADD_COIN}/${SELECT_COIN}`,
    {
      mode,
    },
    SPLIT_MODAL
  );
}

export const openSetupVaultModal = (mode = LOCK_WITH_DELAY, chainTicker, coinMode, identity) => {
  openModal(
    `${SETUP_VAULT}/${CONFIGURE_TIMELOCK}`,
    {
      mode,
      chainTicker,
      coinMode,
      identity
    },
    SPLIT_MODAL
  );
}