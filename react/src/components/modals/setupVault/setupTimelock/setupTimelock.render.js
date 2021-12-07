import React from "react";
import TextField from "@material-ui/core/TextField";
import { LOCK_UNTIL_HEIGHT } from "../../../../util/constants/componentConstants";
import CustomButton from '../../../../containers/CustomButton/CustomButton';

export const SetupTimelockRender = function() {  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
      }}>
      {SetupTimelockForm.call(this)}
    </div>
  );
};

export const SetupTimelockForm = function() {
  return (
    <React.Fragment>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
        }}
      >
        <TextField
          helperText={
            this.props.selectedLockType === LOCK_UNTIL_HEIGHT
              ? "This is the blockheight that your locked ID will automatically unlock at"
              : "This number + 20 is the number of blocks it will take for your ID to unlock after you start the unlock process"
          }
          label={
            this.props.selectedLockType === LOCK_UNTIL_HEIGHT ? "Unlock height" : "Unlock delay"
          }
          value={this.props.setupVaultParams.timelock}
          onChange={(e) => this.props.setSetupVaultParams({ timelock: e.target.value })}
          variant="outlined"
          type="number"
          style={{ flex: 1 }}
        />
      </div>
      <CustomButton
        title={"Lock"}
        backgroundColor={"rgb(49, 101, 212)"}
        textColor={"white"}
        buttonProps={{
          size: "large",
          color: "default",
          style: { height: 58, width: "90%" },
        }}
        disabled={
          this.props.setupVaultParams.timelock.length == null ||
          this.props.setupVaultParams.timelock.length == 0
        }
        onClick={this.props.submit}
      />
    </React.Fragment>
  );
}