import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import ObjectToTable from '../../../../containers/ObjectToTable/ObjectToTable'
import { ENTER_DATA } from '../../../../util/constants/componentConstants';
import CustomCheckbox from '../../../../containers/CustomCheckbox/CustomCheckbox';
import { FormControlLabel, Typography, IconButton, Tooltip } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { normalizeNum } from '../../../../util/displayUtil/numberFormat';
import InfoIcon from '@material-ui/icons/Info';

export const TraditionalSendFormRender = function() {
  const { formStep } = this.props
  return (
    <div
      className="col-xs-12 backround-gray"
      style={{
        width: "100%",
        height: "85%",
        display: "flex",
        justifyContent: formStep === ENTER_DATA ? "space-evenly" : "center",
        alignItems: formStep === ENTER_DATA ? "flex-start" : "unset",
        marginBottom: formStep === ENTER_DATA ? 0 : 20,
        flexDirection: "column",
        overflowY: "scroll"
      }}
    >
      { this.props.formStep === ENTER_DATA ? TraditionalSendFormEnterRender.call(this) : TraditionalSendTxDataRender.call(this) }
    </div>
  );
}

export const TraditionalSendTxDataRender = function() {
  return (
    <ObjectToTable 
      dataObj={ this.state.txDataDisplay }
      pagination={ false }
      paperStyle={{ width: "100%" }}
    /> 
  )
}

export const TraditionalSendFormEnterRender = function() {
  const { state, updateInput, props } = this
  const { isConversion, conversionGraph } = props
  const {
    sendTo,
    amount,
    memo,
    mint,
    formErrors,
    fromCurrencyInfo,
    convertingTo,
    convertingFrom,
    fromCurrencyConversion,
    toCurrencyConversion
  } = state;
  let conversionRounded = false

  let conversion =
    isConversion && amount != null && !isNaN(Number(amount))
      ? convertingTo
        ? fromCurrencyConversion.price * Number(amount)
        : convertingFrom
        ? Number(amount) / toCurrencyConversion.price
        : null
      : null;
  
  let displayConversion = conversion
  
  if (conversion != null) {
    const priceNormalized = normalizeNum(conversion, 8)

    if (conversion !== priceNormalized[0]) {
      displayConversion = `${priceNormalized[0]}${priceNormalized[2]}`
      conversionRounded = true
    }
  }

  return (
    <React.Fragment>
      {isConversion && conversionGraph != null
        ? ConversionOptionsRender.call(this)
        : null}
      {!mint ? TraditionalSendAddressDropdownRender.call(this) : null}
      <TextField
        error={formErrors.sendTo.length > 0}
        helperText={formErrors.sendTo ? formErrors.sendTo[0] : null}
        label="Enter destination address"
        variant="outlined"
        onChange={updateInput}
        name="sendTo"
        value={sendTo}
        style={{ marginTop: 5, width: "100%" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          error={formErrors.amount.length > 0}
          helperText={formErrors.amount ? formErrors.amount[0] : null}
          label="Enter send amount"
          value={amount}
          onChange={updateInput}
          variant="outlined"
          type="number"
          name="amount"
          style={{ marginTop: 5, minWidth: "57%", flex: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment onClick={this.setSendAmountAll} position="end">
                <Button
                  onClick={() => {
                    return 0;
                  }}
                >
                  {"ALL"}
                </Button>
              </InputAdornment>
            ),
          }}
        />
        {conversion != null && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "43%",
              flex: 1,
              alignItems: "center"
            }}
          >
            <Typography
              style={{
                color: "gray",
                textAlign: "left",
                paddingLeft: 8,
              }}
            >
              {fromCurrencyConversion.name}
            </Typography>
            <Typography style={{ color: "gray", textAlign: "center", paddingRight: 8, paddingLeft: 8 }}>
              {conversionRounded ? "≈" : "="}
            </Typography>
            <Typography
              style={{
                color: "gray",
                textAlign: "right",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {`${displayConversion} ${toCurrencyConversion.name}`}
            </Typography>
            <Tooltip title={'All price estimations are based on the latest conversion price. The actual conversion result calculated at the time of conversion and will likely differ.'}>
              <span style={{ marginLeft: 8 }}>
                <InfoIcon color='primary'/>
              </span>
            </Tooltip>
          </div>
        )}
      </div>
      {sendTo && sendTo[0] && sendTo[0] === "z" && (
        <TextField
          label="Enter memo"
          variant="outlined"
          onChange={updateInput}
          name="memo"
          value={memo}
          style={{ marginTop: 5, width: "100%" }}
        />
      )}
      {fromCurrencyInfo != null && fromCurrencyInfo.mintable && !isConversion && (
        <FormControlLabel
          control={
            <CustomCheckbox
              checkboxProps={{
                checked: mint,
                onChange: () => {
                  this.setAndUpdateState({ mint: !this.state.mint });
                },
              }}
              colorChecked="rgb(78,115,223)"
              colorUnchecked="rgb(78,115,223)"
            />
          }
          label="Fund this transaction by minting new coins."
        />
      )}
    </React.Fragment>
  );
}

export const TraditionalSendAddressDropdownRender = function() {
  return (
    <Autocomplete
      key={this.state.fromDropdownKey}
      options={this.state.addressList}
      getOptionLabel={option => {
        const balance = this.getBalance(option.address, this.state.displayCurrency)

        return (`${option.label} (${balance == null ? '-' : balance} ${this.state.displayCurrency})`);
      }}
      style={{ marginTop: 5, width: "100%" }}
      value={this.state.sendFrom}
      disableClearable={true}
      onChange={(e, value) => this.updateSendFrom(value)}
      renderInput={params => (
        <TextField
          error={ this.state.formErrors.sendFrom.length > 0 }
          helperText={ this.state.formErrors.sendFrom ? this.state.formErrors.sendFrom[0] : null }
          {...params}
          label="Select from location"
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={option => {
        const balance = this.getBalance(option.address, this.state.displayCurrency)

        return (
          <h1
            className="d-lg-flex align-items-lg-center"
            style={{ marginBottom: 0, fontSize: 16 }}>
            {`${option.label} (${balance == null ? '-' : balance} ${this.state.displayCurrency})`}
          </h1>
        );
      }}
    />
  )
}

export const ConversionOptionsRender = function() {
  const { conversionGraph, currencyInfo } = this.props
  const {
    fromCurrencyConversion,
    toCurrencyConversion,
    convertingFrom,
    convertingTo
  } = this.state;  

  const toBalance = this.getBalance(null, toCurrencyConversion.name)
  const fromBalance = this.getBalance(null, fromCurrencyConversion.name)
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Autocomplete
        options={conversionGraph.from}
        getOptionLabel={(option) => option.name}
        style={{ marginTop: 5, width: "100%" }}
        value={fromCurrencyConversion}
        disableClearable={true}
        disabled={
          (conversionGraph.from.length == 0 ||
          !currencyInfo.spendableTo ||
          convertingFrom) ? true : false
        }
        onChange={(e, value) => this.updateCurrencyConversion(value, true)}
        renderInput={(params) => (
          <TextField
            //error={this.state.formErrors.sendFrom.length > 0}
            helperText={`Balance - ${fromBalance == null ? "-" : fromBalance} ${
              fromCurrencyConversion.name
            }`}
            {...params}
            label="Source"
            variant="outlined"
            fullWidth
          />
        )}
        /*renderOption={(option) => {
          return (
            <h1
              className="d-lg-flex align-items-lg-center"
              style={{ marginBottom: 0, fontSize: 16 }}
            >
              {option.label}
            </h1>
          );
        }}*/
      />
      <div>
        <IconButton
          style={{ marginLeft: 60, marginRight: 60 }}
          onClick={this.flipConversion}
          disabled={this.state.toCurrencyInfo.preConvert ? true : false}
        >
          <ArrowForwardIcon fontSize="large" />
        </IconButton>
        <Typography
          style={{ color: "gray", fontSize: 12, textAlign: "center" }}
        >
          {convertingTo && fromCurrencyConversion.price
            ? `* ${Number(fromCurrencyConversion.price.toFixed(8))} =`
            : convertingFrom && toCurrencyConversion.price
            ? `÷ ${Number(toCurrencyConversion.price.toFixed(8))} =`
            : null}
        </Typography>
      </div>
      <Autocomplete
        options={conversionGraph.to}
        getOptionLabel={(option) => option.name}
        style={{ marginTop: 5, width: "100%" }}
        value={toCurrencyConversion}
        disableClearable={true}
        disabled={
          (conversionGraph.to.length == 0 ||
          !currencyInfo.spendableFrom ||
          convertingTo) ? true : false
        }
        onChange={(e, value) => this.updateCurrencyConversion(value, false)}
        renderInput={(params) => (
          <TextField
            //error={this.state.formErrors.sendFrom.length > 0}
            helperText={`Balance - ${toBalance == null ? "-" : toBalance} ${
              toCurrencyConversion.name
            }`}
            {...params}
            label="Destination"
            variant="outlined"
            fullWidth
          />
        )}
        /*renderOption={(option) => {
          return (
            <h1
              className="d-lg-flex align-items-lg-center"
              style={{ marginBottom: 0, fontSize: 16 }}
            >
              {option.label}
            </h1>
          );
        }}*/
      />
    </div>
  );
}


