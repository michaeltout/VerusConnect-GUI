import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import WalletPaper from '../WalletPaper/WalletPaper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AsyncAutoComplete from '../AsyncAutoComplete/AsyncAutoComplete';

function OfferSide(props) {
  const { setData, updateData, data, locked, title, getIdentities, getCurrencies, freeIdentity } =
    props;

  const switchType = (isCurrency) => {
    setData({
      amount: "",
      identity: "",
      currency: "",
      isCurrency
    })
  };
  
  return (
    <WalletPaper
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        marginTop: 8,
      }}
      square={false}
    >
      <h5
        style={{
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {title}
      </h5>
      <div style={{ display: "flex", marginTop: 8 }}>
        <FormControl variant="outlined" style={{ flex: 1, marginRight: 4 }}>
          <InputLabel>{"Type"}</InputLabel>
          <Select
            value={data.isCurrency}
            onChange={(e) => switchType(e.target.value)}
            labelWidth={40}
            disabled={locked}
          >
            <MenuItem value={true}>{"Currency"}</MenuItem>
            <MenuItem value={false}>{"Identity"}</MenuItem>
          </Select>
        </FormControl>
        {data.isCurrency ? (
          <React.Fragment>
            <TextField
              label="Amount"
              variant="outlined"
              type="number"
              onChange={(e) => updateData("amount", e.target.value)}
              value={data.amount}
              style={{ flex: 1, marginRight: 4 }}
              disabled={locked}
            />
            <AsyncAutoComplete
              label="Currency"
              onChange={(e, x) => updateData("currency", x.value)}
              style={{ flex: 1 }}
              disabled={locked}
              getOptions={getCurrencies != null ? getCurrencies : () => []}
            />
          </React.Fragment>
        ) : (locked || freeIdentity) ? (
          <TextField
            label="Identity"
            variant="outlined"
            value={data.identity}
            style={{ flex: 1 }}
            onChange={(e) => updateData("identity", e.target.value)}
            disabled={locked}
          />
        ) : (
          <AsyncAutoComplete
            label="Identity"
            onChange={(e, x) => updateData("identity", x.value)}
            style={{ flex: 1 }}
            getOptions={getIdentities != null ? getIdentities : () => []}
          />
        )}
      </div>
    </WalletPaper>
  );
}

OfferSide.propTypes = {
  data: PropTypes.shape({
    isCurrency: PropTypes.bool,
    amount: PropTypes.string,
    currency: PropTypes.string,
    identity: PropTypes.string
  }).isRequired,
  updateData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  locked: PropTypes.bool,
  title: PropTypes.string.isRequired,
  getIdentities: PropTypes.func,
  getCurrencies: PropTypes.func,
  freeIdentity: PropTypes.bool
};

export default OfferSide