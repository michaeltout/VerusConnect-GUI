import React from "react";
import WalletPaper from '../WalletPaper/WalletPaper'

export const MigrationHelperRender = function() {
  return (
    <WalletPaper
      style={{
        marginBottom: 16,
        padding: 8,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <a
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
          color: "rgb(78,115,223)",
        }}
        href={"#"}
        onClick={() => this.openClaimDialog()}
      >
        {`You have ${this.state.amount} ${this.props.coin} available to claim! Click here to claim.`}
      </a>
    </WalletPaper>
  );
};
