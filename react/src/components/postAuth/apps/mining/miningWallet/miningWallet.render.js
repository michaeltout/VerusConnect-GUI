import React from "react";
import { secondsToTime } from "../../../../../util/displayUtil/timeUtils";
import { normalizeNum } from "../../../../../util/displayUtil/numberFormat";
import WalletPaper from "../../../../../containers/WalletPaper/WalletPaper";
import { SYNCING, PRE_DATA, MINED_TX, MINTED_TX, IMMATURE_TX, STAKE_TX, MS_IDLE, MS_STAKING, MS_MINING, STAKING_CARD, MINING_CARD } from "../../../../../util/constants/componentConstants";
import WalletBooklet from "../../../../../containers/WalletBooklet/WalletBooklet";
import TransactionCard from "../../../../../containers/TransactionCard/TransactionCard";
import GeneratorCard from "../../../../../containers/GeneratorCard/GeneratorCard";

export const MiningWalletRender = function() {
  const { miningState, coin, miningInfo, currentSupply, balances } = this.props

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
        pages={[
          {
            title: `Staking Overview - (Staking: ${
              miningState === MS_IDLE
                ? "-"
                : miningState.includes(MS_STAKING)
                ? "On"
                : "Off"
            })`,
            content: (<GeneratorCard 
              miningStatus={miningState}
              cardType={STAKING_CARD}
              miningInfo={miningInfo[coin]}
              currentSupply={currentSupply[coin]}
              miningFunction={() => {return 0}}
              stakingFunction={() => {return 0}}
              updateFunction={() => {return 0}}
              stakeableBalance={ balances[coin] != null ? balances[coin].native.public.confirmed : 0 }
            />)
            /*miningStatus: PropTypes.string.isRequired,
              cardType: PropTypes.oneOf([MINING_CARD, STAKING_CARD]).isRequired,
              miningInfo: PropTypes.any.isRequired,
              currentSupply: PropTypes.any.isRequired,
              miningFunction: PropTypes.func, // Takes in isMining and numThreads as parameters
              stakingFunction: PropTypes.func, // Takes in isStaking as parameter
              updateFunction: PropTypes.func.isRequired, // Function that updates mining and staking status in store
              stakeableBalance: PropTypes.number*/
          }
        ]}
        containerStyle={{ marginBottom: 16 }}
        defaultPageIndex={0}
      />
      <WalletBooklet
         pages={[
          {
            title: `Mining Overview - (Mining: ${
              miningState === MS_IDLE
                ? "-"
                : miningState.includes(MS_MINING)
                ? "On"
                : "Off"
            })`,
            content: (<GeneratorCard 
              miningStatus={miningState}
              cardType={MINING_CARD}
              miningInfo={miningInfo[coin]}
              currentSupply={currentSupply[coin]}
              miningFunction={() => {return 0}}
              stakingFunction={() => {return 0}}
              updateFunction={() => {return 0}}
              stakeableBalance={ balances[coin] != null ? balances[coin].native.public.confirmed : 0 }
            />)
          }
        ]}
        containerStyle={{ marginBottom: 16 }}
        defaultPageIndex={0}
      />
      <TransactionCard
        transactions={
          this.props.transactions[this.props.coin] != null
            ? this.props.transactions[this.props.coin].filter(tx => {
                return (
                  tx.category === MINED_TX ||
                  tx.category === MINTED_TX ||
                  tx.category === IMMATURE_TX ||
                  tx.category === STAKE_TX
                );
              })
            : []
        }
        coin={this.props.coin}
      />
    </div>
  );
};

export const MiningWalletRenderOverview = function() {
  const { miningInfo, activatedCoins, coin, info, currentSupply, currentSupplyError, blockReward } = this.props
  const _info = info[coin]
  const _coinObj = activatedCoins[coin]
  const _miningInfo = miningInfo[coin]
  const _supply = currentSupply[coin] != null ? normalizeNum(currentSupply[coin].total) : null
  const _supplyError = currentSupplyError[coin]
  const _reward = blockReward[coin] != null ? normalizeNum(blockReward[coin].miner) : null

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
            : _supplyError.result.includes("ENOTFOUND")
            ? "Loading..."
            : _supplyError.result
          : `${_supply ? `${_supply[0]}${_supply[2]}` : "-"} ${coin}`,
      error: false
    },
    ["Block Reward"]: {
      text: `${_reward ? `${_reward[0]}${_reward[2]}` : "-"} ${coin}`,
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