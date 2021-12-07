import React from 'react';
import { connect } from 'react-redux';
import { 
  SetupVaultRender
} from './setupVault.render';
import { newSnackbar } from '../../../actions/actionCreators';
import {
  LOCK_WITH_DELAY,
  LOCK_UNTIL_HEIGHT,
  SETUP_VAULT,
  CONFIGURE_TIMELOCK,
  SUCCESS_SNACK,
  ERROR_SNACK
} from "../../../util/constants/componentConstants";
import { closeTextDialog, openTextDialog } from '../../../actions/actionDispatchers';
import { setIdTimelock } from '../../../util/api/wallet/writeCalls/setIdTimelock';
const { shell } = window.bridge

class SetupVault extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      setupVaultParams: {
        timelock: "",
      },
      selectedLockType:
        props.modalProps != null && props.modalProps.mode != null
          ? props.modalProps.mode
          : LOCK_WITH_DELAY,
    };

    props.setModalHeader("Setup Vault");
    props.setModalLinks([
      {
        label: "What is Verus Vault?",
        onClick: () => shell.openExternal("https://docs.verus.io/verusid/#verus-vault"),
      },
    ]);

    this.getSetupVaultParams = this.getSetupVaultParams.bind(this);
    this.updateModalButtons = this.updateModalButtons.bind(this);
    this.setSelectedLockType = this.setSelectedLockType.bind(this);
    this.openLockIdentityModal = this.openLockIdentityModal.bind(this);
    this.setupVault = this.setupVault.bind(this)
    this.submit = this.submit.bind(this)

    this.updateModalButtons(props);
  }

  componentWillUnmount() {
    this.props.setModalLinks([]);
  }

  componentDidUpdate(lastProps, lastState) {
    if (
      lastState.selectedLockType !== this.state.selectedLockType ||
      lastProps.isModalLocked !== this.props.isModalLocked
    )
      this.updateModalButtons(this.props);
  }

  setSelectedLockType(source, cb = () => {}) {
    this.setState(
      {
        selectedLockType: source,
        setupVaultParams: {
          timelock: "",
        },
      },
      cb
    );
  }

  updateModalButtons(props) {
    props.setModalButtons([
      {
        onClick: () => this.setSelectedLockType(LOCK_WITH_DELAY),
        isActive: this.state.selectedLockType === LOCK_WITH_DELAY,
        label: "Lock Until Unlocked",
        isDisabled: this.props.isModalLocked,
      },
      {
        onClick: () => this.setSelectedLockType(LOCK_UNTIL_HEIGHT),
        isActive: this.state.selectedLockType === LOCK_UNTIL_HEIGHT,
        label: "Lock Until Height",
        isDisabled: this.props.isModalLocked,
      },
    ]);
  }

  openLockIdentityModal() {
    openTextDialog(
      closeTextDialog,
      [
        {
          title: "No",
          onClick: () => {
            closeTextDialog();
          },
        },
        {
          title: "Yes",
          onClick: () => {
            closeTextDialog();
            this.setupVault();
          },
        },
      ],
      `Are you sure you would like to lock this identity?${
        this.state.selectedLockType === LOCK_WITH_DELAY
          ? ` It will stay locked until ${
              Number(this.state.setupVaultParams.timelock) + 20
            } blocks after you initiate the unlock process.`
          : ` It will stay locked until block ${this.state.setupVaultParams.timelock}.`
      }`,
      "Lock VerusID?"
    );
  }

  async setupVault() {
    try {
      const res = await setIdTimelock(
        this.props.modalProps.coinMode,
        this.props.modalProps.chainTicker,
        this.props.modalProps.identity,
        this.state.selectedLockType === LOCK_WITH_DELAY
          ? { setunlockdelay: Number(this.state.setupVaultParams.timelock) }
          : { unlockatblock: Number(this.state.setupVaultParams.timelock) }
      );

      if (res.msg === "success") {
        this.props.dispatch(
          newSnackbar(
            SUCCESS_SNACK,
            `Identity locked! (txid: ${res.result}) This may take a few minutes to confirm.`
          )
        );

        this.props.closeModal()
      } else {
        throw new Error(res.result);
      }
    } catch (e) {
      this.props.dispatch(newSnackbar(ERROR_SNACK, e.message));
    }
  }

  submit() {
    this.openLockIdentityModal()
  }

  getSetupVaultParams(setupVaultParams, callback) {
    this.setState({ setupVaultParams }, () => {
      if (callback) callback();
    });
  }

  render() {
    return SetupVaultRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
    modalProps: state.modal[`${SETUP_VAULT}/${CONFIGURE_TIMELOCK}`],
  };
};

export default connect(mapStateToProps)(SetupVault);