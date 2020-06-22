import React from 'react';
import VerusIdStyles from './verusId.styles'
import { DASHBOARD, ID_POSTFIX, CHAIN_FALLBACK_IMAGE } from '../../../../util/constants/componentConstants'
import { openAddCoinModal } from '../../../../actions/actionDispatchers';

export const IdCardRender = function(coinObj) {
  const { identities } = this.props
  const { activeId } = this.state
  const coinIdentities = identities[coinObj.id] || []

  return (
    <div
      className="unstyled-button"
      //onClick={() => this.openCoin(coinObj.id)} key={coinObj.id}
      style={VerusIdStyles.cardClickableContainer}
    >
      <div
        className="d-flex flex-column align-items-end"
        style={VerusIdStyles.cardContainer}
      >
        <div
          className={`card ${
            activeId.chainTicker === coinObj.id
              ? "active-card"
              : "border-on-hover"
          }`}
          style={VerusIdStyles.cardInnerContainer}
        >
          <div
            className="card-body d-flex justify-content-between"
            style={VerusIdStyles.cardBody}
          >
            <div style={{ width: "100%" }}>
              <div
                className="d-flex"
                style={VerusIdStyles.cardCoinInfoContainer}
              >
                <img
                  src={`assets/images/cryptologo/btc/${coinObj.id.toLowerCase()}.png`}
                  width="25px"
                  height="25px"
                  onError={(e) => {e.target.src = CHAIN_FALLBACK_IMAGE}}
                />
                <h4 style={VerusIdStyles.cardCoinName}>
                  <strong>{coinObj.name}</strong>
                </h4>
              </div>
              <select
                value={
                  activeId.idIndex != null &&
                  activeId.chainTicker === coinObj.id
                    ? JSON.stringify(coinIdentities[activeId.idIndex])
                    : -1
                }
                name="selectedProfileId"
                className="custom-select custom-select-lg"
                style={{ marginTop: 10 }}
                //Selected index is offset by one due to "Select Identity" placeholder
                onChange={e =>
                  this.openId(coinObj.id, e.target.selectedIndex - 1)
                }
              >
                <option key={-1} value={-1} disabled={true}>
                  {"Select identity"}
                </option>
                {coinIdentities.map((idObj, index) => {
                  {
                    const { identity } = idObj;
                    return (
                      <option key={index} value={JSON.stringify(idObj)}>
                        {`${identity.name}@`}
                      </option>
                    );
                  }
                })}
              </select>
              <button
                className="unstyled-button"
                onClick={() => this.openSearchModal(coinObj.id)}
                style={VerusIdStyles.cardClickableContainer}
              >
              <div
                className="d-flex flex-column align-items-end"
                style={VerusIdStyles.searchButtonContainer}
              >
                <div
                  className={'card border-on-hover'}
                  style={VerusIdStyles.cardInnerContainer}
                >
                  <div style={VerusIdStyles.cardInnerTextContainer}>
                    <i
                      className={'fas fa-search'}
                      style={{ paddingRight: 6, color: 'black' }}
                    />
                    {"ID Search"}
                  </div>
                </div>
              </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const IdTabsRender = function() {
  return [
    {
      title: "Add Coin",
      icon: 'fa-plus',
      onClick: openAddCoinModal,
      isActive: () => false
    },
    {
      title: "VerusID Dashboard",
      icon: 'fa-home',
      onClick: () => this.openDashboard(),
      isActive: () => this.props.mainPathArray.includes(DASHBOARD)
    }
  ];
}