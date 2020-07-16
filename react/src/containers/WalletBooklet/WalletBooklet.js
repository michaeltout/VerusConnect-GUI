import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PropTypes from 'prop-types';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'white',
    borderBottom: `1px solid rgba(0, 0, 0, .125)`,
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
    fontFamily: "inherit",
    paddingLeft: 16
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    fontFamily: "inherit"
  },
}))(MuiExpansionPanelDetails);

function WalletBooklet(props) {
  const {
    containerStyle,
    pages,
    defaultPageIndex,
    expandedPanelIndex,
    handleClick,
    disabled,
  } = props;
  const [expanded, setExpanded] = React.useState(defaultPageIndex != null ? `panel${defaultPageIndex + 1}` : null);
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div style={containerStyle}>
      {pages.map((page, index) => {
        const isExpanded =
          expandedPanelIndex == null
            ? expanded === `panel${index + 1}`
            : expandedPanelIndex === index;

        return (
          <ExpansionPanel
            square
            expanded={isExpanded}
            disabled={disabled}
            onChange={
              handleClick != null
                ? () => handleClick(index)
                : handleChange(`panel${index + 1}`)
            }
            key={index}
          >
            <ExpansionPanelSummary
              aria-controls={`panel${index + 1}d-content`}
              id={`panel${index + 1}d-header`}
            >
              <h6 style={{ margin: 0, fontSize: 14 }}>{page.title}</h6>
              {!isExpanded && <ExpandMoreIcon />}
              {isExpanded && <ExpandLessIcon />}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{page.content}</ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}

WalletBooklet.propTypes = {
  pages: PropTypes.array.isRequired,
  containerStyle: PropTypes.object,
  defaultPageIndex: PropTypes.number,
  handleClick: PropTypes.func,
  expandedPanelIndex: PropTypes.number,
  disabled: PropTypes.bool
};

export default WalletBooklet