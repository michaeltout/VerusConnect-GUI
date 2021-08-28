import { getApiData } from '../../../../callCreator'
import { API_GET_RFOX_GET_ACCOUNT_BALANCES, ERC20 } from '../../../../../constants/componentConstants'

/**
 * Function to get account balances for rfox migration
 */
export const getRfoxMigrationAccountBalances = async () => {
  try {
    return await getApiData(ERC20, API_GET_RFOX_GET_ACCOUNT_BALANCES, {})
  } catch (e) {
    throw e
  }
}