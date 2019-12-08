import React from 'react';
import { connect } from 'react-redux';
import { 
  FundFormRender
} from './fundForm.render';

class FundForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return FundFormRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
  };
};

export default connect(mapStateToProps)(FundForm);