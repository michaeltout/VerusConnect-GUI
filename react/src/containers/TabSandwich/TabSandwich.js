import React from 'react';
import PropTypes from 'prop-types';
import CustomTabBar from '../CustomTabBar/CustomTabBar';
import WalletPaper from '../WalletPaper/WalletPaper';

function TabSandwich(props) {
  const {
    children,
    containerStyle,
    handleTopTabChange,
    handleBottomTabChange,
    topTabs,
    bottomTabs,
    activeBottomTab,
    activeTopTab
  } = props;

  return (
    <WalletPaper style={{padding: 0, ...containerStyle}}>
      <CustomTabBar
        tabs={topTabs}
        tabStyle={{ width: `${100 / topTabs.length}%`, minWidth: `${100 / topTabs.length}%` }}
        tabsProps={{variant: 'fullWidth'}}
        color="rgb(78,115,223)"
        activeTab={activeTopTab}
        handleTabChange={handleTopTabChange}
        tabProps={{
          style: {
            color: "white"
          }
        }}
      />
      { children }
      <CustomTabBar
        tabs={bottomTabs}
        tabStyle={{ width: `${100 / bottomTabs.length}%`, minWidth: `${100 / bottomTabs.length}%` }}
        tabsProps={{variant: 'fullWidth'}}
        color="rgb(78,115,223)"
        activeTab={activeBottomTab}
        handleTabChange={handleBottomTabChange}
        bottom={true}
        tabProps={{
          style: {
            color: "white"
          }
        }}
      />
    </WalletPaper>
  );
}

TabSandwich.propTypes = {
  containerStyle: PropTypes.object,
  handleTopTabChange: PropTypes.func,
  handleBottomTabChange: PropTypes.func,
  topTabs: PropTypes.array.isRequired,
  bottomTabs: PropTypes.array.isRequired,
  activeBottomTab: PropTypes.number,
  activeTopTab: PropTypes.number
};

export default TabSandwich