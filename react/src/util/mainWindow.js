import { testConfig } from '../util/testutil/testConfig'

const mainWindow = window.electron.remote.getGlobal('app') || { appConfig: testConfig };

const { ipcRenderer } = window.electron;
export let staticVar;

ipcRenderer.on('staticVar', (event, arg) => {
  staticVar = arg;
});

if (!staticVar) { 
  ipcRenderer.send('staticVar');
}

export default mainWindow;