import React from 'react';
import TextField from "@material-ui/core/TextField";
import { ENTER_DATA, TEXT_DATA, FILE_DATA } from '../../../../util/constants/componentConstants';
import { DropzoneArea } from 'material-ui-dropzone'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

export const VerifyIdDataFormRender = function() {
  const { formStep } = this.props
  const { dataType } = this.state
  return (
    <div
      className="col-xs-12 backround-gray"
      style={{
        width: "100%",
        height: dataType === FILE_DATA ? "100%" : "85%",
        display: "flex",
        justifyContent: formStep === ENTER_DATA ? "space-evenly" : "center",
        alignItems: formStep === ENTER_DATA ? "flex-start" : "unset",
        marginBottom: formStep === ENTER_DATA ? 0 : 20,
        flexDirection: "column",
        overflowY: "scroll"
      }}
    >
      { this.props.formStep === ENTER_DATA ? VerifyIdDataFormEnterRender.call(this) : VerifyIdSigDataRender.call(this) }
    </div>
  );
}

export const VerifyIdSigDataRender = function() {
  const { verified } = this.state

  return (
    <div
      style={{
        color: verified ? "rgb(0,178,26)" : "rgb(236,43,43)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{ fontSize: 75 }}>
        {verified && <CheckCircleIcon fontSize={"inherit"} color={"inherit"} />}
        {!verified && <CancelIcon fontSize={"inherit"} color={"inherit"} />}
      </div>
      <div style={{ fontSize: 25, fontWeight: "bold" }}>{verified ? "Signature verified!" : "Signature failed to verify."}</div>
    </div>
  );
}

export const VerifyIdDataFormEnterRender = function() {
  const { state, updateInput, setDataType, setFiles } = this
  const { address, message, signature, dataType, formErrors, fileName } = state;
  const isFile = dataType === FILE_DATA

  return (
    <React.Fragment>
      <FormControl variant="outlined" style={{ width: 250 }}>
        <InputLabel>{"Data Type"}</InputLabel>
        <Select value={isFile ? 1 : 0} onChange={setDataType} labelWidth={75}>
          <MenuItem value={0}>{"Verify Message/Text"}</MenuItem>
          <MenuItem value={1}>{"Verify File"}</MenuItem>
          <MenuItem value={2}>{"Verify Hash"}</MenuItem>
        </Select>
      </FormControl>
      {isFile && (
        <React.Fragment>
          <TextField
            error={formErrors.fileName.length > 0}
            label="Enter file path or select below"
            variant="outlined"
            multiline
            rowsMax={10}
            onChange={updateInput}
            name="fileName"
            value={fileName}
            style={{ marginTop: 5, width: "100%" }}
          />
          <DropzoneArea
            onChange={setFiles}
            filesLimit={1}
            dropzoneText={"Drop a file to verify or click"}
            maxFileSize={Infinity}
            showFileNames={true}
            getDropRejectMessage={() => {return "File rejected by file picker, try entering the file path manually."}}
            acceptedFiles={[
              "audio/*",
              "video/*",
              "image/*",
              "application/*",
              "text/*",
              "font/*",
              "model/*",
              ".dmg",
              ".s",
              ".cpp",
              ".sh",
              ".bat",
              ".zip",
              ".7z",
              ".tar.gz",
              ".rar",
              ".AppImage"
            ]}
          />
        </React.Fragment>
      )}
      {!isFile && (
        <TextField
          error={formErrors.message.length > 0}
          helperText={
            formErrors.message.length > 0
              ? formErrors.message[0]
              : (dataType === TEXT_DATA ? "Enter a message to verify." : "Enter a hash to verify.")
          }
          label={dataType === TEXT_DATA ? "Enter message" : "Enter hash"}
          variant="outlined"
          multiline
          rowsMax={10}
          onChange={updateInput}
          name="message"
          value={message}
          style={{ marginTop: 5, width: "100%" }}
        />
      )}
      <TextField
        error={formErrors.address.length > 0}
        helperText={
          formErrors.address.length > 0
            ? formErrors.address[0]
            : "Enter the identity or address that signed the data above."
        }
        label="Enter identity or address"
        variant="outlined"
        onChange={updateInput}
        name="address"
        value={address}
        style={{ marginTop: 5, width: "100%" }}
      />
      <TextField
        error={formErrors.signature.length > 0}
        helperText={
          formErrors.signature.length > 0
            ? formErrors.signature[0]
            : "Enter the signature created by the above data and address."
        }
        label="Enter signature"
        variant="outlined"
        onChange={updateInput}
        name="signature"
        value={signature}
        style={{ marginTop: 5, width: "100%" }}
      />
    </React.Fragment>
  );
}


