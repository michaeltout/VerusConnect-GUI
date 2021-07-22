import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getSimpleCoinArray } from "../../../../../../util/coinData";
import { CHAIN_FALLBACK_IMAGE } from "../../../../../../util/constants/componentConstants";

export const DefaultCoinSelectorRender = function() {
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
        {"Choose coin to add"}
      </h1>
      <Autocomplete
        options={getSimpleCoinArray()}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        value={this.props.selectedCoin}
        onChange={(e, value) => this.selectCoin(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add Coin"
            variant="outlined"
            fullWidth
          />
        )}
        renderOption={(option) => {
          return (
            <h1
              className="d-lg-flex align-items-lg-center"
              style={{ marginBottom: 0, fontSize: 16 }}
            >
              <img
                src={`assets/images/cryptologo/${option.protocol.toLowerCase()}/${option.id.toLowerCase()}.png`}
                width="20px"
                height="20px"
                style={{ marginRight: 5, marginBottom: 2 }}
                onError={(e) => {
                  e.target.src = CHAIN_FALLBACK_IMAGE;
                }}
              />
              {option.name}
            </h1>
          );
        }}
      />
    </React.Fragment>
  );
}