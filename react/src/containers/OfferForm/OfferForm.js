import React from 'react';
import PropTypes from 'prop-types';
import OfferSide from './OfferSide';
import AsyncAutoComplete from '../AsyncAutoComplete/AsyncAutoComplete';
import CustomButton from '../CustomButton/CustomButton';
import { closeTextDialog, openTextDialog } from '../../actions/actionDispatchers';
import TextField from '@material-ui/core/TextField';

function openCloseOfferModal(onSubmit) {
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
          onSubmit();
        },
      },
    ],
    `Are you sure you would like to make this offer?`,
    "Make offer?"
  );
}

function OfferTable(props) {
  const [offerData, setOfferData] = React.useState(
    props.lockOffer
      ? props.lockOffer
      : {
          isCurrency: true,
          amount: "",
          currency: "",
          identity: ""
        }
  );
  const [forData, setForData] = React.useState(
    props.lockFor
      ? props.lockFor
      : {
          isCurrency: true,
          amount: "",
          currency: "",
          identity: ""
        }
  );
  const [changeAddr, setChangeAddr] = React.useState("");
  const [destinationAddr, setDestinationAddr] = React.useState("");
  const [expiry, setExpiry] = React.useState("");

  React.useEffect(() => {
    if (props.lockOffer != null) {
      setOfferData(props.lockOffer);
    }
  }, [props.lockOffer]);

  React.useEffect(() => {
    if (props.lockFor != null) {
      setForData(props.lockFor);
    }
  }, [props.lockFor]);

  const updateOfferData = (key, value) => {
    setOfferData({...offerData, [key]: value})
  }

  const updateForData = (key, value) => {
    setForData({...forData, [key]: value})
  }

  const getFormattedIdentities = async () => {
    return (await props.getIdentities()).map(id => {
      return {
        name: `${id.identity.name}@`,
        value: id.identity.identityaddress
      }
    })
  }

  const getFormattedCurrencies = async () => {
    return (await props.getCurrencies()).map(currency => {
      return {
        name: currency.fullyqualifiedname,
        value: currency.fullyqualifiedname
      }
    })
  }

  const getFormattedAddrs = async (isChange) => {
    return (await props.getAddrs())
      .filter((x) => (!isChange && forData.isCurrency && x.tag === "sapling") || x.tag === "public")
      .map((x) => {
        return {
          name: x.address,
          value: x.address,
        };
      });
  };

  const canSubmit = () => {
    if (changeAddr.length == 0 || destinationAddr.length == 0) return false;

    if (offerData.isCurrency && offerData.amount.length == 0 && offerData.identity.length == 0) {
      return false;
    }

    if (forData.isCurrency && forData.amount.length == 0 && forData.identity.length == 0) {
      return false;
    }

    if (!offerData.isCurrency && offerData.identity.length == 0) {
      return false;
    }

    if (!forData.isCurrency && forData.identity.length == 0) {
      return false;
    }

    return true;
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <OfferSide
        data={props.lockOffer ? props.lockOffer : offerData}
        updateData={updateOfferData}
        setData={setOfferData}
        locked={props.lockOffer != null}
        title="Offer"
        getIdentities={getFormattedIdentities}
        getCurrencies={getFormattedCurrencies}
      />
      <OfferSide
        data={props.lockFor ? props.lockFor : forData}
        updateData={updateForData}
        setData={setForData}
        locked={props.lockFor != null}
        title="For"
        getIdentities={getFormattedIdentities}
        getCurrencies={getFormattedCurrencies}
        freeIdentity
      />
      <div style={{ flex: 1, display: "flex", marginTop: 8 }}>
        <AsyncAutoComplete
          label="Change Address"
          onChange={(e, x) => setChangeAddr(x.value)}
          style={{ flex: 2 }}
          getOptions={() => getFormattedAddrs(true)}
        />
        <TextField
          label="Expiry Height"
          variant="outlined"
          type="number"
          onChange={(e) => setExpiry(e.target.value)}
          style={{ flex: 1, marginLeft: 4 }}
        />
      </div>
      <AsyncAutoComplete
        label="Receiving Address"
        onChange={(e, x) => setDestinationAddr(x.value)}
        style={{ flex: 1, marginTop: 8 }}
        getOptions={getFormattedAddrs}
      />
      <CustomButton
        title={"Make offer"}
        textColor={"white"}
        buttonProps={{
          size: "large",
          color: "default",
          style: { width: "100%", height: 58, marginTop: 8 },
        }}
        onClick={() =>
          openCloseOfferModal(() =>
            props.onSubmit(offerData, forData, changeAddr, destinationAddr, expiry)
          )
        }
        disabled={!canSubmit()}
      />
    </div>
  );
}

OfferTable.propTypes = {
  getIdentities: PropTypes.func.isRequired,
  getAddrs: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  lockOffer: PropTypes.shape({
    isCurrency: PropTypes.bool,
    amount: PropTypes.string,
    currency: PropTypes.string,
    identity: PropTypes.string
  }),
  lockFor: PropTypes.shape({
    isCurrency: PropTypes.bool,
    amount: PropTypes.string,
    currency: PropTypes.string,
    identity: PropTypes.string
  })
};

export default OfferTable;