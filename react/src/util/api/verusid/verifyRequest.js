import { getApiData } from '../callCreator'
import { API_VERIFY_LOGIN_CONSENT_REQUEST, NATIVE } from '../../constants/componentConstants'

export const verifyLoginConsentRequest = async (request, mode = NATIVE) => {
  try {
    const res = await getApiData(mode, API_VERIFY_LOGIN_CONSENT_REQUEST, { request })

    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    throw new Error(e.message)
  }
}