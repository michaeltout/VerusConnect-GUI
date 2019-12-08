import React from 'react';
import { connect } from 'react-redux';
import { 
  MessageSendFormRender
} from './messageSendForm.render';

class MessageSendForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return MessageSendFormRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
  };
};

export default connect(mapStateToProps)(MessageSendForm);