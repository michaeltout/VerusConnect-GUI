import React from 'react';
import CustomButton from '../../../containers/CustomButton/CustomButton';

export const ImportWalletRender = function() {
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
        {`Select your wallet backup file to add it to your current wallet.`}
      </h1>
      <input type="file" id="avatar" onChange={this.setFilename} />
      <CustomButton
        onClick={this.importWallet}
        title={"Import"}
        backgroundColor={"rgb(49, 101, 212)"}
        textColor={"white"}
        disabled={
          this.state.filename == null || this.state.filename.length === 0 || this.state.loading
        }
        buttonProps={{
          style: {
            marginTop: 20,
            visibility: this.state.filename ? "unset" : "hidden",
          },
        }}
      />
    </div>
  );
}


