import {
  testConfig
} from './util/testutil/testConfig'
const { remote } = window.electron

const mainWindow = remote.getGlobal('app');

let Config = {}

if (mainWindow) {
  Config = mainWindow.appConfig;
} else {
  // If mainwindow is null, assume jest testmode
  Config = testConfig;
}

export const agamaPort = Config.general.main.agamaPort;
export const apiEncryption = Config.general.main.encryptApiPost
export const secretToken = mainWindow.appSecretToken
export const shieldKey = mainWindow.apiShieldKey
export const rpc2cli = Config.general.native.rpc2cli;

export default Config;