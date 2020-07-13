import { getUpdateLog, saveUpdateLog } from "../../../../util/api/updates/updateLog"
import { UPDATE_LOG_HISTORY, UPDATE_FUNCTIONS } from "../../../../util/constants/updateLog"
import compareVersions from "../../../../util/versionCompare"
import { backupAppData } from "../../../../util/api/updates/backups"

// Returns an object outlining the changes required to make to current app data, if any of them 
// are breaking changes, and if the current version of the app can be compatible with the current 
// state of app data
export const getAppDataUpdateStatus = async () => {
  let updateLog = await getUpdateLog()
  let history 

  if (updateLog.msg != 'success' || updateLog.result.history == null) history = {};
  else history = updateLog.result.history

  const changesDone = Object.keys(history)
  const changesNeeded = Object.keys(UPDATE_LOG_HISTORY)

  if (changesDone.length < changesNeeded.length) {
    const requiredChanges = changesNeeded.filter((version) => !changesDone.includes(version))

    return {
      requiredChanges: requiredChanges.sort(compareVersions),
      breaking: changesNeeded.some((version) => UPDATE_LOG_HISTORY[version].breaking),
      currentlyCompatible: true,
      latestChange: changesNeeded[changesNeeded.length - 1]
    }
  } else if (changesDone.length > changesNeeded.length) {    
    return {
      requiredChanges: [],
      breaking: null,
      currentlyCompatible: !(changesDone.some((version) => !changesNeeded.includes(version) && history[version].breaking)),
      latestChange: changesDone[changesDone.length - 1]
    }
  } else {
    return {
      requiredChanges: [],
      breaking: false,
      currentlyCompatible: true,
      latestChange: null
    }
  }
}

// Given an array of version numbers from the requiredChanges field returned from the function
// above, this function makes the required changes, and backs up existing app data if any are made
export const makeAppDataChanges = async (changes) => {
  if (changes.some((version) => UPDATE_LOG_HISTORY[version].breaking)) {
    await backupAppData(
      `appdata_backup_pre_${changes[changes.length - 1].replace(
        /\./g,
        "-"
      )}_${new Date().getTime()}`
    );
  }

  for (let i = 0; i < changes.length; i++) {
    if (UPDATE_FUNCTIONS[changes[i]] == null) {
      throw new Error(
        `Cant find function to change app data for ${changes[i]}, check if this version should actually be in the update log.`
      );
    }

    await UPDATE_FUNCTIONS[changes[i]]()
  }

  await saveUpdateLog(UPDATE_LOG_HISTORY)
}