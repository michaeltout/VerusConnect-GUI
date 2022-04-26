import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import { checkFlag } from '../../util/flagUtils';
import { IS_FRACTIONAL_FLAG } from '../../util/constants/flags';
import { SupplyDistributionCardRender } from './SupplyDistributionCard.render';
import randomColor from 'randomcolor';

function calculateSupplyDistribution(chainCurrencies, coinSupply, selfCurrency) {
  if (coinSupply == null || chainCurrencies == null || selfCurrency == null) return [];
  let remainingSupply = coinSupply
  let supplyDistribution = []

  for (const currency of chainCurrencies) {
    const { options, bestcurrencystate, fullyqualifiedname, currencyid } = currency
    const { currencyid: selfcurrencyid } = selfCurrency

    const isFractional = checkFlag(options, IS_FRACTIONAL_FLAG);

    if (isFractional && bestcurrencystate) {
      for (const reserve of bestcurrencystate.reservecurrencies) {
        if (reserve.currencyid === selfcurrencyid) {
          remainingSupply -= reserve.reserves
          supplyDistribution.push({
            amount: reserve.reserves,
            name: `${fullyqualifiedname} reserve`,
            value: (reserve.reserves/coinSupply)*100,
            color: randomColor.randomColor({ seed: currencyid })
          })
        }
      }
    }
  }

  supplyDistribution.push({
    amount: remainingSupply,
    name: "Other",
    value: (remainingSupply/coinSupply)*100,
    color: "#959595"
  })

  return supplyDistribution.sort(function (a, b) {
    if (a.value < b.value) return 1;
    else if (a.value > b.value) return -1;
    else return 0;
  });
}

function SupplyDistributionCard(props) {
  const { coin } = props;

  const [supplyDistribution, setSupplyDistribution] = useState([])
  const allCurrencies = useSelector((state) => state.ledger.allCurrencies[coin]);
  const selfCurrency =
    allCurrencies == null
      ? null
      : allCurrencies.find((x) => x.fullyqualifiedname.toLowerCase() === coin.toLowerCase());
  const currentSupply = useSelector(state => state.ledger.currentSupply[coin])

  useEffect(
    () =>
      setSupplyDistribution(
        calculateSupplyDistribution(allCurrencies, currentSupply ? currentSupply.total : null, selfCurrency)
      ),
    [allCurrencies, currentSupply, selfCurrency]
  );

  return SupplyDistributionCardRender({ supplyDistribution }, { coin })
}

SupplyDistributionCard.propTypes = {
  coin: PropTypes.string.isRequired,
};

export default SupplyDistributionCard
