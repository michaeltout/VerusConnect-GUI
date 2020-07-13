import React from 'react';
import MiningStyles from './mining.styles'
import { DASHBOARD, MINING_POSTFIX, MS_IDLE, INFO_SNACK, MID_LENGTH_ALERT, CHAIN_FALLBACK_IMAGE } from '../../../../util/constants/componentConstants'
import Tooltip from '@material-ui/core/Tooltip';
import { newSnackbar } from '../../../../actions/actionCreators';
import { openAddCoinModal } from '../../../../actions/actionDispatchers';

export const MiningCardRender = function(coinObj) {
  const {
    balances,
    mainPathArray,
  } = this.props;
  const miningState = this.state.miningStates[coinObj.id] ? this.state.miningStates[coinObj.id] : MS_IDLE

  const isActive = mainPathArray.includes(`${coinObj.id}_${MINING_POSTFIX}`);
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
          <div
            className="card-body d-flex justify-content-between"
            style={MiningStyles.cardBody}
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
                  width="25px"
                  height="25px"
                />
              </Tooltip>
              <h5 className="text-right" style={MiningStyles.balance}>
                {`${
                  isNaN(coinBalance)
                    ? coinBalance
                    : Number(coinBalance.toFixed(8))
                } ${coinObj.id}`}
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
      title: "Add Coin",
      icon: 'fa-plus',
      onClick: openAddCoinModal,
      isActive: () => false
    },
    {
      title: "Mining Dashboard",
      icon: 'fa-home',
      onClick: () => this.openDashboard(),
      isActive: () => this.props.mainPathArray.includes(DASHBOARD)
    }
  ];
}