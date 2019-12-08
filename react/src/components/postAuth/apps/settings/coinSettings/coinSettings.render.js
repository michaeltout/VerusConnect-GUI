import React from 'react';
import CustomTabBar from '../../../../../containers/CustomTabBar/CustomTabBar';
import SimpleSetting from '../../../../../containers/SimpleSetting/SimpleSetting';
import Divider from '@material-ui/core/Divider';
import { Z_ONLY, IS_ZCASH, STAKE_GUARD, IS_VERUS } from '../../../../../util/constants/componentConstants';

export const CoinSettingsRender = function() {
  const { state, handleTabChange } = this
  const { activeTab, tabs } = state

  return (
    <div className="d-flex flex-fill flex-wrap" style={{ marginBottom: 16 }}>
      <div className="flex-grow-1">
        <div className="col-lg-12" style={{ padding: 0 }}>
          <div className="card border rounded-0">
            <CustomTabBar 
              tabs={tabs}
              color="rgb(78,115,223)"
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              tabProps={{
                style: {
                  color: "white"
                }
              }}
            />
            { CoinSettingsOptionsRender.call(this) }
          </div>
        </div>
      </div>
    </div>
  );
}

export const CoinSettingsOptionsRender = function() {
  const { state, props } = this
  const { activeTab, tabs } = state
  const { configSchema, displayConfig, selectedCoinObj } = props
  const configTypes = configSchema[tabs[activeTab]]
  const { tags, id } = selectedCoinObj

  return (
    <div className="card-body">
      {Object.keys(configTypes).map((settingKey, index) => {
        //TODO: Use info as tooltip
        const { type, displayName, options, info, disabled, hidden } = configTypes[settingKey]

        return (settingKey === STAKE_GUARD && !tags.includes(IS_VERUS)) || hidden ? null : (
          <React.Fragment key={index}>
            <SimpleSetting
              name={settingKey}
              label={displayName}
              inputType={type}
              handleChange={this.setConfigValue}
              value={displayConfig.coin[tabs[activeTab]][settingKey][id]}
              values={options}
              disabled={
                settingKey !== STAKE_GUARD &&
                (tags.includes(Z_ONLY) || !tags.includes(IS_ZCASH))
              }
            />
            <div style={{ paddingTop: 16, paddingBottom: 16 }}>
              <Divider variant="middle" />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}


