import React, { useState, useEffect } from 'react';
import { WHITELISTS } from '../../util/constants/componentConstants';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux'
import { normalizeNum } from '../../util/displayUtil/numberFormat';
import { setUserPreferredCurrency } from '../../actions/actionCreators';

function setPreferredCurrency(chain, currency, dispatch) {
  dispatch(setUserPreferredCurrency(chain, currency))
}

function CurrencySelector(props) {
  const { coin } = props;
  const dispatch = useDispatch()
  const whitelists = useSelector((state) => state.localCurrencyLists[WHITELISTS]);
  const selectedCurrency = useSelector((state) =>
    state.users.activeUser.selectedCurrencyMap[coin] == null
      ? coin
      : state.users.activeUser.selectedCurrencyMap[coin]
  );
  const balances = useSelector((state) => state.ledger.balances[coin]);
  const whitelist = whitelists[coin] ? whitelists[coin] : [];
  const currencyBalances = balances != null ? balances.reserve : null;

  return (
    <FormControl variant="outlined" style={{ flex: 1 }}>
      <InputLabel>{"Currency"}</InputLabel>
      <Select
        value={
          selectedCurrency == null ? -1 : whitelist.findIndex((value) => value === selectedCurrency)
        }
        onChange={(e) =>
          setPreferredCurrency(
            coin,
            e.target.value == -1 ? coin : whitelist[e.target.value],
            dispatch
          )
        }
        labelWidth={62}
      >
        <MenuItem value={-1}>{coin}</MenuItem>
        {whitelist.map((currency, index) => {
          const currencyBalance =
            currencyBalances == null
              ? ["-", 0, ""]
              : currencyBalances[currency] == null
              ? ["0", 0, ""]
              : normalizeNum(currencyBalances[currency].public.confirmed);

          return (
            <MenuItem
              key={index}
              value={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <div>{currency}</div>
              <div>
                {currencyBalances == null || selectedCurrency === currency
                  ? ""
                  : `${currencyBalance[0]}${currencyBalance[2]}`}
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default CurrencySelector
