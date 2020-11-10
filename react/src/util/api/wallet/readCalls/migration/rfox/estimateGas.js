import { getApiData } from '../../../../callCreator'
import { API_GET_RFOX_ESTIMATE_GAS_CLAIM_ACCOUNT_BALANCES, ETH } from '../../../../../constants/componentConstants'

/**
 * Function to estimate gas required to claim rfox
 */
export const estimateGasRfoxMigration = async () => {
  try {
    return await getApiData(ETH, API_GET_RFOX_ESTIMATE_GAS_CLAIM_ACCOUNT_BALANCES, {})
  } catch (e) {
    throw e
  }
}