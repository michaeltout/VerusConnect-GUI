import { fromSats } from 'agama-wallet-lib/src/utils';
import { LINEAR_DECAY } from '../constants'

export const estimateReward = (chainDefinition, lastconfirmedheight) => {
  const eras = chainDefinition.eras
  const lastHeight = Number(lastconfirmedheight);
  let eraIndex = 0;
  let reward = 0;

  while (
    eraIndex < eras.length && 
    Number(eras[eraIndex].eraend) != 0 && 
    lastHeight > Number(eras[eraIndex].eraend)) { 
    eraIndex++;
  }

  let currentEra = eras[eraIndex]

  if ((eras.length === 1 && 
      currentEra.eraend === 0 && 
      currentEra.decay === 0) || 
      (currentEra.decay === LINEAR_DECAY && 
      Number(currentEra.eraend) === 0) || 
      currentEra.halving === 0) {
    //If there is no decay or halving, or linear decay without end, 
    //always return current reward, as it doesn't change
    reward = fromSats(currentEra.reward)
  } else if (Number(currentEra.decay) === LINEAR_DECAY) {
    //If decay is linear, create y=mx+b line function to estimate reward
    let yChange = ((eraIndex < eras.length - 1) ? Number(eras[eraIndex + 1].reward) : 0) - Number(currentEra.reward)
    let xChange = Number(currentEra.eraend) - (eraIndex === 0 ? 0 : Number(eras[eraIndex - 1].eraend))
    reward = fromSats((yChange/xChange)*(lastHeight) + Number(currentEra.reward))
  } else {
    //If decay is halving, calculate how many halvings there have been
    let xChange = lastHeight - (eraIndex === 0 ? 0 : Number(eras[eraIndex - 1].eraend))

    let decay = Number(currentEra.decay) === 0 ? 
      (LINEAR_DECAY/2) 
    : 
      Number(currentEra.decay)
    
    reward = fromSats((Number(currentEra.reward))/
            (Math.pow(LINEAR_DECAY/(decay), Math.floor(xChange/Number(currentEra.halving)))))
  }

  return reward
}