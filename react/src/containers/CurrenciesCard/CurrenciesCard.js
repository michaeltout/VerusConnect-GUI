import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CurrenciesCardRender } from './CurrenciesCard.render'
import { openCurrencyCard } from '../../actions/actionDispatchers';
import { getCurrencyInfo } from '../../util/multiverse/multiverseCurrencyUtils';
import { NATIVE, IS_VERUS } from '../../util/constants/componentConstants';
import { getCurrency } from '../../util/api/wallet/walletCalls';

async function openCurrencyInfo(rowData, identities) {
  const fullCurrency = await getCurrency(
    NATIVE,
    rowData.currency.parent_name,
    rowData.currency.currencyid
  )
  
  openCurrencyCard(
    {
      ...rowData,
      currency:
        fullCurrency.msg === "success" ? fullCurrency.result : rowData.currency,
    },
    rowData.currency.parent_name,
    identities[rowData.currency.parent_name],
    true
  );
}

function filterCurrencies(currencies, searchTerm) {
  let newCurrencies = []
  const term = searchTerm.toLowerCase()
  
  currencies.map((currencyInfo) => {
    const { currency, age, ageString, status } = currencyInfo
    const { currencyid, name } = currency

    if (searchTerm.length > 0) {
      if (
        (currencyid != null && currencyid.toLowerCase().includes(term)) ||
        term.includes(currencyid.toLowerCase())
      ) {
        newCurrencies.push(currencyInfo);
        return;
      }
      if (age != null && age.toString().includes(term)) {
        newCurrencies.push(currencyInfo);
        return;
      }
      if (name != null && name.toLowerCase().includes(term) ||
          name.includes(currencyid.toLowerCase())) {
        newCurrencies.push(currencyInfo);
        return;
      }
      if (ageString != null && ageString.toLowerCase().includes(term) ||
          term.includes(ageString.toLowerCase())) {
        newCurrencies.push(currencyInfo);
        return;
      }
      if (status != null && status.includes(term) ||
          term.includes(status)) {
        newCurrencies.push(currencyInfo);
        return;
      }
    } else newCurrencies.push(currencyInfo)
  })
  
  return newCurrencies
}

function getDisplayCurrencies(currencies, info, blacklists, identities) {
  let currencyComps = []

  currencies.map((currency) => {

    if (
      !(blacklists != null &&
      blacklists[currency.parent_name] != null &&
      blacklists[currency.parent_name].includes(currency.name))
    ) {
      currencyComps.push(getCurrencyInfo(
        currency,
        info[currency.parent_name]
          ? info[currency.parent_name].longestchain
          : -1,
        identities[currency.parent_name]
      ))
    }
  });

  currencyComps.sort((a, b) => (a.currency.name > b.currency.name) ? 1 : -1)

  return currencyComps
}

function CurrenciesCard(props) {
  const [displayCurrencies, setDisplayCurrencies] = useState([])
  const [currencySearchTerm, setCurrencySearchTerm] = useState('')
  const [activeTicker, setActiveTicker] = useState(null)
  const { allCurrencies, info, blacklists, activatedCoins, identities } = props
  const [verusCoins, setVerusCoins] = useState(Object.values(activatedCoins).filter((coinObj) => {
    return coinObj.options.tags.includes(IS_VERUS) && coinObj.mode === NATIVE
  }))
  const currencyArray =
    activeTicker == null
      ? Object.values(allCurrencies).flat()
      : allCurrencies[activeTicker];
  
  useEffect(
    () =>
      setDisplayCurrencies(
        filterCurrencies(getDisplayCurrencies(currencyArray, info, blacklists, identities), currencySearchTerm)
      ),
    [allCurrencies, info, blacklists, activatedCoins, identities]
  );

  useEffect(
    () =>
      setVerusCoins(
        Object.values(activatedCoins).filter((coinObj) => {
          return coinObj.options.tags.includes(IS_VERUS) && coinObj.mode === NATIVE
        })
      ),
    [activatedCoins]
  );

  return CurrenciesCardRender(
    openCurrencyInfo,
    getDisplayCurrencies,
    filterCurrencies,
    currencyArray,
    {
      displayCurrencies,
      setDisplayCurrencies,
      currencySearchTerm,
      setCurrencySearchTerm,
      activeTicker,
      setActiveTicker,
      verusCoins
    },
    props
  );
}

CurrenciesCard.propTypes = {
  allCurrencies: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  whitelists: PropTypes.object.isRequired,
  blacklists: PropTypes.object.isRequired,
  activatedCoins: PropTypes.object.isRequired,
  identities: PropTypes.object.isRequired
};

export default CurrenciesCard
