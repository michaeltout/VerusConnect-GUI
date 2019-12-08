import React from 'react';
import { connect } from 'react-redux';
import { 
  AddCoinRender
} from './addCoin.render';

class AddCoin extends React.Component {
  constructor(props) {
    super(props);

    props.setModalHeader("Add Coin")
    this.state = {
      addCoinParams: {
        coinObj: null,
        mode: null,
        startParams: null,
      }
    }

    this.getAddCoinParams = this.getAddCoinParams.bind(this)
  }

  getAddCoinParams(addCoinParams, callback) {
    this.setState({addCoinParams}, () => { if (callback) callback()})
  }

  render() {
    return AddCoinRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
  };
};

export default connect(mapStateToProps)(AddCoin);