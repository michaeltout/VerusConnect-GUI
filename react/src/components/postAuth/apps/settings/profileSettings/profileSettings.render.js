import React from 'react';
import {
  UX_SELECTOR,
  PBAAS,
  WALLET,
  IDENTITIES,
  MINING,
  PLACEHOLDER,
  NATIVE,
  ETH,
  ELECTRUM,
  LITE
} from "../../../../../util/constants/componentConstants";
import CustomCheckbox from '../../../../../containers/CustomCheckbox/CustomCheckbox';
import CustomChip from '../../../../../containers/CustomChip/CustomChip';
import Divider from '@material-ui/core/Divider';

export const ProfileSettingsRender = function() {
  return (
    <div className="d-flex flex-fill flex-wrap" style={{ marginBottom: 16 }}>
      <div className="flex-grow-1">
        <div className="col-lg-12" style={{ padding: 0 }}>
          <div className="card border rounded-0">
            <div className="card-body">
              { ProfileSettingsStartScreenRender.call(this) }
              <div style={{ paddingTop: 16, paddingBottom: 16 }}>
                <Divider variant="middle" />
              </div>
              { ProfileSettingsStartCoinsRender.call(this) }
              <div style={{ paddingTop: 16, paddingBottom: 16 }}>
                <Divider variant="middle" />
              </div>
              { ProfileSettingsStartupOptionsRender.call(this) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProfileSettingsStartScreenRender = function() {
  const { displayUser } = this.props
  const LOCATION_PRESET_NAMES = {
    [UX_SELECTOR]: "Path Selector",
    //[PBAAS]: "Verus Multiverse",
    [WALLET]: "Wallet Dashboard",
    [IDENTITIES]: "ID Dashboard",
    [MINING]: "Mining Dashboard"
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 16, paddingRight: 16 }}>
      <h6
        className="card-title"
        style={{ fontSize: 14, margin: 0, width: "max-content" }}>
        Landing screen
      </h6>
      <div
        className="d-flex d-sm-flex d-md-flex d-lg-flex flex-column align-items-center align-items-sm-center align-items-md-center justify-content-lg-center align-items-lg-center"
      >
        <div>
          <div>
            <div
              className="form-check d-flex align-items-center"
              style={{ padding: 0 }}
            >
              <CustomCheckbox
                checkboxProps={{
                  checked: displayUser.startAtLastLocation,
                  onChange: () => this.setStartScreen(true),
                }}
                colorChecked="rgb(49, 101, 212)"
                colorUnchecked="rgb(49, 101, 212)"
              />
              <label
                className="form-check-label"
                htmlFor="formCheck-1"
                style={{ color: "rgb(0,0,0)", fontSize: 14 }}
              >
                Start at last location
              </label>
            </div>
          </div>
          <div className="d-flex d-sm-flex d-md-flex d-lg-flex align-items-center align-items-sm-center align-items-md-center align-items-lg-center">
            <div
              className="form-check d-flex align-items-center"
              style={{ padding: 0 }}
            >
              <CustomCheckbox
                checkboxProps={{
                  checked: !displayUser.startAtLastLocation,
                  onChange: () => this.setStartScreen(false),
                }}
                colorChecked="rgb(49, 101, 212)"
                colorUnchecked="rgb(49, 101, 212)"
              />
              <select 
                value={ this.state.selectedStartLocation }
                className="custom-select custom-select-lg" 
                style={{
                  fontSize: 14
                }}
                onChange={ this.updateLocationSelection }>
                  <option 
                    key={PLACEHOLDER}
                    value={PLACEHOLDER}
                    disabled>{"Choose screen"}</option>
                  {this.locationPresets.map((app) => {
                    return (
                      <option 
                        key={app} 
                        value={app}>{LOCATION_PRESET_NAMES[app]}</option>)
                  })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ProfileSettingsStartCoinsRender = function() {
  const { displayUser } = this.props
  const { selectedCoinObj, selectedStartCoins } = this.state
  const coinIsSelected = Object.keys(selectedStartCoins).includes(selectedCoinObj.id)

  return (
    <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 16, paddingRight: 16 }}>
      <div style={{ flex: 1 }}>
        <h6
          className="card-title"
          style={{ fontSize: 14, margin: 0, width: "max-content" }}>
          Coins started on launch
        </h6>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          { !displayUser.startWithLastCoins &&
            Object.keys(displayUser.startCoins).map((chainTicker, index) => {
              const coinObj = displayUser.startCoins[chainTicker]

              return (
                <div style={{ padding: 5, paddingLeft: 0 }} key={index}>
                  <CustomChip
                    chipProps={{
                      label: `${coinObj.id} (${coinObj.mode === NATIVE ? NATIVE : LITE})`,
                      icon: <i className="fas fa-circle" style={{ color: coinObj.themeColor }} />
                    }}
                    handleDelete={() => this.removeStartCoin(coinObj.id)}
                    rootProps={{
                      height: 32
                    }}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
      <div
        className="d-flex d-sm-flex d-md-flex d-lg-flex flex-column align-items-center align-items-sm-center align-items-md-center justify-content-lg-center align-items-lg-center"
        style={{ maxWidth: "min-content"}}
      >
        <div style={{ maxWidth: 250 }}>
          <div>
            <div
              className="form-check d-flex align-items-center"
              style={{ padding: 0 }}
            >
              <CustomCheckbox
                checkboxProps={{
                  checked: displayUser.startWithLastCoins,
                  onChange: () => this.setStartCoins(true),
                }}
                colorChecked="rgb(49, 101, 212)"
                colorUnchecked="rgb(49, 101, 212)"
              />
              <label
                className="form-check-label"
                htmlFor="formCheck-1"
                style={{ color: "rgb(0,0,0)", fontSize: 14 }}
              >
                Launch with last opened
              </label>
            </div>
          </div>
          <div className="d-flex d-sm-flex d-md-flex d-lg-flex align-items-center align-items-sm-center align-items-md-center align-items-lg-center">
            <div
              className="form-check d-flex align-items-center"
              style={{ padding: 0 }}
            >
              <CustomCheckbox
                checkboxProps={{
                  checked: !displayUser.startWithLastCoins,
                  onChange: () => this.setStartCoins(false),
                }}
                colorChecked="rgb(49, 101, 212)"
                colorUnchecked="rgb(49, 101, 212)"
              />
              <select
                value={ this.state.selectedCoin }
                className="custom-select custom-select-lg" 
                style={{
                  fontSize: 14
                }}
                onChange={ this.updateCoinSelection }>
                  <option 
                    key={PLACEHOLDER}
                    value={PLACEHOLDER}
                    selected
                    disabled>{"Select Coin"}</option>
                  {this.startCoinOptions.map((coin, index) => {
                    return (
                      <option 
                        key={index} 
                        value={coin.id}>{`${coin.name} (${coin.id})`}</option>)
                  })}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 10 }}>
            <button
              className="btn btn-primary"
              type="button"
              onClick = { () => this.addStartCoin(NATIVE) }
              disabled = { !selectedCoinObj.available_modes[NATIVE] || coinIsSelected }
              style={{
                fontSize: 14,
                backgroundColor: "rgb(49, 101, 212)",
                borderWidth: 1,
                borderColor: "rgb(49, 101, 212)",
                minWidth: 103,
                marginRight: 10,
              }}>
              {"Add Native"}
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick = { () => this.addStartCoin(selectedCoinObj.available_modes[ETH] ? ETH : ELECTRUM) }
              disabled = { (!selectedCoinObj.available_modes[ETH] && !selectedCoinObj.available_modes[ELECTRUM]) || coinIsSelected }
              style={{
                fontSize: 14,
                backgroundColor: "rgb(49, 101, 212)",
                borderWidth: 1,
                borderColor: "rgb(49, 101, 212)",
                minWidth: 103
              }}>
              {"Add Lite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ProfileSettingsStartupOptionsRender = function() {
  const { displayUser } = this.props
  const {
    selectedStartupOptionCoin,
    startupOptionText,
  } = this.state;
  const startupOptionsList =
    selectedStartupOptionCoin != null
      ? displayUser.startupOptions[NATIVE][selectedStartupOptionCoin]
      : null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <div style={{ flex: 1 }}>
        <h6
          className="card-title"
          style={{ fontSize: 14, margin: 0, width: "max-content" }}
        >
          Custom native mode launch options
        </h6>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {startupOptionsList &&
            startupOptionsList.map((option, index) => {
              return (
                <div style={{ padding: 5, paddingLeft: 0 }} key={index}>
                  <CustomChip
                    chipProps={{
                      label: (
                        <div
                          style={{
                            whiteSpace: "normal",
                            overflow: "auto",
                            display: "inline-block",
                            maxWidth: 200,
                          }}
                        >
                          {option.substring(1)}
                        </div>
                      ),
                    }}
                    rootProps={{
                      minHeight: 32,
                      height: "min-content",
                    }}
                    handleDelete={() => this.removeStartupOption(option)}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="d-flex d-sm-flex d-md-flex d-lg-flex flex-column align-items-center align-items-sm-center align-items-md-center justify-content-lg-center align-items-lg-center">
        <div style={{ maxWidth: 250 }}>
          <div className="d-flex d-sm-flex d-md-flex d-lg-flex align-items-center align-items-sm-center align-items-md-center align-items-lg-center">
            <div
              className="form-check d-flex align-items-center"
              style={{ padding: 0 }}
            >
              <select
                value={this.state.selectedStartupOptionCoin}
                className="custom-select custom-select-lg"
                style={{
                  fontSize: 14,
                }}
                onChange={this.updateStartupOptionCoinSelection}
              >
                <option key={PLACEHOLDER} value={PLACEHOLDER} selected disabled>
                  {"Select Coin"}
                </option>
                {this.props.nativeCoins.map((coinObj, index) => {
                  return (
                    <option
                      key={index}
                      value={coinObj.id}
                    >{`${coinObj.name} (${coinObj.id})`}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: 10,
              flex: 1,
            }}
          >
            <input
              type="text"
              style={{ fontSize: 14, flex: 1, height: 36, padding: 10 }}
              value={startupOptionText}
              onChange={(e) => this.updateStartupOptionText(e.target.value)}
              placeholder={'e.g. "mint" or "genproclimit=1'}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: 10,
            }}
          >
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => this.addStartupOption()}
              disabled={
                selectedStartupOptionCoin == null ||
                selectedStartupOptionCoin == PLACEHOLDER ||
                startupOptionText == null ||
                startupOptionText.length == 0 ||
                (startupOptionsList != null &&
                  startupOptionsList.some(
                    (x) =>
                      x.split("=")[0] === startupOptionText ||
                      x.split("=")[0] === "-" + startupOptionText
                  ))
              }
              style={{
                fontSize: 14,
                backgroundColor: "rgb(49, 101, 212)",
                borderWidth: 1,
                borderColor: "rgb(49, 101, 212)",
                minWidth: 103,
              }}
            >
              {"Add Launch Option"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

