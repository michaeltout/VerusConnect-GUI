let Config = {}
let Secrets = {}

try {
  Config = window.bridge.getConfigSync()
} catch(e) {
  console.error("Error loading config!")
  console.error(e)
  Config = window.bridge.defaultConfig
}

try {
  Secrets = window.bridge.getSecretsSync()
} catch(e) {
  console.error("Error loading api secrets!")
  console.error(e)
  Secrets = {
    appSecretToken: "",
		apiShieldKey: ""
  }
}

export const agamaPort = Config.general.main.agamaPort;
export const apiEncryption = Config.general.main.encryptApiPost
export const secretToken = Secrets.appSecretToken
export const shieldKey = Secrets.apiShieldKey

export default Config;