import React from 'react';
import CustomButton from '../../../containers/CustomButton/CustomButton';

export const ExportToCsvRender = function() {
  return (
    <div
      className="col-xs-12 margin-top-20 backround-gray"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "10%",
      }}
    >
      <h1
        style={{
          margin: 0,
          paddingBottom: 40,
          fontSize: 20,
          color: "rgb(0,0,0)",
        }}
      >
        {"Select where to save CSV"}
      </h1>
      <input
        style={{ paddingLeft: "23%" }}
        directory=""
        webkitdirectory=""
        type="file"
        onChange={this.selectDirectory}
      />
      <CustomButton
        onClick={this.exportToCsv}
        title={"Export Transactions"}
        backgroundColor={"rgb(78,115,223)"}
        textColor={"white"}
        buttonProps={{
          style: {
            marginTop: 40,
            visibility: this.state.dirName ? "unset" : "hidden",
          },
        }}
      />
    </div>
  );
}


