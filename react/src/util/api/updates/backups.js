import { apiPost } from "../callCreator"
import { API_BACKUP_APPDATA } from "../../constants/componentConstants"

/**
 * Backs up all app data in the Verus-Desktop folder (config.json, users.json, etc.)
 */
export const backupAppData = async (backupName) => {
  try {
    const res = await apiPost(API_BACKUP_APPDATA, { dirName: backupName })
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}