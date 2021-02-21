import React from 'react';
import CustomButton from '../../../containers/CustomButton/CustomButton';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
        {`Select where to save CSV (${this.props.transactions.length} transactions)`}
      </h1>
      <Button
        variant="contained"
        onClick={this.exportToCsv}
        size="large"
        color="primary"
        disabled={this.state.loading}
      >
        {"Select Directory"}
      </Button>
      {this.state.dirName != null && (
        <Typography style={{ marginTop: 20 }}>{this.state.dirName}</Typography>
      )}
      <CustomButton
        onClick={this.exportToCsv}
        title={"Export Transactions"}
        backgroundColor={"rgb(49, 101, 212)"}
        textColor={"white"}
        buttonProps={{
          style: {
            marginTop: 20,
            visibility: this.state.dirName ? "unset" : "hidden",
          },
        }}
      />
    </div>
  );
}


