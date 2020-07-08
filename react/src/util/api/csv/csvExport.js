import { apiPost } from "../callCreator"
import { API_EXPORT_TX_CSV } from "../../constants/componentConstants"

/**
 * Exports a list of transactions as a csv file,
 * format of each tx must be {type, amount, fee, date, address, confirmations, affected_balance, txid, coin}
 */
export const exportTransactionCsv = async (transactions, path) => {
  try {
    const res = await apiPost(API_EXPORT_TX_CSV, { transactions, path })
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}