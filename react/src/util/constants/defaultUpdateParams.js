import { 
  ALWAYS_ACTIVATED, 
  NEVER_ACTIVATED, 
  IS_ZCASH, 
  IS_PBAAS, 
  IS_PBAAS_ROOT,
  API_GET_ADDRESSES,
  API_GET_BALANCES,
  API_GET_DEFINEDCHAINS,
  API_GET_INFO,
  API_GET_MININGINFO,
  API_GET_TRANSACTIONS,
  API_GET_ZOPERATIONSTATUSES,
  API_GET_FIATPRICE,
  CHAIN_POSTFIX
} from './componentConstants'

/**
 * The constant parameter object that holds all settings for deciding the timing and frequency of how certain coin modes
 * call their API to get their data.
 * @param {String} ticker The coin to get update parameters for (for location restrictions)
 */
export const DEFAULT_UPDATE_PARAMS = (ticker) => ({
  native: {
    [API_GET_INFO]: {
      // Restrictions specify if this interval should only be added to certain types of coins, e.g. 'is_pbaas' for only pbaas chains,
      // or 'VRSC' for only VRSC
      restrictions: [], 
      pre_data: {
        tracking_info: {
          needs_update: true,
          busy: false,
          // Location restrictions are the specific app navigation locations from which this interval will actually cause an API call.
          // Leave blank for all locations
          location_restrictions: [],

          // Location and type restrictions specify a restriction that will allow this update to be called if 
          // a location is active && the coin type is the type specified. Format is [location, type], e.g. [@post_auth/apps/mining/dashboard, IS_PBAAS]
          location_and_type_restrictions: [],
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: ALWAYS_ACTIVATED,
          update_expired_interval: 5000
        }
      },
      syncing: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: ALWAYS_ACTIVATED,
          update_expired_interval: 20000
        }
      },
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },

    [API_GET_TRANSACTIONS]: {
      restrictions: [], 
      pre_data: {
        tracking_info: {
          needs_update: false,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: NEVER_ACTIVATED,
          update_expired_interval: NEVER_ACTIVATED
        }
      },
      syncing: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [`@post_auth/apps/wallet/${ticker}_${CHAIN_POSTFIX}`],
          location_and_type_restrictions: [['@post_auth/apps/mining/dashboard', IS_PBAAS]]
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 60000,
          update_expired_interval: 10000,
        }
      },
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [`@post_auth/apps/wallet/${ticker}_${CHAIN_POSTFIX}`],
          location_and_type_restrictions: [['@post_auth/apps/mining/dashboard', IS_PBAAS]]
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 60000,
          update_expired_interval: 10000,
        }
      }
    },

    [API_GET_MININGINFO]: {
      restrictions: [IS_PBAAS], 
      pre_data: {
        tracking_info: {
          needs_update: false,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: NEVER_ACTIVATED,
          update_expired_interval: NEVER_ACTIVATED
        }
      },
      syncing: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: ['@post_auth/apps/mining/dashboard'],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      },
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*'@post_auth/apps/mining/dashboard'*/],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },

    [API_GET_ADDRESSES]: {
      restrictions: [], 
      pre_data: {
        tracking_info: {
          needs_update: false,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: NEVER_ACTIVATED,
          update_expired_interval: NEVER_ACTIVATED
        }
      },
      syncing: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*`receive_coin@post_auth/apps/wallet/${ticker}_${CHAIN_POSTFIX}`*/],
          location_and_type_restrictions: [/*['@post_auth/apps/pbaas/create', IS_PBAAS_ROOT]*/]
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      },
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*`receive_coin@post_auth/apps/wallet/${ticker}_${CHAIN_POSTFIX}`*/],
          location_and_type_restrictions: [/*['@post_auth/apps/pbaas/create', IS_PBAAS_ROOT]*/]
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },

    [API_GET_BALANCES]: {
      restrictions: [], 
      pre_data: {
        tracking_info: {
          needs_update: false,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: NEVER_ACTIVATED,
          update_expired_interval: NEVER_ACTIVATED
        }
      },
      syncing: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      },
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },

    [API_GET_FIATPRICE]: {
      restrictions: [], 
      pre_data: {
        tracking_info: {
          needs_update: false,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: NEVER_ACTIVATED,
          update_expired_interval: NEVER_ACTIVATED
        }
      },
      syncing: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*'@post_auth/apps/wallet'*/],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      },
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*'@post_auth/apps/wallet'*/],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },

    [API_GET_ZOPERATIONSTATUSES]: {
      restrictions: [IS_ZCASH], 
      pre_data: {
        tracking_info: {
          needs_update: false,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: NEVER_ACTIVATED,
          update_expired_interval: NEVER_ACTIVATED
        }
      },
      syncing: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [`@post_auth/apps/wallet/${ticker}_${CHAIN_POSTFIX}`],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000,
        }
      },
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [`@post_auth/apps/wallet/${ticker}_${CHAIN_POSTFIX}`],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000,
        }
      }
    },

    [API_GET_DEFINEDCHAINS]: {
      restrictions: [IS_PBAAS_ROOT], 
      pre_data: {
        tracking_info: {
          needs_update: false,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: NEVER_ACTIVATED,
          update_expired_interval: NEVER_ACTIVATED
        }
      },
      syncing: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: ['@post_auth/apps/pbaas/discover'],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      },
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*'@post_auth/apps/pbaas/discover'*/],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },
  },
  
  //Electrum and eth have no syncing or pre_data phases
  electrum: {
    [API_GET_INFO]: {
      restrictions: [], 
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: NEVER_ACTIVATED,
          update_expired_interval: NEVER_ACTIVATED,
        }
      }
    },

    [API_GET_TRANSACTIONS]: {
      restrictions: [], 
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*`@post_auth/apps/wallet/${ticker}_${CHAIN_POSTFIX}`*/],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 60000,
          update_expired_interval: 10000,
        }
      }
    },

    [API_GET_BALANCES]: {
      restrictions: [], 
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },

    [API_GET_ADDRESSES]: {
      restrictions: [], 
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*`receive_coin@post_auth/apps/wallet/${ticker}_${CHAIN_POSTFIX}`*/],
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },

    [API_GET_FIATPRICE]: {
      restrictions: [], 
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*'@post_auth/apps/wallet'*/],
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },
  },

  eth: {
    [API_GET_INFO]: {
      restrictions: [], 
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: NEVER_ACTIVATED,
          update_expired_interval: NEVER_ACTIVATED,
        }
      }
    },

    [API_GET_TRANSACTIONS]: {
      restrictions: [], 
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*`@post_auth/apps/wallet/${ticker}_${CHAIN_POSTFIX}`*/],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 60000,
          update_expired_interval: 10000,
        }
      }
    },

    [API_GET_BALANCES]: {
      restrictions: [], 
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [],
          location_and_type_restrictions: []
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },

    [API_GET_ADDRESSES]: {
      restrictions: [], 
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*`receive_coin@post_auth/apps/wallet/${ticker}_${CHAIN_POSTFIX}`*/],
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },

    [API_GET_FIATPRICE]: {
      restrictions: [], 
      post_sync: {
        tracking_info: {
          needs_update: true,
          busy: false,
          location_restrictions: [/*'@post_auth/apps/wallet'*/],
        },
        interval_info: {
          expire_id: null,
          update_expired_id: null,
          expire_oncomplete: null,
          update_expired_oncomplete: null,
          expire_timeout: 30000,
          update_expired_interval: 10000
        }
      }
    },
  },
})