import React from 'react';
import { 
  MigrationHelperRender,
} from './MigrationHelper.render';
import PropTypes from 'prop-types';
import { closeTextDialog, openTextDialog } from '../../actions/actionDispatchers';

class MigrationHelper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      disabled: false
    };

    this.updateAmount = this.updateAmount.bind(this);
    this.openClaimDialog = this.openClaimDialog.bind(this)
  }

  async componentDidMount() {
    this.setState({
      amount: 0//await fetchMigrationBalance()
    })
  }

  openClaimDialog() {
    this.setState({
      disabled: true
    }, async function() {
      const fee = await this.props.fetchFee()
      const ref = this

      openTextDialog(
        closeTextDialog,
        [
          {
            title: "Yes",
            onClick: async function() {
              try {
                await ref.props.migrate()
                closeTextDialog()
                ref.props.onSuccess()
              } catch(e) {
                ref.setState({
                  disabled: false
                }, () => {
                  closeTextDialog()
                  ref.props.onError(e)
                })
              }
            },
          },
          {
            title: "No",
            onClick: function() {
              ref.setState({
                disabled: false
              }, () => closeTextDialog())
            },
          },
        ],
        `Would you like to claim your ${this.state.amount} ${this.props.coin}? This will cost you an estimated fee of ${fee} ${this.props.feeCurr}`,
        `Claim ${this.props.coin}?`
      );
    })
    
  }

  updateAmount(amount) {
    this.setState({ amount });
  }

  render() {
    return MigrationHelperRender.call(this);
  }
}

MigrationHelper.propTypes = {
  coin: PropTypes.string,
  fetchMigrationBalance: PropTypes.func,
  feeCurr: PropTypes.string,
  fetchFee: PropTypes.func,
  migrate: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func
};

export default MigrationHelper;