import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

const StyledTabs = (props) => {
  const { tabs, labelExtractor, onClickExtractor, tabStyle } = props

  return (
    <Tabs
      style={tabStyle == null ? {} : tabStyle}
      value={props.tabIndex}
      onChange={(e, index) => props.setTabIndex(index)}
    >
      {tabs.map((tab) => {
        return (
          <Tab
            label={labelExtractor != null ? () => labelExtractor(tab) : tab.label}
            onClick={onClickExtractor == null ? () => {} : () => onClickExtractor(tab)}
          />
        );
      })}
    </Tabs>
  );
};

// Tab format: 
/* {
  label: "label"
} */
StyledTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  labelExtractor: PropTypes.func,
  onClickExtractor: PropTypes.func,
  tabIndex: PropTypes.number.isRequired,
  setTabIndex: PropTypes.func.isRequired
};

export default StyledTabs;