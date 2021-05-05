import React from 'react';
import MiningStyles from './mining.styles'
import {
  DASHBOARD,
  MINING_POSTFIX,
  MS_IDLE,
  CHAIN_FALLBACK_IMAGE,
  ADD_DEFAULT_COIN,
  POST_SYNC,
  FIX_CHARACTER
} from "../../../../util/constants/componentConstants";
import Tooltip from '@material-ui/core/Tooltip';
import { openAddCoinModal } from '../../../../actions/actionDispatchers';
import CircularProgress from '@material-ui/core/CircularProgress';
import { normalizeNum } from '../../../../util/displayUtil/numberFormat';

export const MiningCardRender = function(coinObj) {
  const {
    balances,
    mainPathArray,
  } = this.props;
  const miningState = this.state.miningStates[coinObj.id] ? this.state.miningStates[coinObj.id] : MS_IDLE

  const errorOrLoading = coinObj.status !== POST_SYNC
  const isActive = mainPathArray.includes(`${coinObj.id}${FIX_CHARACTER}${MINING_POSTFIX}`);
  const coinBalance = balances[coinObj.id]
    ? balances[coinObj.id].native.public.confirmed +
      (balances[coinObj.id].native.private.confirmed
        ? balances[coinObj.id].native.private.confirmed
        : 0)
    : "-";

  // TODO: Possibly re-add ability to deactivate coin from here down in newline at bottom of returned component
  return (
    <button
      className="unstyled-button"
      onClick={() => { this.openCoin(coinObj.id) }}
      key={coinObj.id}
      style={MiningStyles.cardClickableContainer}
    >
      <div
        className="d-flex flex-column align-items-end"
        style={MiningStyles.cardContainer}
      >
        <div
          className={`card ${isActive ? "active-card" : "border-on-hover"}`}
          style={MiningStyles.cardInnerContainer}
        >
          {errorOrLoading && (
            <div
              style={{
                color: `rgb(49, 101, 212)`,
                alignSelf: "flex-end",
                height: 20,
              }}
            >
              <CircularProgress
                variant={"indeterminate"}
                thickness={4.5}
                size={20}
                color="inherit"
              />
            </div>
          )}
          <div
            className="card-body d-flex justify-content-between"
            style={{
              ...MiningStyles.cardBody,
              paddingTop: errorOrLoading ? 0 : 20,
            }}
          >
            <div>
              <div
                className="d-flex"
                style={MiningStyles.cardCoinInfoContainer}
              >
                <img
                  src={`assets/images/cryptologo/btc/${coinObj.id.toLowerCase()}.png`}
                  width="25px"
                  height="25px"
                  onError={(e) => {e.target.src = CHAIN_FALLBACK_IMAGE}}
                />
                <h4 style={MiningStyles.cardCoinName}>
                  <strong>{coinObj.name}</strong>
                </h4>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <Tooltip title={this.miningStateDescs[miningState]}>
                <img
                  src={`assets/images/icons/status_icons/${miningState}.svg`}
                  width="70px"
                  height="30px"
                />
              </Tooltip>
              <h5 className="text-right" style={MiningStyles.balance}>
                {`${
                    isNaN(coinBalance)
                      ? coinBalance
                      : normalizeNum(Number(coinBalance.toFixed(8)))[3]
                  } ${
                    coinObj.id.length > 4
                      ? `${coinObj.id.substring(0, 5)}...`
                      : coinObj.id
                  }`}
              </h5>
            </div>
          </div>
        </div>
        
      </div>
    </button>
  );
}

export const MiningTabsRender = function() {
  return [
    {
      title: "Mining Dashboard",
      icon: 'fa-home',
      onClick: () => this.openDashboard(),
      isActive: () => this.props.mainPathArray.includes(DASHBOARD)
    },
    {
      title: "Add Coin",
      icon: 'fa-plus',
      onClick: () => openAddCoinModal(ADD_DEFAULT_COIN),
      isActive: () => false
    }
  ];
}