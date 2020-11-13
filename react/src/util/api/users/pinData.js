import { apiGet, apiPost } from '../callCreator'
import { ENCRYPT_KEY, DECRYPT_KEY } from '../../constants/componentConstants'


export const encryptKey = async (pin, seed) => {
  try {
    const res = await apiPost(ENCRYPT_KEY, {key: pin, string: seed}, true)
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    throw new Error(e.message)
  }
}


export const decryptKey = async (pin, pubkey) => {
  try {
    const res = await apiPost(DECRYPT_KEY, {key: pin, pubkey}, true)
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    throw new Error(e.message)
  }
}
