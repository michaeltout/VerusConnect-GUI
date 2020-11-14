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
      modalLinks: []
    }

    this.closeModal = this.closeModal.bind(this)
    this.getModalHeader = this.getModalHeader.bind(this)
    this.getModalLock = this.getModalLock.bind(this)
    this.getModalLinks = this.getModalLinks.bind(this)
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