import { getApiData } from '../../../../callCreator'
import { API_RFOX_CLAIM_BALANCES, ETH, POST } from '../../../../../constants/componentConstants'

/**
 * Function to claim account balances for rfox migration
 */
export const claimRfoxMigration = async () => {
  try {
    return await getApiData(ETH, API_RFOX_CLAIM_BALANCES, {}, POST)
  } catch (e) {
    throw e
  }
}