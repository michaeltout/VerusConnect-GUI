import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class IconDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
  }

  handleClick(e) {
    this.setState({ anchorEl: e.currentTarget })
  };

  handleClose() {
    this.setState({ anchorEl: null })
  };

  handleMenuItemClick(item) {
    this.setState({ anchorEl: null }, () => {
      this.props.onSelect(item)
    })
  }

  render() {
    const { handleClose, handleClick, props, state, handleMenuItemClick } = this
    const { items, getItem, dropdownIconComponent, size } = props
    const { anchorEl } = state
    
    return (
      <div>
        <IconButton
          aria-label="more"
          aria-haspopup="true"
          onClick={handleClick}
          size={size ? size : "medium"}
        >
          { dropdownIconComponent }
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          { items.map((item, index) => {
            return (
              <MenuItem key={index} onClick={() => handleMenuItemClick(item)}>
                {getItem ? getItem(item) : <div style={{ fontFamily: "inherit", fontSize: 14 }}>{ item }</div>}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    )
  }
}

IconDropdown.propTypes = {
  items: PropTypes.array,
  getItem: PropTypes.func,
  dropdownIconComponent: PropTypes.element.isRequired,
  onSelect: PropTypes.func.isRequired,
  size: PropTypes.string
};

export default IconDropdown