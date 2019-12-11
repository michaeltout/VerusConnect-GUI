import React from 'react';
import VerusIdStyles from './verusId.styles'
import { DASHBOARD, ID_POSTFIX } from '../../../../util/constants/componentConstants'

export const IdCardRender = function(coinObj) {
  const { mainPathArray, identities } = this.props
  const isActive = mainPathArray.includes(`${coinObj.id}_${ID_POSTFIX}`)
  const activeIdName =
    mainPathArray.includes(`${coinObj.id}_${ID_POSTFIX}`) &&
    mainPathArray.length > 4
      ? mainPathArray[
          mainPathArray.indexOf(`${coinObj.id}_${ID_POSTFIX}`) + 1
        ]
      : {
          name: "Select identity..."
        };

  return (
    <button 
      className="unstyled-button" 
      //onClick={() => this.openCoin(coinObj.id)} key={coinObj.id}
      style={VerusIdStyles.cardClickableContainer}>
      <div
        className="d-flex flex-column align-items-end"
        style={VerusIdStyles.cardContainer}>
        <div className={`card ${isActive ? 'active-card' : 'border-on-hover'}`} style={VerusIdStyles.cardInnerContainer}>
          <div
            className="card-body d-flex justify-content-between"
            style={VerusIdStyles.cardBody}>
            <div
              style={{ width: "100%" }}
            >
              <div
                className="d-flex"
                style={VerusIdStyles.cardCoinInfoContainer}>
                <img
                  src={`assets/images/cryptologo/btc/${coinObj.id.toLowerCase()}.png`}
                  width="25px"
                  height="25px"
                />
                <h4
                  style={VerusIdStyles.cardCoinName}>
                  <strong>{coinObj.name}</strong>
                </h4>
              </div>
              <select 
                defaultValue={ activeIdName } 
                name="selectedProfileId" 
                className="custom-select custom-select-lg" 
                //onChange={this.openId}
                >
                {Object.values(identities[coinObj.id] ? identities[coinObj.id] : []).map((identity, index) => {
                  return (
                    <option 
                      key={index} 
                      value={identity}>{ identity.name }</option>)
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export const IdTabsRender = function() {
  return [
    <li className="nav-item" role="presentation" key="wallet-dashboard">
      <a
        className={`nav-link ${this.props.mainPathArray.includes(DASHBOARD ? 'active' : '')}`}
        href="#"
        onClick={() => this.openDashboard()}
        style={VerusIdStyles.secondaryTabBarLink}>
        <i className="fas fa-home" style={VerusIdStyles.navigationTabIcon} />
        {"ID Dashboard"}
      </a>
    </li>
  ]
}