import React from 'react';
import { connect } from 'react-redux';
import { 
  ReserveSendFormRender
} from './reserveSendForm.render';

class ReserveSendForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ReserveSendFormRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
  };
};

export default connect(mapStateToProps)(ReserveSendForm);