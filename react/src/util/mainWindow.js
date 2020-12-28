import { testConfig } from '../util/testutil/testConfig'

const mainWindow = window.electron.remote.getGlobal('app') || { appConfig: testConfig };

const { ipcRenderer } = window.electron;
export const staticVar = window.staticVar;

export default mainWindow;