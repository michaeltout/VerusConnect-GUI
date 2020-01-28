import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import { renderAffectedBalance } from '../../util/txUtils/txRenderUtils';
import { setModalParams, setModalNavigationPath } from '../../actions/actionCreators';
import { TX_INFO, MINING_CARD, STAKING_CARD } from '../../util/constants/componentConstants';
import { GeneratorCardRender } from './GeneratorCard.render'
import { normalizeNum } from '../../util/displayUtil/numberFormat';

const MINUTES_PER_DAY = 1440
const DEFAULT_MAX_HASH = 5000000

function updateGeneratorStats(setEarningStats, setPercentBalanceStaking, setDisplayBalance, props, state) {
  const {
    miningInfo,
    cardType,
    stakeableBalance,
    currentReward,
    fiatPrice,
    totalBalance,
    currentSupply
  } = props;
  const earningStats = {
    data: {
      blocks: {day: null, month: null, year: null},
      crypto: {day: null, month: null, year: null},
      fiat: {day: null, month: null, year: null},
      percent: {day: null, month: null, year: null}
    },
    display: {
      blocks: {day: null, month: null, year: null},
      crypto: {day: null, month: null, year: null},
      fiat: {day: null, month: null, year: null},
      percent: {day: null, month: null, year: null}
    }
  }
  
  const { useHypothetical, displayBalance } = state
  const { blocks, crypto, fiat, percent } = earningStats.data
  let display = earningStats.display
  

  if (miningInfo != null) {
    if (
      cardType === STAKING_CARD && currentSupply != null
    ) {
      // If staking card, est. min blocks per day is (stakeableBalance / totalmaturesupply OR totalstakingsupply) * 1440
      // Total staking supply is more accurate
      const { supply, immature } = currentSupply;
      const { stakingsupply } = miningInfo;
      const supplyFraction = ((useHypothetical ? displayBalance : stakeableBalance) /
        (stakingsupply != null ? stakingsupply : supply - immature));

      if (!useHypothetical) setDisplayBalance(stakeableBalance)

      const stakingFraction =
        stakeableBalance / (totalBalance ? totalBalance : 1);

      setPercentBalanceStaking(stakingFraction * 100);
      blocks.day = miningInfo.staking ? (supplyFraction <= 1 ? (supplyFraction * MINUTES_PER_DAY)/2 : MINUTES_PER_DAY/2) : 0;
    } else if (cardType === MINING_CARD) {
      // If mining card, est. blocks per day is (localhp / totalhp) * 1440
      const { localhashps, networkhashps } = miningInfo;
      const hpFraction = localhashps / networkhashps;

      blocks.day = hpFraction * MINUTES_PER_DAY;
    }

    if (blocks.day != null) {
      blocks.year = blocks.day * 365
      blocks.month = blocks.year / 12

      if (currentReward != null) {
        crypto.day =
          blocks.day *
          (currentReward +
            (miningInfo.averageblockfees != null
              ? miningInfo.averageblockfees
              : 0));
        crypto.year = crypto.day * 365
        crypto.month = crypto.year / 12

        if (fiatPrice != null) {
          fiat.day = crypto.day * fiatPrice
          fiat.year = fiat.day * 365
          fiat.month = fiat.year / 12
        }

        if (cardType === STAKING_CARD && stakeableBalance) {
          percent.day = (crypto.day / stakeableBalance) * 100
          percent.year = (crypto.year / stakeableBalance) * 100
          percent.month = (crypto.month / stakeableBalance) * 100

          display.percent.day = (crypto.day / stakeableBalance) * 100
          display.percent.year = (crypto.year / stakeableBalance) * 100
          display.percent.month = (crypto.month / stakeableBalance) * 100
        }
      }
    }

    // Set up display numbers, shortened to use letters for size
    Object.keys(earningStats.data).map(earningType => {
      Object.keys(earningStats.data[earningType]).map(timeFrame => {
        if (earningStats.data[earningType][timeFrame] != null) {
          const normalizedNum = normalizeNum(earningStats.data[earningType][timeFrame])
          display[earningType][timeFrame] =
            earningStats.data[earningType][timeFrame] < 0.01 &&
            earningStats.data[earningType][timeFrame] != 0
              ? "<0.01"
              : `${normalizedNum[0]}${normalizedNum[2]}`;
        }
      })
    })

    setEarningStats({data: { blocks, crypto, fiat, percent }, display})
  }
}

function GeneratorCard(props) {
  const {
    cardType,
    miningInfo,
    currentSupply,
    handleMiningThreadChange,
    currentReward,
    fiatPrice,
    stakeableBalance,
    stakingFunction,
    totalBalance
  } = props;
  const [earningStats, setEarningStats] = useState({
    data: {
      blocks: {day: null, month: null, year: null},
      crypto: {day: null, month: null, year: null},
      fiat: {day: null, month: null, year: null},
      percent: {day: null, month: null, year: null}
    },
    display: {
      blocks: {day: null, month: null, year: null},
      crypto: {day: null, month: null, year: null},
      fiat: {day: null, month: null, year: null},
      percent: {day: null, month: null, year: null}
    }
  })
  const [percentBalanceStaking, setPercentBalanceStaking] = useState(0)
  const [visualSliderVal, setVisualSliderVal] = useState(0)
  const [maxDisplayHash, setMaxDisplayHash] = useState(DEFAULT_MAX_HASH)
  const [sliderDragging, setSliderDragging] = useState(false)
  const [useHypothetical, setUseHypothetical] = useState(false)
  const [displayBalance, setDisplayBalance] = useState(0)

  const updateGeneratorStatsHook =
    cardType === STAKING_CARD
      ? [
          stakeableBalance,
          totalBalance,
          miningInfo,
          currentReward,
          fiatPrice,
          useHypothetical,
          currentSupply,
          displayBalance
        ]
      : [miningInfo, currentReward, fiatPrice];
  
  useEffect(
    () =>
      updateGeneratorStats(
        setEarningStats,
        setPercentBalanceStaking,
        setDisplayBalance,
        props,
        { earningStats, useHypothetical, displayBalance }
      ),
    updateGeneratorStatsHook
  );
  useEffect(() => {
    if (miningInfo && miningInfo.maxrecordedhps > DEFAULT_MAX_HASH) setMaxDisplayHash(miningInfo.maxrecordedhps)
    if (!sliderDragging) setVisualSliderVal(miningInfo != null && miningInfo.generate ? miningInfo.numthreads : 0)
  }, [miningInfo])

  return GeneratorCardRender(
    props,
    {
      earningStats,
      percentBalanceStaking,
      maxDisplayHash,
      visualSliderVal,
      displayBalance,
      useHypothetical
    },
    stakingFunction,
    handleMiningThreadChange,
    setVisualSliderVal,
    setSliderDragging,
    setDisplayBalance,
    setUseHypothetical
  );
}

GeneratorCard.propTypes = {
  coin: PropTypes.string.isRequired,
  miningStatus: PropTypes.string.isRequired,
  cardType: PropTypes.oneOf([MINING_CARD, STAKING_CARD]).isRequired,
  miningInfo: PropTypes.any,
  currentSupply: PropTypes.any,
  handleMiningThreadChange: PropTypes.func,
  stakingFunction: PropTypes.func, // Takes in isStaking as parameter
  stakeableBalance: PropTypes.number,
  totalBalance: PropTypes.number,
  maxCores: PropTypes.number,
  currentReward: PropTypes.number,
  fiatPrice: PropTypes.number,
  fiatCurr: PropTypes.string,
  loading: PropTypes.bool
};

export default GeneratorCard
