import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CurrenciesCardRender } from './CurrenciesCard.render'
import { openCurrencyCard } from '../../actions/actionDispatchers';
import { getDisplayCurrency } from '../../util/multiverse/multiverseCurrencyUtils';

function openCurrencyInfo(props, rowData) {
  openCurrencyCard(rowData, props.coin, true)
}

function filterCurrencies(currencies, searchTerm) {
  let newCurrencies = []
  const term = searchTerm.toLowerCase()
  
  currencies.map((displayCurrency) => {
    const { currency, age, ageString, status } = displayCurrency
    const { currencyid, name } = currency

    if (searchTerm.length > 0) {
      if (
        (currencyid != null && currencyid.toLowerCase().includes(term)) ||
        term.includes(currencyid.toLowerCase())
      ) {
        newCurrencies.push(displayCurrency);
        return;
      }
      if (age != null && age.toString().includes(term)) {
        newCurrencies.push(displayCurrency);
        return;
      }
      if (name != null && name.toLowerCase().includes(term) ||
          name.includes(currencyid.toLowerCase())) {
        newCurrencies.push(displayCurrency);
        return;
      }
      if (ageString != null && ageString.toLowerCase().includes(term) ||
          term.includes(ageString.toLowerCase())) {
        newCurrencies.push(displayCurrency);
        return;
      }
      if (status != null && status.includes(term) ||
          term.includes(status)) {
        newCurrencies.push(displayCurrency);
        return;
      }
    } else newCurrencies.push(displayCurrency)
  })
  
  return newCurrencies
}

function getDisplayCurrencies(currencies, info) {
  let currencyComps = currencies.map((currency) =>
    getDisplayCurrency(
      currency,
      info[currency.parent_name]
        ? info[currency.parent_name].longestchain
        : -1
    )
  );

  currencyComps.sort((a, b) => (a.currency.name > b.currency.name) ? 1 : -1)

  return currencyComps
}

function CurrenciesCard(props) {
  const [displayCurrencies, setDisplayCurrencies] = useState([])
  const [currencySearchTerm, setCurrencySearchTerm] = useState('')
  const [activeTicker, setActiveTicker] = useState(null)
  const { allCurrencies, info } = props
  const currencyArray =
    activeTicker == null
      ? Object.values(allCurrencies).flat()
      : allCurrencies[activeTicker];
  
  useEffect(
    () =>
      setDisplayCurrencies(
        filterCurrencies(getDisplayCurrencies(currencyArray, info), currencySearchTerm)
      ),
    [allCurrencies, info]
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
    },
    props
  );
}

CurrenciesCard.propTypes = {
  allCurrencies: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired
};

export default CurrenciesCard
