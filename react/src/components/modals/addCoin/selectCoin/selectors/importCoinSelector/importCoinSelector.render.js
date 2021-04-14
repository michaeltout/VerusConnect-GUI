import React from "react";

export const ImportCoinSelectorRender = function() {
  return (
    <React.Fragment>
      <h1
        style={{
          margin: 0,
          paddingBottom: 40,
          fontSize: 20,
          color: "rgb(0,0,0)",
        }}
      >
        {"Enter a coin file to add (this should be provided to you)"}
      </h1>
      <input type="file" id="coin_upload" style={{paddingLeft: '15%'}} onChange={this.setFiles} />
    </React.Fragment>
  )
}