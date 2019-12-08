import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class CustomTabBar extends React.Component {
  render() {
    const {
      color,
      tabColor,
      appBarProps,
      tabsProps,
      tabs,
      tabLabelExtractor,
      handleTabChange,
      activeTab,
      tabProps
    } = this.props;

    const CustomTab = withStyles({
      root: {
        backgroundColor: tabColor ? tabColor : undefined,
        fontFamily: "inherit"
      },
    })(props => <Tab color="default" {...props} />);
    
    const CustomAppBar = withStyles({
      root: {
        backgroundColor: color ? color : undefined,
      },
    })(props => <AppBar color="default" {...props} />);

    return (
      <CustomAppBar position="static" {...appBarProps} >
        <Tabs value={ activeTab } onChange={ handleTabChange } {...tabsProps}>
          {tabs.map((tab, index) => {
            return <CustomTab key={index} label={tabLabelExtractor ? () => tabLabelExtractor(tab) : tab} {...tabProps}/>;
          })}
        </Tabs>
      </CustomAppBar>
    );
  }
}

CustomTabBar.propTypes = {
  color: PropTypes.string,
  appBarProps: PropTypes.object,
  tabsProps: PropTypes.object,
  tabProps: PropTypes.object,
  tabs: PropTypes.array.isRequired,
  tabLabelExtractor: PropTypes.func,
  tabColor: PropTypes.string,
  handleTabChange: PropTypes.func
};

export default CustomTabBar