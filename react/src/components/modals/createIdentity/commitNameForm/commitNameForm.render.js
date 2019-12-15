import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ObjectToTable from '../../../../containers/ObjectToTable/ObjectToTable'
import { ENTER_DATA } from '../../../../util/constants/componentConstants';

export const CommitNameFormRender = function() {
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
      { this.props.formStep === ENTER_DATA ? CommitNameFormEnterRender.call(this) : CommitNameTxDataRender.call(this) }
    </div>
  );
}

export const CommitNameTxDataRender = function() {
  return (
    <ObjectToTable 
      dataObj={ this.state.txDataDisplay }
      pagination={ false }
      paperStyle={{ width: "100%" }}
    /> 
  )
}

export const CommitNameFormEnterRender = function() {
  const { state, updateInput } = this
  const { name, referralId, formErrors } = state
  return (
    <React.Fragment>
      <TextField
        error={ formErrors.name.length > 0 }
        helperText={ formErrors.name ? formErrors.name[0] : null }
        label="Enter name to reserve..."
        variant="outlined"
        onChange={updateInput}
        name="name"
        value={name}
        style={{ marginTop: 5, width: "100%" }}
      />
      {CommitNameAddressDropdownRender.call(this)}
      <TextField
        error={ formErrors.referralId.length > 0 }
        helperText={ formErrors.referralId ? formErrors.referralId[0] : null }
        label="Enter referral identity (optional)..."
        variant="outlined"
        onChange={updateInput}
        name="referralId"
        value={referralId}
        style={{ marginTop: 5, width: "75%" }}
      />
    </React.Fragment>
  )
}

export const CommitNameAddressDropdownRender = function() {
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
}


