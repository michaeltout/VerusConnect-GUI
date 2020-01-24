import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import { renderAffectedBalance } from '../../util/txUtils/txRenderUtils';
import { setModalParams, setModalNavigationPath } from '../../actions/actionCreators';
import { TX_INFO, MINING_CARD, STAKING_CARD } from '../../util/constants/componentConstants';
import { GeneratorCardRender } from './GeneratorCard.render'

const MINUTES_PER_DAY = 1440

function updateGeneratorStats(setBlocksPerDay, setPercentOfTotal, props) {
  const { miningInfo, currentSupply, cardType, stakeableBalance } = props

  if (miningInfo != null) {
    if (cardType === STAKING_CARD && currentSupply != null) {
      // If staking card, est. min blocks per day is (stakeableBalance / totalmaturesupply) * 1440
      const { supply, immature } = currentSupply
      const supplyFraction = stakeableBalance / (supply - immature)

      setPercentOfTotal(supplyFraction * 100)
      setBlocksPerDay((supplyFraction * MINUTES_PER_DAY) / 2)
    } else if (cardType === MINING_CARD) {
      // If mining card, est. blocks per day is (localhp / totalhp) * 1440
      const { localhashps, networkhashps } = miningInfo
      const hpFraction = localhashps / networkhashps

      setPercentOfTotal(hpFraction * 100)
      setBlocksPerDay(hpFraction * MINUTES_PER_DAY)
    }
  }
}

function GeneratorCard(props) {
  const { cardType, miningInfo, currentSupply, miningFunction, stakingFunction, updateFunction, stakeableBalance } = props
  const [blocksPerDay, setBlocksPerDay] = useState(0)
  const [percentOfToal, setPercentOfTotal] = useState(0)
  const [isDaysPerBlock, setIsDaysPerBlock] = useState(false)

  const updateGeneratorStatsHook =
    cardType === STAKING_CARD
      ? [stakeableBalance, currentSupply, miningInfo]
      : [miningInfo];
  
  useEffect(() => updateGeneratorStats(setBlocksPerDay, setPercentOfTotal, props), updateGeneratorStatsHook)

  return GeneratorCardRender(
    props,
    { blocksPerDay, percentOfToal },
    setIsDaysPerBlock
  );
}

GeneratorCard.propTypes = {
  miningStatus: PropTypes.string.isRequired,
  cardType: PropTypes.oneOf([MINING_CARD, STAKING_CARD]).isRequired,
  miningInfo: PropTypes.any,
  currentSupply: PropTypes.any,
  miningFunction: PropTypes.func, // Takes in isMining and numThreads as parameters
  stakingFunction: PropTypes.func, // Takes in isStaking as parameter
  updateFunction: PropTypes.func.isRequired, // Function that updates mining and staking status in store
  stakeableBalance: PropTypes.number
};

export default GeneratorCard
