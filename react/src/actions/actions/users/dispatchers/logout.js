import { newSnackbar, logout } from '../../../actionCreators'
import { deactivateCoin } from '../../../actionDispatchers'
import { logoutUser } from '../../../../util/api/users/userData'
import { SUCCESS_SNACK, MID_LENGTH_ALERT } from '../../../../util/constants/componentConstants'

/**
 * Logs out an active user and deactivates/de-authenticates all coins
 * that they had activated
 * @param {Object} activatedCoins 
 */
export const logoutActiveUser = async (activatedCoins, dispatch) => {
  try {
    await Promise.all(Object.keys(activatedCoins).map(async (chainTicker) => {
      return deactivateCoin(chainTicker, activatedCoins[chainTicker].mode, dispatch, false)
    }))

    dispatch(newSnackbar(SUCCESS_SNACK, `Logged out successfully!`, MID_LENGTH_ALERT))
    await logoutUser()

    dispatch(logout())
  } catch (e) {
    throw e
  }
}