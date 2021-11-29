import React from 'react';
import PropTypes from 'prop-types';
import { getIdentity, getCurrency } from '../../util/api/wallet/walletCalls'
import {
  NATIVE,
  ERROR_SNACK,
  MID_LENGTH_ALERT,
  WARNING_SNACK,
  IDENTITY_INFO_TAB,
  IDENTITY_OFFERS_TAB,
  SUCCESS_SNACK,
} from "../../util/constants/componentConstants";
import { newSnackbar, setModalNavigationPath } from '../../actions/actionCreators';
import { copyDataToClipboard } from '../../util/copyToClipboard';
import { IdentityCardRender, IdentityInfoCardRender, IdentityOffersCardRender } from './IdentityCard.render';
import { closeOffers } from '../../util/api/wallet/writeCalls/closeOffers';
import { takeOffer } from '../../util/api/wallet/writeCalls/takeOffer';

class IdentityCard extends React.Component {
  constructor(props) {
    super(props);
    this.IDENTITY_TABS = [
      { label: "Info", key: IDENTITY_INFO_TAB },
      { label: "Offers", key: IDENTITY_OFFERS_TAB }
    ]

    let initialTab = 0;

    if (props.initialTab != null) {
      const indexForKey = this.IDENTITY_TABS.findIndex((x) => x.key === props.initialTab)

      if (indexForKey > -1) initialTab = indexForKey
    }
    
    this.state = {
      idMap: {},
      loadingIdMap: false,
      loadingCurrency: false,
      selectedTabIndex: initialTab,
    };
  
    this.selectOption = this.selectOption.bind(this)
    this.fetchSupportingIdData = this.fetchSupportingIdData.bind(this)
    this.setSelectedTabIndex = this.setSelectedTabIndex.bind(this)
    this.closeOffer = this.closeOffer.bind(this)
    this.takeOffer = this.takeOffer.bind(this)

    this.FIND_ID = "Find ID"
    this.COPY = "Copy to clipboard"
    this.FIND_CURRENCY = "Find Currency"

    this.IDENTITY_CARD_TAB_MAP = {
      [IDENTITY_OFFERS_TAB]: IdentityOffersCardRender,
      [IDENTITY_INFO_TAB]: IdentityInfoCardRender
    }
  }

  componentDidMount() {
    this.fetchSupportingIdData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.verusId.identity.name !== this.props.verusId.identity.name) {
      this.fetchSupportingIdData()
    }
  }

  setSelectedTabIndex = (index) => {
    this.setState({
      selectedTabIndex: index
    })
  }

  async closeOffer(offer) {
    try {
      const res = await closeOffers(this.props.activeCoin.mode, this.props.activeCoin.id, [offer.offer.txid])
      if (res.msg !== 'success') throw new Error(res.result)

      this.props.dispatch(setModalNavigationPath(null))

      this.props.dispatch(
        newSnackbar(
          SUCCESS_SNACK,
          `Offer ${offer.offer.txid} canceled! This may take a few minutes to confirm.`
        )
      );
    } catch(e) {
      this.props.dispatch(
        newSnackbar(
          ERROR_SNACK,
          e.message,
          MID_LENGTH_ALERT
        )
      );
    }
  }

  async takeOffer(offer, destinationaddress, changeaddress) {
    try {
      const offering = offer.offer.offer
      const { accept } = offer.offer

      const res = await takeOffer(this.props.activeCoin.mode, this.props.activeCoin.id, "*", {
        txid: offer.offer.txid,
        changeaddress,
        deliver:
          accept.name != null
            ? accept.identityid
            : { currency: Object.keys(accept)[0], amount: Object.values(accept)[0] },
        accept:
          offering.name != null
            ? {
                parent: this.props.activeCoin.id,
                primaryaddresses: [destinationaddress],
                minimumsignatures: 1,
                name: offering.name
              }
            : {
                address: destinationaddress,
                currency: Object.keys(offering)[0],
                amount: Object.values(offering)[0],
              },
      });

      if (res.msg !== 'success') throw new Error(res.result)

      this.props.dispatch(setModalNavigationPath(null))

      this.props.dispatch(
        newSnackbar(
          SUCCESS_SNACK,
          `Offer taken (txid: ${res.result.txid})! This may take a few minutes to confirm.`
        )
      );
    } catch(e) {
      this.props.dispatch(
        newSnackbar(
          ERROR_SNACK,
          e.message,
          MID_LENGTH_ALERT
        )
      );
    }
  }

  fetchSupportingIdData() {
    this.props.setLock(true)
    this.setState({ loadingIdMap: true, loadingCurrency: true }, async () => {
      const { identity } = this.props.verusId
      let idAddrKeys = ["recoveryauthority", "revocationauthority"]
      let seenAddrs = []
      let promiseArr = []
      let idMap = {}
  
      idAddrKeys.map((key) => {
        const addr = identity[key]
  
        if (!seenAddrs.includes(addr)) {
          seenAddrs.push(addr)
  
          if (addr === identity.identityaddress) {
            idMap[addr] = this.props.verusId
          } else {
            promiseArr.push(getIdentity(NATIVE, this.props.activeCoin.id, addr))
          }
        }
      })
  
      // Fetch names for identity addresses
      try {
        const res = await Promise.all(promiseArr)

        res.map(promiseRes => {
          if (promiseRes.msg !== "success") {
            this.props.dispatch(
              newSnackbar(
                WARNING_SNACK,
                `Couldn't fetch information about all related identities.`,
                MID_LENGTH_ALERT
              )
            );
          } else {
            idMap[promiseRes.result.identity.identityaddress] = promiseRes.result
          }
        })

        this.setState({ loadingIdMap: false, idMap })
      } catch (e) {
        this.props.dispatch(newSnackbar(ERROR_SNACK, err.message))
      }
      
      this.props.setLock(false)
    })
  }

  selectOption(address, option) {
    if (option === this.COPY) copyDataToClipboard(address)
    else if (option === this.FIND_ID) { 
      this.props.setLock(true)

      getIdentity(NATIVE, this.props.activeCoin.id, address)
      .then(res => {    
        this.props.setLock(false)

        if (res.msg === "success") {
          this.props.openIdentity(res.result, this.props.activeCoin.id) 
        } else {
          this.props.dispatch(newSnackbar(ERROR_SNACK, res.result))
        }
      })
      .catch(err => {
        this.props.setLock(false)
        this.props.dispatch(newSnackbar(ERROR_SNACK, err.message))
      })
    } else if (option === this.FIND_CURRENCY) {
      this.props.setLock(true)

      getCurrency(NATIVE, this.props.activeCoin.id, address)
      .then(res => {    
        this.props.setLock(false)

        if (res.msg === "success") {
          this.props.openCurrency(res.result, this.props.activeCoin.id) 
        } else {
          this.props.dispatch(newSnackbar(ERROR_SNACK, res.result))
        }
      })
      .catch(err => {
        this.props.setLock(false)
        this.props.dispatch(newSnackbar(ERROR_SNACK, err.message))
      })
    }
  }

  render() {
    return IdentityCardRender.call(this)
  }
}

IdentityCard.propTypes = {
  verusId: PropTypes.object.isRequired,
  initialTab: PropTypes.string
};

export default IdentityCard