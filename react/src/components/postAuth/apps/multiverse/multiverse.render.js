import React from 'react';
import MultiverseStyles from './multiverse.styles'
import { DASHBOARD, ID_POSTFIX, CHAIN_FALLBACK_IMAGE } from '../../../../util/constants/componentConstants'
import { openAddCoinModal } from '../../../../actions/actionDispatchers';

export const MultiverseCardRender = function(coinObj) {
  const { allCurrencies } = this.props
  const numCurrencies = allCurrencies[coinObj.id] ? allCurrencies[coinObj.id].length : '-'

  return (
    <div
      className="unstyled-button"
      style={MultiverseStyles.cardClickableContainer}
    >
      <div
        className="d-flex flex-column align-items-end"
        style={MultiverseStyles.cardContainer}
      >
        <div
          className={'card'}
          style={MultiverseStyles.cardInnerContainer}
        >
          <div
            className="card-body d-flex justify-content-between"
            style={MultiverseStyles.cardBody}
          >
            <div style={{ width: "100%" }}>
              <div
                className="d-flex"
                style={MultiverseStyles.cardCoinInfoContainer}
              >
                <img
                  src={`assets/images/cryptologo/btc/${coinObj.id.toLowerCase()}.png`}
                  width="25px"
                  height="25px"
                  onError={(e) => {e.target.src = CHAIN_FALLBACK_IMAGE}}
                />
                <h4 style={MultiverseStyles.cardCoinName}>
                  <strong>{coinObj.name}</strong>
                </h4>
              </div>
              <button
                className="unstyled-button"
                onClick={() => this.openSearchModal(coinObj.id)}
                style={MultiverseStyles.cardClickableContainer}
              >
                <div
                  className="d-flex flex-column align-items-end"
                  style={MultiverseStyles.searchButtonContainer}
                >
                  <div
                    className={'card border-on-hover'}
                    style={MultiverseStyles.cardInnerContainer}
                  >
                    <div style={MultiverseStyles.cardInnerTextContainer}>
                      <i
                        className={'fas fa-search'}
                        style={{ paddingRight: 6, color: 'black' }}
                      />
                      {`Search ${numCurrencies} ${!isNaN(numCurrencies) && numCurrencies === 1 ? 'Currency' : 'Currencies'}`}
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

export const MultiverseTabsRender = function() {
  return [
    {
      title: "Add Coin",
      icon: 'fa-plus',
      onClick: openAddCoinModal,
      isActive: () => false
    },
    {
      title: "Multiverse Dashboard",
      icon: 'fa-home',
      onClick: () => {},
      isActive: () => this.props.mainPathArray.includes(DASHBOARD)
    }
  ];
}