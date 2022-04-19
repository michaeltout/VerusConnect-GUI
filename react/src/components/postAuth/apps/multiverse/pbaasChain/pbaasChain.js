import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IS_FRACTIONAL_FLAG, IS_GATEWAY_FLAG, IS_TOKEN_FLAG } from '../../../../../util/constants/flags';
import { checkFlag } from '../../../../../util/flagUtils';
import { PbaasChainRender } from './pbaasChain.render';

function isToken(currency) {
  return checkFlag(currency.options, IS_TOKEN_FLAG);
}

function isGateway(currency) {
  return checkFlag(currency.options, IS_GATEWAY_FLAG)
}

function isFractional(currency) {
  return (
    checkFlag(currency.options, IS_FRACTIONAL_FLAG) && isToken(currency)
  );
}

function isStandalone(currency) {
  return (
    !checkFlag(currency.options, IS_FRACTIONAL_FLAG) && isToken(currency)
  );
}

function passesIndexCheck(currency, tabIndex) {
  switch (tabIndex) {
    case 0:
      return isToken(currency)
    case 1:
      return isFractional(currency)
    case 2:
      return isGateway(currency)
    case 3:
      return isStandalone(currency)
    default:
      return false;
  }
}

function PbaasChain(props) {
  const coinCurrencies = useSelector((state) => state.ledger.allCurrencies[props.coin]);
  const [currenciesTabIndex, setCurrenciesTabIndex] = useState(0);
  const [currencies, setCurrencies] = useState([])
  const [hasCurrencies, setHasCurrencies] = useState(false)
  
  useEffect(() => {
    setCurrencies(
      coinCurrencies == null
        ? []
        : coinCurrencies.filter((currency) => passesIndexCheck(currency, currenciesTabIndex))
    );
  }, [coinCurrencies, currenciesTabIndex]);

  useEffect(() => {
    setHasCurrencies(
      coinCurrencies != null &&
        coinCurrencies.length > 0 &&
        coinCurrencies.filter((currency) => isToken(currency) || isGateway(currency)).length > 0
    );
  }, [coinCurrencies]);

  return PbaasChainRender(
    props,
    { currencies, currenciesTabIndex, hasCurrencies },
    { setCurrenciesTabIndex }
  );
}

export default PbaasChain
