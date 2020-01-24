import React from 'react';
import WalletPaper from '../WalletPaper/WalletPaper';

export const GeneratorCardRender = (props, state, setIsDaysPerBlock) => {
  const {
    miningStatus,
    cardType,
    miningInfo,
    currentSupply,
    miningFunction,
    stakingFunction,
    updateFunction,
    stakeableBalance
  } = props;
  const { blocksPerDay, percentOfToal } = state

  return (
    <WalletPaper style={{ marginBottom: 16 }}>
      <div>{miningStatus}</div>
      <div>{blocksPerDay}</div>
      <div>{blocksPerDay == 0 ? '-' : 1/blocksPerDay}</div>
      <div>{percentOfToal}</div>
      <div>{stakeableBalance}</div>
      <div>{cardType}</div>
      <div>{miningInfo != null ? miningInfo.localhashps : "no data"}</div>
      <div>{miningInfo != null ? miningInfo.networkhashps : "no data"}</div>
      <div>{miningInfo != null ? miningInfo.numthreads : "no data"}</div>
    </WalletPaper>
  );
}
