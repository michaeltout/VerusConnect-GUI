import Store from '../../../../store'
import { setModalParams } from '../../modal/creators/modal';
import { setModalNavigationPath } from '../creators/navigator';
import { ID_INFO, CURRENCY_INFO } from '../../../../util/constants/componentConstants';

export const openModal = (modal, modalParams = {}) => {
  Store.dispatch(setModalParams(modal, modalParams));
  Store.dispatch(setModalNavigationPath(modal));
}

export const openCurrencyCard = (currency, chainTicker, isInDisplayFormat = false) => {
  Store.dispatch(setModalNavigationPath(null))
  openModal(CURRENCY_INFO, {
    chainTicker,
    [isInDisplayFormat ? "displayCurrency" : "activeCurrency"]: currency,
    openIdentityCard,
    openCurrencyCard,
  });
}

export const openIdentityCard = (activeIdentity, chainTicker) => {
  Store.dispatch(setModalNavigationPath(null))
  openModal(ID_INFO, { chainTicker, activeIdentity, openIdentityCard, openCurrencyCard })
}