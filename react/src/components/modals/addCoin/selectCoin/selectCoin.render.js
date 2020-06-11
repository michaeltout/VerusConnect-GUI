import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getSimpleCoinArray } from "../../../../util/coinData";
import CustomCheckbox from '../../../../containers/CustomCheckbox/CustomCheckbox'
import {
  LITE,
  NATIVE,
  ELECTRUM,
  ETH,
  NATIVE_MINE,
  NATIVE_RESCAN,
  NATIVE_STAKE,
  NATIVE_MINE_THREADS,
  NATIVE_REINDEX,
  IS_VERUS
} from "../../../../util/constants/componentConstants";

export const SelectCoinRender = function() {  
  return (
    <div
      style={{
        paddingBottom: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
      {this.state.chosenCoin ? SelectModeForm.call(this) : SelectCoinForm.call(this)}
    </div>
  );
};

export const SelectCoinForm = function() {
  return (
    <React.Fragment>
      <h1
        style={{
          margin: 0,
          paddingBottom: 40,
          fontSize: 20,
          color: "rgb(0,0,0)",
        }}
      >
        {this.state.addFromFile
          ? "Enter a coin file to add (this should be provided to you)"
          : "Choose coin to add"}
      </h1>
      {this.state.addFromFile ? (
        <input type="file" id="coin_upload" style={{paddingLeft: '15%'}} onChange={this.setFiles} />
      ) : (
        RenderCoinDropdown.call(this)
      )}
      <button
        className="btn btn-primary"
        type="button"
        onClick={this.chooseCoin}
        style={{
          fontSize: 14,
          backgroundColor: "rgb(78,115,223)",
          borderWidth: 1,
          borderColor: "rgb(78,115,223)",
          paddingRight: 20,
          paddingLeft: 20,
          marginTop: 40,
          visibility: this.state.selectedCoin ? "unset" : "hidden",
          fontWeight: "bold",
        }}
      >
        {"Continue"}
      </button>
      {this.state.addFromFile && <button
        className="btn btn-primary"
        type="button"
        onClick={this.toggleAddFromFile}
        style={{
          fontSize: 14,
          backgroundColor: "rgb(78,115,223)",
          borderWidth: 1,
          borderColor: "rgb(78,115,223)",
          paddingRight: 20,
          paddingLeft: 20,
          marginTop: 40,
          fontWeight: "bold",
        }}
      >
        {"Cancel"}
      </button>}
    </React.Fragment>
  );
}

export const SelectModeForm = function() {
  const availableModes = this.state.chosenCoin.available_modes
  const isNative = availableModes[NATIVE]
  const isLite = availableModes[ETH] || availableModes[ELECTRUM]
  const { selectedMode } = this.state

  return (
    <div className="d-sm-flex flex-column justify-content-sm-center">
      <div className="d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center">
        <h1 style={{ fontSize: 16, marginBottom: 0, color: "rgb(0,0,0)" }}>
          Choose preferred mode for&nbsp;
        </h1>
        <button
          className="btn btn-primary d-md-flex d-lg-flex justify-content-md-center align-items-md-center justify-content-lg-center"
          type="button"
          style={{
            backgroundColor: "rgba(78,115,223,0)",
            borderColor: "rgb(133, 135, 150)",
            borderWidth: 1,
            borderRadius: 0,
            paddingTop: 4,
            paddingBottom: 4,
            paddingRight: 14,
            paddingLeft: 15,
            marginBottom: 2,
            color: "rgb(0,0,0)"
          }}
          onClick={this.clearCoin}
        >
          <strong>{this.state.chosenCoin.name}</strong>
          <i
            className="fas fa-pencil-alt"
            style={{ paddingLeft: 6, color: "rgb(133, 135, 150)" }}
          />
        </button>
      </div>
      <div
        className="d-sm-flex justify-content-sm-center align-items-sm-center"
        style={{ paddingTop: 9 }}
      >
        <h1
          className="text-center"
          style={{ fontSize: 16, marginBottom: 0, color: "rgb(0,0,0)" }}
        >
          Use a seed (<strong>lite mode</strong>) or download the full
          blockchain (<strong>native mode</strong>)
        </h1>
      </div>
      <div />
      <div
        className="d-flex d-sm-flex justify-content-center justify-content-sm-center"
        style={{ paddingTop: 27, height: 75 }}
      >
        <button
          className={`btn d-lg-flex justify-content-lg-center coin-mode-border-on-hover ${
            selectedMode === LITE ? "active-coin-mode" : ""
          } ${isLite ? "abled" : ""}`}
          type="button"
          disabled={!isLite}
          onClick={() => this.selectMode(LITE)}
          style={{
            color: "rgb(0,0,0)",
            backgroundColor: "rgba(78,115,223,0)",
            borderRadius: 0,
            width: 120,
            marginRight: 30
          }}
        >
          <strong>Lite</strong>
        </button>
        <button
          className={`btn d-lg-flex justify-content-lg-center coin-mode-border-on-hover ${
            selectedMode === NATIVE ? "active-coin-mode" : ""
          } ${isNative ? "abled" : ""}`}
          type="button"
          onClick={() => this.selectMode(NATIVE)}
          disabled={!isNative}
          style={{
            color: "rgb(0,0,0)",
            backgroundColor: "rgba(78,115,223,0)",
            borderRadius: 0,
            width: 120,
            marginLeft: 30
          }}
        >
          <strong>Native</strong>
        </button>
      </div>
      {this.state.selectedMode === NATIVE && (
        <div
          className="d-flex d-sm-flex d-md-flex d-lg-flex flex-column align-items-center align-items-sm-center align-items-md-center justify-content-lg-center align-items-lg-center"
          style={{ paddingTop: 28 }}
        >
          <div>
            {this.state.chosenCoin.options.tags.includes(IS_VERUS) && (
              <div>
                <div
                  className="form-check d-flex align-items-center"
                  style={{ padding: 0 }}
                >
                  <CustomCheckbox
                    checkboxProps={{
                      checked: this.state.nativeOptions[NATIVE_STAKE],
                      onChange: this.checkBox,
                      name: NATIVE_STAKE
                    }}
                    colorChecked="rgb(78,115,223)"
                    colorUnchecked="rgb(78,115,223)"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="formCheck-1"
                    style={{ color: "rgb(0,0,0)" }}
                  >
                    {"Start staking"}
                  </label>
                </div>
              </div>
            )}
            <div className="d-flex d-sm-flex d-md-flex d-lg-flex align-items-center align-items-sm-center align-items-md-center align-items-lg-center">
              <div
                className="form-check d-flex align-items-center"
                style={{ padding: 0 }}
              >
                <CustomCheckbox
                  checkboxProps={{
                    checked: this.state.nativeOptions[NATIVE_MINE],
                    onChange: this.checkBox,
                    name: NATIVE_MINE
                  }}
                  colorChecked="rgb(78,115,223)"
                  colorUnchecked="rgb(78,115,223)"
                />
                <label
                  className="form-check-label"
                  htmlFor="formCheck-1"
                  style={{ color: "rgb(0,0,0)" }}
                >
                  {"Start mining"}
                </label>
              </div>
              <input
                type="number"
                style={{ marginRight: 10, marginLeft: 80, width: 104 }}
                value={this.state.nativeOptions[NATIVE_MINE_THREADS]}
                min={0}
                step={1}
                onChange={this.updateThreads}
                placeholder="# threads"
              />
            </div>
            <div>
              <div
                className="form-check d-flex align-items-center"
                style={{ padding: 0 }}
              >
                <CustomCheckbox
                  checkboxProps={{
                    checked: this.state.nativeOptions[NATIVE_REINDEX],
                    onChange: this.checkBox,
                    name: NATIVE_REINDEX
                  }}
                  colorChecked="rgb(78,115,223)"
                  colorUnchecked="rgb(78,115,223)"
                />
                <label
                  className="form-check-label"
                  htmlFor="formCheck-1"
                  style={{ color: "rgb(0,0,0)" }}
                >
                  {"Reindex blockchain"}
                </label>
              </div>
            </div>
            <div>
              <div
                className="form-check d-flex align-items-center"
                style={{ padding: 0 }}
              >
                <CustomCheckbox
                  checkboxProps={{
                    checked: this.state.nativeOptions[NATIVE_RESCAN],
                    onChange: this.checkBox,
                    name: NATIVE_RESCAN
                  }}
                  colorChecked="rgb(78,115,223)"
                  colorUnchecked="rgb(78,115,223)"
                />
                <label
                  className="form-check-label"
                  htmlFor="formCheck-1"
                  style={{ color: "rgb(0,0,0)" }}
                >
                  {"Rescan wallet"}
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex d-sm-flex justify-content-center justify-content-sm-center">
        <button
          className="btn btn-primary"
          type="button"
          onClick={this.chooseMode}
          style={{
            fontSize: 14,
            backgroundColor: "rgb(78,115,223)",
            borderWidth: 1,
            borderColor: "rgb(78,115,223)",
            paddingRight: 20,
            paddingLeft: 20,
            marginTop: 30,
            visibility: this.state.selectedCoin ? "unset" : "hidden"
          }}
        >
          <strong>{"Add Coin"}</strong>
        </button>
      </div>
    </div>
  );
}

export const RenderCoinDropdown = function() {
  return (
    <Autocomplete
      options={getSimpleCoinArray()}
      getOptionLabel={option => option.name}
      style={{ width: 300 }}
      value={this.state.selectedCoin}
      onChange={(e, value) => { this.setState({selectedCoin: value}) }}
      renderInput={params => (
        <TextField
          {...params}
          label="Add Coin"
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={option => {
        return (
          <h1
            className="d-lg-flex align-items-lg-center"
            style={{ marginBottom: 0, fontSize: 16 }}>
            <img
              src={`assets/images/cryptologo/${option.protocol.toLowerCase()}/${option.id.toLowerCase()}.png`}
              width="20px"
              height="20px"
              style={{ marginRight: 5, marginBottom: 2 }}
              onError={this.switchToDefaultSrc}
            />
            {option.name}
          </h1>
        );
      }}
    />
  )
}
