import React from 'react';
import CustomTabBar from '../../../../../containers/CustomTabBar/CustomTabBar';
import SimpleSetting from '../../../../../containers/SimpleSetting/SimpleSetting';
import Divider from '@material-ui/core/Divider';

export const GeneralSettingsRender = function() {
  const { tabs, state, handleTabChange, NATIVE_INDEX } = this
  const { activeTab } = state

  return (
    <div className="d-flex flex-fill flex-wrap" style={{ marginBottom: 16 }}>
      <div className="flex-grow-1">
        <div className="col-lg-12" style={{ padding: 0 }}>
          <div className="card border rounded-0">
            <CustomTabBar 
              tabs={tabs}
              color="rgb(49, 101, 212)"
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              tabProps={{
                style: {
                  color: "white"
                }
              }}
            />
            { GeneralSettingsOptionsRender.call(this) }
          </div>
        </div>
      </div>
    </div>
  );
}

export const GeneralSettingsOptionsRender = function() {
  const { tabs, state, props } = this
  const { activeTab } = state
  const { configSchema, displayConfig } = props
  const configTypes = configSchema[tabs[activeTab]]

  return (
    <div className="card-body">
      {Object.keys(configTypes).map(settingKey => {
        //TODO: Use info as tooltip
        const { type, displayName, options, info } = configTypes[settingKey]

        return (
          <React.Fragment>
            <SimpleSetting
              name={ settingKey }
              label={ displayName }
              toolTip={ info }
              inputType={ type }
              handleChange={ this.setConfigValue }
              value={ displayConfig.general[tabs[activeTab]][settingKey] }
              values={ options }
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

