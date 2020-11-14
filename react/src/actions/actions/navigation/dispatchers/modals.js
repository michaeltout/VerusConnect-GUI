import Store from '../../../../store'
import { setModalParams } from '../../modal/creators/modal';
import { setModalNavigationPath } from '../creators/navigator';
import { ID_INFO, CURRENCY_INFO, ADD_COIN, SELECT_COIN, BASIC_MODAL } from '../../../../util/constants/componentConstants';

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

export const openIdentityCard = (activeIdentity, chainTicker) => {
  Store.dispatch(setModalNavigationPath(null))
  openModal(ID_INFO, { chainTicker, activeIdentity, openIdentityCard, openCurrencyCard })
}

export const openAddCoinModal = () => {
  openModal(`${ADD_COIN}/${SELECT_COIN}`)
}