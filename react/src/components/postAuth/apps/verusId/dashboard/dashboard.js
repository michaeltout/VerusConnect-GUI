import React from 'react';
import { connect } from 'react-redux';
import { 
  DashboardRender,
} from './dashboard.render';
import { setModalParams, setModalNavigationPath, expireData, newSnackbar, setMainNavigationPath } from '../../../../../actions/actionCreators';
import {
  CREATE_IDENTITY,
  NATIVE,
  API_GET_NAME_COMMITMENTS,
  ERROR_SNACK,
  MID_LENGTH_ALERT,
  SUCCESS_SNACK,
  ID_POSTFIX,
  API_REGISTER_ID,
  API_REGISTER_ID_NAME,
  API_RECOVER_ID,
  API_SUCCESS,
  INFO_SNACK,
  ADD_COIN,
  SELECT_COIN,
  SIGN_VERIFY_ID_DATA,
  VERIFY_ID_DATA,
  SIGN_ID_DATA,
  API_GET_IDENTITIES,
  API_GET_INFO
} from "../../../../../util/constants/componentConstants";
import { deleteIdName, revokeIdentity } from '../../../../../util/api/wallet/walletCalls';
import Store from '../../../../../store'
import { conditionallyUpdateWallet, openModal } from '../../../../../actions/actionDispatchers';
import { getPathParent } from '../../../../../util/navigationUtils';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      compiledIds: [],
      displayNameCommitments: [],
      nameReservationDropdownOpen: false,
      idRecoveryDropdownOpen: false,
      verifyDataDropdownOpen: false,
      signDataDropdownOpen: false,
      revokeDialogueOpen: false,
      revokeId: null
    }

    this.compileIds = this.compileIds.bind(this)
    this.compileCommits = this.compileCommits.bind(this)
    this.toggleReservationDropdown = this.toggleReservationDropdown.bind(this)
    this.toggleRecoveryDropdown = this.toggleRecoveryDropdown.bind(this)
    this.toggleVerifyDataDropdown = this.toggleVerifyDataDropdown.bind(this)
    this.toggleSignDataDropdown = this.toggleSignDataDropdown.bind(this)
    this.openCommitNameModal = this.openCommitNameModal.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.openRegisterIdentityModal = this.openRegisterIdentityModal.bind(this)
    this.deleteNameCommitment = this.deleteNameCommitment.bind(this)
    this.openId = this.openId.bind(this)
    this.openRecoverIdModal = this.openRecoverIdModal.bind(this)
    this.openVerifyIdDataModal = this.openVerifyIdDataModal.bind(this)
    this.openSignIdDataModal = this.openSignIdDataModal.bind(this)
    this.openRevokeDialogue = this.openRevokeDialogue.bind(this)
    this.closeRevokeDialogue = this.closeRevokeDialogue.bind(this)
    this.revokeId = this.revokeId.bind(this)
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  openId(chainTicker, idIndex) {
    this.props.dispatch(setMainNavigationPath(`${getPathParent(this.props.mainPathArray)}/${idIndex}_${chainTicker}_${ID_POSTFIX}`))
  }

  openAddCoinModal() {
    this.props.dispatch(setModalNavigationPath(`${ADD_COIN}/${SELECT_COIN}`))
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick(e) {
    if (
      this.reservationDropdownMenu.contains(e.target) ||
      this.recoveryDropdownMenu.contains(e.target) ||
      this.verifyDataDropdownMenu.contains(e.target) ||
      this.signDataDropdownMenu.contains(e.target)
    )
      return;
    else
      this.setState({
        nameReservationDropdownOpen: false,
        idRecoveryDropdownOpen: false,
        verifyDataDropdownOpen: false,
        signDataDropdownOpen: false
      });
  }

  openRevokeDialogue(revokeId) {
    this.setState({revokeDialogueOpen: true, revokeId})
  }

  closeRevokeDialogue() {
    this.setState({revokeDialogueOpen: false})
  }

  async revokeId(chainTicker, name) {
    this.closeRevokeDialogue()

    try {
      const revRes = await revokeIdentity(chainTicker, name)

      if (revRes.msg === API_SUCCESS) {
        this.props.dispatch(newSnackbar(INFO_SNACK, `ID revoke transaction posted with id ${revRes.result.txid}, please wait a few minutes for confirmation.`))
      } else {
        this.props.dispatch(newSnackbar(ERROR_SNACK, revRes.result, MID_LENGTH_ALERT))
      }
    } catch (e) {
      this.props.dispatch(newSnackbar(ERROR_SNACK, e.message, MID_LENGTH_ALERT))
    }
  }

  componentDidMount() {
    this.compileIds()
    this.compileCommits()
  }

  componentDidUpdate(lastProps) {
    if (this.props != lastProps) {
      this.compileIds()
      this.compileCommits()
    }
  }

  toggleReservationDropdown() {
    this.setState({
      nameReservationDropdownOpen: !this.state.nameReservationDropdownOpen,
      idRecoveryDropdownOpen: false,
      verifyDataDropdownOpen: false,
      signDataDropdownOpen: false
    })
  }

  toggleRecoveryDropdown() {
    this.setState({
      idRecoveryDropdownOpen: !this.state.idRecoveryDropdownOpen,
      nameReservationDropdownOpen: false,
      verifyDataDropdownOpen: false,
      signDataDropdownOpen: false
    });
  }

  toggleVerifyDataDropdown() {
    this.setState({
      verifyDataDropdownOpen: !this.state.verifyDataDropdownOpen,
      idRecoveryDropdownOpen: false,
      nameReservationDropdownOpen: false,
      signDataDropdownOpen: false
    });
  }

  toggleSignDataDropdown() {
    this.setState({ 
      signDataDropdownOpen: !this.state.signDataDropdownOpen,
      verifyDataDropdownOpen: false,
      idRecoveryDropdownOpen: false,
      nameReservationDropdownOpen: false
     });
  }

  compileIds() {
    const { identities } = this.props
    let compiledIds = []

    Object.keys(identities).map(chainTicker => {
      if (identities[chainTicker]) {
        identities[chainTicker].map((id, index) => {
          compiledIds.push({...id, chainTicker, index})
        })
      }
    })

    this.setState({ compiledIds })
  }

  openCommitNameModal(chainTicker, commitmentData = null) {
    openModal(CREATE_IDENTITY, { modalType: API_REGISTER_ID_NAME, chainTicker, commitmentData })
  }

  openRegisterIdentityModal(nameCommitmentObj) {
    openModal(CREATE_IDENTITY, { modalType: API_REGISTER_ID, chainTicker: nameCommitmentObj.chainTicker, nameCommitmentObj })
  }

  openRecoverIdModal(chainTicker, formData) {
    openModal(CREATE_IDENTITY, { modalType: API_RECOVER_ID, chainTicker, formData} )
  }

  openVerifyIdDataModal(chainTicker) {
    openModal(SIGN_VERIFY_ID_DATA, { modalType: VERIFY_ID_DATA, chainTicker })
  }

  openSignIdDataModal(chainTicker) {
    openModal(SIGN_VERIFY_ID_DATA, { modalType: SIGN_ID_DATA, chainTicker })
  }

  async deleteNameCommitment(name, chainTicker) {
    const { dispatch } = this.props

    try {
      const result = await deleteIdName(chainTicker, name)

      if (result) {
        dispatch(expireData(chainTicker, API_GET_NAME_COMMITMENTS))
        dispatch(newSnackbar(SUCCESS_SNACK, 'Name commitment untracked!', MID_LENGTH_ALERT))
        conditionallyUpdateWallet(Store.getState(), dispatch, NATIVE, chainTicker, API_GET_NAME_COMMITMENTS)
      } else {
        dispatch(newSnackbar(ERROR_SNACK, 'Name commitment to delete not found.', MID_LENGTH_ALERT))
      }
    } catch (e) {
      console.error(e)
      dispatch(newSnackbar(ERROR_SNACK, e.message, MID_LENGTH_ALERT))
    }    
  }

  compileCommits() {
    const { nameCommitments, transactions } = this.props
    let compiledCommits = []

    Object.keys(nameCommitments).map(chainTicker => {
      if (nameCommitments[chainTicker]) {
        nameCommitments[chainTicker].map(nameCommit => {
          let confirmations = null

          if (transactions[chainTicker]) {
            transactions[chainTicker].map(tx => {
              if (tx.txid === nameCommit.txid) {
                confirmations = tx.confirmations
              }
            })
          }

          compiledCommits.push({...nameCommit, chainTicker, confirmations})
        })
      }
    })

    this.setState({ displayNameCommitments: compiledCommits })
  }

  render() {
    return DashboardRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPathArray: state.navigation.mainPathArray,
    activatedCoins: state.coins.activatedCoins,
    identities: state.ledger.identities,
    identityErrors: state.errors[API_GET_IDENTITIES],
    getInfoErrors: state.errors[API_GET_INFO],
    nameCommitments: state.ledger.nameCommitments,
    activeUser: state.users.activeUser,
    transactions: state.ledger.transactions
  };
};

export default connect(mapStateToProps)(Dashboard);