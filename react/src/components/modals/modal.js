import React from 'react';
import { connect } from 'react-redux';
import { 
  ModalRender
} from './modal.render';
import { setModalNavigationPath } from '../../actions/actionCreators'
import Button from '@material-ui/core/Button';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalHeader: 'Modal',
      modalPath: [],
      modalLock: false, // If set to true, modal will not be closeable
      modalLinks: [], // {url: 'example.com', label: "Example Link"}
      modalButtons: [], // {onClick: () => {}, isDisabled: false, label: "Example Button", isActive: false}
      modalIcon: null
    }

    this.closeModal = this.closeModal.bind(this)
    this.getModalHeader = this.getModalHeader.bind(this)
    this.getModalLock = this.getModalLock.bind(this)
    this.getModalLinks = this.getModalLinks.bind(this)
    this.getModalIcon = this.getModalIcon.bind(this)
    this.getModalButtons = this.getModalButtons.bind(this)
  }

  // Prevent modal from flashing to null content on close
  componentDidUpdate(lastProps) {
    if (this.props != lastProps && this.props.modalPathArray.length > 0) {
      this.setState({modalPath: this.props.modalPathArray})
    }
  }

  closeModal() {
    this.props.dispatch(setModalNavigationPath(null))
  }

  getModalHeader(modalHeader) {
    this.setState({ modalHeader })
  } 

  getModalLinks(modalLinks) {
    this.setState({ modalLinks })
  }

  getModalIcon(modalIcon) {
    this.setState({ modalIcon })
  }

  getModalButtons(modalButtons) {
    this.setState({ modalButtons })
  }

  getModalLock(modalLock) {    
    this.setState({ modalLock })
  }

  render() {
    return ModalRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    modalPathArray: state.navigation.modalPathArray,
  };
};

export default connect(mapStateToProps)(Modal);