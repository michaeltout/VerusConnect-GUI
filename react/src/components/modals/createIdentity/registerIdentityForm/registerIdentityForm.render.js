import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ObjectToTable from '../../../../containers/ObjectToTable/ObjectToTable'
import { ENTER_DATA } from '../../../../util/constants/componentConstants';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

export const RegisterIdentityFormRender = function() {
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
      { this.props.formStep === ENTER_DATA ? RegisterIdentityFormEnterRender.call(this) : RegisterIdentityTxDataRender.call(this) }
    </div>
  );
}

export const RegisterIdentityTxDataRender = function() {
  return (
    <ObjectToTable 
      dataObj={ this.state.txDataDisplay }
      pagination={ false }
      paperStyle={{ width: "100%" }}
    /> 
  )
}

export const RegisterIdentityFormEnterRender = function() {
  const { state, updateInput } = this
  const { revocationId, recoveryId, privateAddr, formErrors } = state;
  return (
    <React.Fragment>
      <TextField
        error={formErrors.revocationId.length > 0}
        helperText={
          formErrors.revocationId.length > 0
            ? formErrors.revocationId[0]
            : "The ID entered here will be able to disable your created ID in case of loss or theft."
        }
        label="Enter revocation ID"
        variant="outlined"
        onChange={updateInput}
        name="revocationId"
        value={revocationId}
        style={{ marginTop: 5, width: "100%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              onClick={ this.setRevokeSelf }
              position="end"
            >
              <Button>{"SELF"}</Button>
            </InputAdornment>
          )
        }}
      />
      <TextField
        error={formErrors.recoveryId.length > 0}
        helperText={
          formErrors.recoveryId.length > 0
            ? formErrors.recoveryId[0]
            : "The ID entered here will be able to revive your created ID if it is revoked."
        }
        label="Enter recovery ID"
        variant="outlined"
        onChange={updateInput}
        name="recoveryId"
        value={recoveryId}
        style={{ marginTop: 5, width: "100%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              onClick={ this.setRecoverSelf }
              position="end"
            >
              <Button>{"SELF"}</Button>
            </InputAdornment>
          )
        }}
      />
      <TextField
        error={formErrors.privateAddr.length > 0}
        helperText={
          formErrors.privateAddr.length > 0
            ? formErrors.privateAddr[0]
            : "The private address here will be used to receive private transactions to your ID."
        }
        label="Enter private address"
        variant="outlined"
        onChange={updateInput}
        name="privateAddr"
        value={privateAddr}
        style={{ marginTop: 5, width: "100%" }}
      />
    </React.Fragment>
  );
}

/*export const RegisterIdentityAddressDropdownRender = function() {
  return (
    <Autocomplete
      options={this.state.addressList}
      getOptionLabel={option => option.label}
      style={{ marginTop: 5, width: "100%" }}
      value={this.state.controlAddr}
      disableClearable={true}
      onChange={(e, value) => this.updateControlAddr(value)}
      renderInput={params => (
        <TextField
          error={ this.state.formErrors.controlAddr.length > 0 }
          helperText={ this.state.formErrors.controlAddr ? this.state.formErrors.controlAddr[0] : null }
          {...params}
          label="Select address to register name with..."
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
}*/


