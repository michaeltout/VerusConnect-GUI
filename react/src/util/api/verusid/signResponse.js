import { getApiData } from '../callCreator'
import { API_SIGN_LOGIN_CONSENT_RESPONSE, NATIVE } from '../../constants/componentConstants'

export const signLoginConsentResponse = async (response, mode = NATIVE) => {
  try {
    const res = await getApiData(mode, API_SIGN_LOGIN_CONSENT_RESPONSE, { response })
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    throw new Error(e.message)
  }
}