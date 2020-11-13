import React from 'react';
import { 
  MigrationHelperRender,
} from './MigrationHelper.render';
import PropTypes from 'prop-types';
import { closeTextDialog, openTextDialog } from '../../actions/actionDispatchers';
import BigNumber from "bignumber.js";

class MigrationHelper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: BigNumber(0),
      displayFee: BigNumber(0),
      disabled: false
    };

    this.openClaimDialog = this.openClaimDialog.bind(this)
  }

  async componentDidMount() {
    const balances = await this.props.fetchMigrationBalance()
    const fee = await this.props.fetchFee()
    let displayFee = '??'

    if (fee.msg === 'success') displayFee = BigNumber(fee.result._hex).dividedBy("1000000000000000000").toString()

    if (balances.msg === 'success') {
      this.setState({
        amount: BigNumber(balances.result[1]._hex).dividedBy("1000000000000000000"),
        displayFee
      })
    }
  }

  openClaimDialog() {
    this.setState({
      disabled: true
    }, async function() {
      const ref = this

      openTextDialog(
        closeTextDialog,
        [
          {
            title: "Yes",
            onClick: async function() {
              try {
                const result = await ref.props.migrate();

                closeTextDialog();

                if (result.msg === 'success') ref.props.onSuccess();
                else throw new Error(result.result)
                
              } catch (e) {
                ref.setState(
                  {
                    disabled: false,
                  },
                  () => {
                    closeTextDialog();
                    ref.props.onError(e);
                  }
                );
              }
            },
          },
          {
            title: "No",
            onClick: function() {
              ref.setState(
                {
                  disabled: false,
                },
                () => closeTextDialog()
              );
            },
          },
        ],
        `Would you like to claim your ${this.state.amount.toString()} ${
          this.props.coin
        }? This will cost you an estimated fee of ${this.state.displayFee} ${this.props.feeCurr}`,
        `Claim ${this.props.coin}?`
      );
    })
    
  }

  render() {
    return this.state.amount.isZero() || this.state.disabled ? null : MigrationHelperRender.call(this);
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