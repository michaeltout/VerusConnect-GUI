import React from 'react';
import MultiverseStyles from './multiverse.styles'
import {
  DASHBOARD,
  CHAIN_FALLBACK_IMAGE,
  ADD_DEFAULT_COIN,
  ADD_PBAAS_COIN,
  POST_SYNC
} from "../../../../util/constants/componentConstants";
import { openAddCoinModal } from '../../../../actions/actionDispatchers';
import CircularProgress from '@material-ui/core/CircularProgress';

export const MultiverseCardRender = function(coinObj) {
  const { allCurrencies } = this.props
  const errorOrLoading = coinObj.status !== POST_SYNC
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
              ...MultiverseStyles.cardBody,
              paddingTop: errorOrLoading ? 0 : 20,
            }}
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
      title: "Multiverse Dashboard",
      icon: 'fa-home',
      onClick: () => {},
      isActive: () => this.props.mainPathArray.includes(DASHBOARD)
    },
    {
      title: "Add Coin",
      icon: 'fa-plus',
      onClick: () => openAddCoinModal(ADD_DEFAULT_COIN),
      isActive: () => false
    },
    {
      title: "Add PBaaS Chain",
      icon: 'fa-globe',
      onClick: () => openAddCoinModal(ADD_PBAAS_COIN),
      isActive: () => false
    }
  ];
}