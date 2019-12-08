import {
  testConfig
} from './util/testutil/testConfig'

const mainWindow = window.require('electron').remote.getGlobal('app');

let Config = {}

if (mainWindow) {
  Config = mainWindow.appConfig;
  Config.token = mainWindow.appSessionHash;
} else {
  // If mainwindow is null, assume jest testmode
  Config = testConfig;
}

export const agamaPort = Config.general.main.agamaPort;
export const token = Config.token;
export const rpc2cli = Config.general.native.rpc2cli;

export default Config;