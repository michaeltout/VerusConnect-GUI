import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import { API_GET_CURRENTSUPPLY, API_GET_MININGINFO, NATIVE, PRE_DATA, SYNCING } from '../../util/constants/componentConstants';
import { normalizeNum } from '../../util/displayUtil/numberFormat';
import { secondsToTime } from '../../util/displayUtil/timeUtils';
import WalletPaper from '../WalletPaper/WalletPaper';
import { conditionallyUpdateWallet } from '../../actions/actionDispatchers';
import store from '../../store';

function PbaasOverviewCard(props) {
  const { coin } = props;

  const allCurrencies = useSelector(state => state.ledger.allCurrencies[coin])
  const selfCurrency =
    allCurrencies == null
      ? null
      : allCurrencies.find((x) => x.fullyqualifiedname.toLowerCase() === coin.toLowerCase());

  if (selfCurrency == null) return null 

  const {
    startblock,
    endblock,
    systemname,
    preallocations,
    fullyqualifiedname,
    idregistrationfees,
    currencyregistrationfee,
    pbaassystemregistrationfee,
  } = selfCurrency;

  let preallocation = 0

  if (preallocations) {
    preallocations.map(x => { 
      Object.values(x).map(y => {
        preallocation = preallocation + y
      })
    })
  }

  const preallocationLabel = normalizeNum(preallocation)
  const idRegLabel = normalizeNum(idregistrationfees)
  const currRegLabel = normalizeNum(
    currencyregistrationfee
  )
  const chainRegLabel = normalizeNum(pbaassystemregistrationfee)
  
  const displayedSystemData = [
    {
      label: `Start Block${
        systemname.toLowerCase() === coin.toLowerCase() ? "" : ` (on ${systemname})`
      }`,
      text: startblock,
      error: false,
    },
    {
      label: `End Block${
        systemname.toLowerCase() === coin.toLowerCase() ? "" : ` (on ${systemname})`
      }`,
      text: endblock === 0 ? "N/A" : endblock,
      error: false,
    },
    {
      label: "Preallocation",
      text: `${preallocationLabel[0]}${preallocationLabel[2]} ${fullyqualifiedname}`,
      error: false,
    },
    {
      label: "ID/Currency/Chain Launch Price",
      text: `${idRegLabel[0]}${idRegLabel[2]}/${currRegLabel[0]}${currRegLabel[2]}/${chainRegLabel[0]}${chainRegLabel[2]} ${fullyqualifiedname}`,
      error: false,
    },
  ];

  return displayedSystemData.map((data, index) => {
    return (
      <WalletPaper
        style={{
          flex: 1,
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          border: "none",
          padding: 0,
          minWidth: "max-content",
          margin: 6,
          marginLeft: 0,
        }}
        key={index}
      >
        <h6
          className="card-title"
          style={{
            fontSize: 14,
            margin: 0,
            width: "max-content",
          }}
        >
          {data.label}
        </h6>
        <h5
          className="card-title"
          style={{
            margin: 0,
            marginTop: 5,
            width: "max-content",
            color: "rgb(0,0,0)",
          }}
        >
          {data.error && (
            <i
              className="fas fa-exclamation-triangle"
              style={{ paddingRight: 6, color: "rgb(236,124,43)" }}
            />
          )}
          {data.text}
        </h5>
      </WalletPaper>
    );
  });
}

PbaasOverviewCard.propTypes = {
  coin: PropTypes.string.isRequired,
};

export default PbaasOverviewCard
