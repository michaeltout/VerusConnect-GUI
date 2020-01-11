import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ObjectToTable from '../../../../containers/ObjectToTable/ObjectToTable'
import { ENTER_DATA } from '../../../../util/constants/componentConstants';
import SuggestionInput from '../../../../containers/SuggestionInput/SuggestionInput'

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
  const { state, updateInput, props } = this
  const { name, referralId, formErrors } = state
  const { identities } = props

  return (
    <React.Fragment>
      <TextField
        error={ formErrors.name.length > 0 }
        helperText={ formErrors.name ? formErrors.name[0] : null }
        label="Enter name to reserve"
        variant="outlined"
        onChange={updateInput}
        name="name"
        value={name}
        style={{ marginTop: 5, width: "100%" }}
      />
      <SuggestionInput 
        value={referralId}
        name="referralId"
        error={ formErrors.referralId.length > 0 }
        helperText={ formErrors.referralId ? formErrors.referralId[0] : null }
        items={identities.map(id => `${id.identity.name}@`)}
        label="Enter referral identity (optional)"
        onChange={updateInput}
        containerStyle={{ marginTop: 5, width: "75%" }}
      />
    </React.Fragment>
  )
}


