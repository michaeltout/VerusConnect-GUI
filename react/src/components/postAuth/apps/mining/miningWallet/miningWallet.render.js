import React from "react";
import { secondsToTime } from "../../../../../util/displayUtil/timeUtils";
import { normalizeNum } from "../../../../../util/displayUtil/numberFormat";
import WalletPaper from "../../../../../containers/WalletPaper/WalletPaper";
import { SYNCING, PRE_DATA } from "../../../../../util/constants/componentConstants";
import WalletBooklet from "../../../../../containers/WalletBooklet/WalletBooklet";

export const MiningWalletRender = function() {
  return (
    <div
      className="col-md-8 col-lg-9"
      style={{ padding: 16, overflow: "scroll" }}
    >
      <WalletPaper
        style={{
          marginBottom: 16,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {MiningWalletRenderOverview.call(this)}
        </div>
      </WalletPaper>
      <WalletBooklet 
        pages={[{ title: "Staking Overview", content: <strong>{"LOREM IPSUM"}</strong>}]}
        containerStyle={{ marginBottom: 16 }}
        defaultPageIndex={0}
      />
      <WalletBooklet 
        pages={[{ title: "Mining Overview", content: "Lorem ipsum"}]}
        containerStyle={{ marginBottom: 16 }}
        defaultPageIndex={0}
      />
    </div>        
  );
};

export const MiningWalletRenderOverview = function() {
  const { miningInfo, activatedCoins, coin, info, currentSupply, currentSupplyError } = this.props
  const _info = info[coin]
  const _coinObj = activatedCoins[coin]
  const _miningInfo = miningInfo[coin]
  const _supply = currentSupply[coin]
  const _supplyError = currentSupplyError[coin]

  const currentTime = Math.round((new Date()).getTime() / 1000);
  const timeSinceLastBlock = _info && ((currentTime - _info.tiptime) > 0) ? currentTime - _info.tiptime : null

  const netHashrate = _miningInfo != null ? normalizeNum(_miningInfo.networkhashps) : null

  let displayedSystemData = {
    ["Network Hashrate"]: {
      text: `${netHashrate != null ? netHashrate[0] : "-"} ${
        netHashrate != null ? netHashrate[2] : ""
      }H/s`,
      error: false
    },
    ["Block Height"]: {
      text: `${_info ? _info.longestchain : "-"}`,
      error: false
    },
    ["Last Block"]: {
      text:
        _coinObj && _coinObj.status === SYNCING
          ? "Syncing..."
          : timeSinceLastBlock != null && _coinObj.status !== PRE_DATA
          ? `${secondsToTime(timeSinceLastBlock)} ago`
          : "-",
      error: false
    },
    ["Est. Total Supply"]: {
      text:
        _supplyError != null && _supplyError.error
          ? _supplyError.result === "Loading..." &&
            _coinObj &&
            _coinObj.status === SYNCING
            ? "Syncing..."
            : _supplyError.result
          : `${_supply ? _supply.total.toFixed(2) : "-"} ${coin}`,
      error: false
    }
  };

  return Object.keys(displayedSystemData).map((dataKey, index) => {
    return (
      <WalletPaper
        style={{
          flex: 1,
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          border: "none",
          padding: 0,
          minWidth: 'max-content',
          margin: 6,
          marginLeft: 0
        }}
        key={index}
      >
        <h6
          className="card-title"
          style={{
            fontSize: 14,
            margin: 0,
            width: "max-content"
          }}
        >
          {dataKey}
        </h6>
        <h5
          className="card-title"
          style={{
            margin: 0,
            marginTop: 5,
            width: "max-content",
            color: "rgb(0,0,0)"
          }}
        >
          {displayedSystemData[dataKey].error && (
            <i
              className="fas fa-exclamation-triangle"
              style={{ paddingRight: 6, color: "rgb(236,124,43)" }}
            />
          )}
          {displayedSystemData[dataKey].text}
        </h5>
      </WalletPaper>
    );
  });
}