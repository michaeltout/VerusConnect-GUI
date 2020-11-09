import {
  testConfig
} from './util/testutil/testConfig'
const { remote } = window.require('electron')

const mainWindow = remote.getGlobal('app');

let Config = {}

if (mainWindow) {
  Config = mainWindow.appConfig;
} else {
  // If mainwindow is null, assume jest testmode
  Config = testConfig;
}

export const agamaPort = Config.general.main.agamaPort;
export const apiEncryption = Config.general.main.encryptApi
export const getPostToken = () => {
  return remote.getGlobal('app').appPostSessionHash
}
export const getGetToken = () => {
  return remote.getGlobal('app').appNonPostSessionHash
}
export const getShieldKey = () => {
  return remote.getGlobal('app').apiShieldKey
}
export const rpc2cli = Config.general.native.rpc2cli;

export default Config;