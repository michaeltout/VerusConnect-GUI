import { tabItemStyles } from './Tabs.styles'
import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

const StyledTabs = withStyles(tabItemStyles)(Tabs);

const StyledTabs = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { tabs, labelExtractor, onClickExtractor, selectedExtractor } = props

  return (
    <StyledTabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
      { tabs.map(tab => {
        return (
          <Tab
            label={labelExtractor != null ? labelExtractor(tab) : tab.label}
            onClick={onClickExtractor(tab)}
            selectedExtractor={selectedExtractor(tab)}
          />
        );
      }) }
    </StyledTabs>
  );
};

// Tab format: 
/* {
  label: "label"
} */
StyledTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  labelExtractor: PropTypes.func,
  onClickExtractor: PropTypes.func.isRequired,
  selectedExtractor: PropTypes.func.isRequried
};

export default StyledTabs;