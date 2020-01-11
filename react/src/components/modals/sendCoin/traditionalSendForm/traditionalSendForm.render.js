import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import ObjectToTable from '../../../../containers/ObjectToTable/ObjectToTable'
import { ENTER_DATA } from '../../../../util/constants/componentConstants';

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
  const { state, updateInput } = this
  const { sendTo, amount, memo, formErrors } = state
  return (
    <React.Fragment>
      {TraditionalSendAddressDropdownRender.call(this)}
      <TextField
        error={ formErrors.sendTo.length > 0 }
        helperText={ formErrors.sendTo ? formErrors.sendTo[0] : null }
        label="Enter destination address"
        variant="outlined"
        onChange={updateInput}
        name="sendTo"
        value={sendTo}
        style={{ marginTop: 5, width: "100%" }}
      />
      <TextField
        error={ formErrors.amount.length > 0 }
        helperText={ formErrors.amount ? formErrors.amount[0] : null }
        label="Enter send amount"
        value={amount}
        onChange={updateInput}
        variant="outlined"
        type="number"
        name="amount"
        style={{ marginTop: 5, width: "75%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              onClick={ this.setSendAmountAll }
              position="end"
            >
              <Button onClick={() => {return 0}}>{"ALL"}</Button>
            </InputAdornment>
          )
        }}
      />
      {sendTo && sendTo[0] && sendTo[0] === 'z' && 
        <TextField
          label="Enter memo"
          variant="outlined"
          onChange={updateInput}
          name="memo"
          value={memo}
          style={{ marginTop: 5, width: "100%" }}
        />
      }
    </React.Fragment>
  )
}

export const TraditionalSendAddressDropdownRender = function() {
  return (
    <Autocomplete
      options={this.state.addressList}
      getOptionLabel={option => option.label}
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
        return (
          <h1
            className="d-lg-flex align-items-lg-center"
            style={{ marginBottom: 0, fontSize: 16 }}>
            {option.label}
          </h1>
        );
      }}
    />
  )
}


