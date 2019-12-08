import { apiGet, apiPost } from '../callCreator'
import { ENCRYPT_KEY, DECRYPT_KEY, GET_PIN_LIST } from '../../constants/componentConstants'


export const encryptKey = async (pin, seed) => {
  try {
    const res = await apiPost(ENCRYPT_KEY, {key: pin, string: seed})
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    throw new Error(e.message)
  }
}


export const decryptKey = async (pin, pubkey) => {
  try {
    const res = await apiPost(DECRYPT_KEY, {key: pin, pubkey})
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    throw new Error(e.message)
  }
}


export const getPinList = async () => {
  try {
    const res = await apiGet(await apiGet(GET_PIN_LIST))
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    throw new Error(e.message)
  }
}
