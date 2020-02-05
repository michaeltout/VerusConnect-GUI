import React from "react";
import {
  MINED_TX,
  MINTED_TX,
  IN_TX,
  IN_TX_ELECTRUM,
  OUT_TX,
  OUT_TX_ELECTRUM,
  SELF_TX,
  STAKE_TX,
  IMMATURE_TX,
  UNKNOWN_TX,
  IMMATURE_BALANCE,
  RESERVE_BALANCE,
  PRIVATE_BALANCE,
  PUBLIC_BALANCE,
  NO_BALANCE,
  UNKNOWN_BALANCE,
  INTEREST_TX
} from "../constants/componentConstants";
import { expandObj } from '../objectUtil'

export const TX_TYPES = {
  [MINED_TX]: (
    <div style={{ minWidth: "max-content" }}>
      <h3
        className="text-uppercase"
        style={{ marginBottom: 0, fontSize: 16, fontWeight: "bold", color: "rgb(0,178,26)" }}>
        <i className="fas fa-caret-right" style={{ paddingRight: 3 }} />
        mined
      </h3>
    </div>
  ),

  [MINTED_TX]: (
    <div style={{ minWidth: "max-content" }}>
      <h3
        className="text-uppercase"
        style={{ marginBottom: 0, fontSize: 16, fontWeight: "bold", color: "rgb(0,178,26)"  }}>
        <i className="fas fa-caret-right" style={{ paddingRight: 3 }} />
        minted
      </h3>
    </div>
  ),

  [IN_TX]: (
    <div style={{ minWidth: "max-content" }}>
      <h3
        className="text-uppercase"
        style={{ marginBottom: 0, fontSize: 16, fontWeight: "bold", color: "rgb(0,178,26)"  }}>
        <i className="fas fa-caret-right" style={{ paddingRight: 3 }} />
        in
      </h3>
    </div>
  ),

  [IN_TX_ELECTRUM]: (
    <div style={{ minWidth: "max-content" }}>
      <h3
        className="text-uppercase"
        style={{ marginBottom: 0, fontSize: 16, fontWeight: "bold", color: "rgb(0,178,26)"  }}>
        <i className="fas fa-caret-right" style={{ paddingRight: 3 }} />
        in
      </h3>
    </div>
  ),

  [OUT_TX]: (
    <div style={{ minWidth: "max-content" }}>
      <h3
        className="text-uppercase"
        style={{ marginBottom: 0, fontSize: 16, fontWeight: "bold", color: "rgb(236,43,43)"  }}>
        <i className="fas fa-caret-left" style={{ paddingRight: 3 }} />
        Out
      </h3>
    </div>
  ),

  [OUT_TX_ELECTRUM]: (
    <div style={{ minWidth: "max-content" }}>
      <h3
        className="text-uppercase"
        style={{ marginBottom: 0, fontSize: 16, fontWeight: "bold", color: "rgb(236,43,43)"  }}>
        <i className="fas fa-caret-left" style={{ paddingRight: 3 }} />
        Out
      </h3>
    </div>
  ),

  [SELF_TX]: (
    <div style={{ minWidth: "max-content" }}>
      <h3
        className="text-uppercase"
        style={{ marginBottom: 0, fontSize: 16, fontWeight: "bold", color: "rgb(78,115,223)"  }}>
        <i className="fas fa-caret-down" style={{ paddingRight: 3 }} />
        self
      </h3>
    </div>
  ),

  [STAKE_TX]: (
    <div style={{ minWidth: "max-content" }}>
      <h3
        className="text-uppercase d-lg-flex align-items-lg-center"
        style={{ marginBottom: 0, fontSize: 16, fontWeight: "bold", color: "rgb(78,115,223)"  }}>
        <i
          className="fas fa-circle"
          style={{ paddingRight: 3, fontSize: 7, paddingBottom: 1 }}
        />
        stake
      </h3>
    </div>
  ),

  [INTEREST_TX]: (
    <div style={{ minWidth: "max-content" }}>
      <h3
        className="text-uppercase d-lg-flex align-items-lg-center"
        style={{ marginBottom: 0, fontSize: 16, fontWeight: "bold", color: "rgb(0,178,26)"  }}>
        <i
          className="fas fa-circle"
          style={{ paddingRight: 3, fontSize: 7, paddingBottom: 1 }}
        />
        interest
      </h3>
    </div>
  ),

  [IMMATURE_TX]: (
    <div style={{ minWidth: "max-content" }}>
      <h3
        className="text-uppercase"
        style={{ marginBottom: 0, fontSize: 16, fontWeight: "bold", color: "rgb(78,115,223)"  }}>
        <i className="fas fa-caret-right" style={{ paddingRight: 3 }} />
        locked
      </h3>
    </div>
  ),

  [UNKNOWN_TX]: (
    <div style={{ minWidth: "max-content" }}>
      <h3
        className="text-uppercase d-lg-flex align-items-lg-center"
        style={{ marginBottom: 0, fontSize: 16, fontWeight: "bold"  }}>
        <i
          className="fas fa-circle"
          style={{ paddingRight: 3, fontSize: 7, paddingBottom: 1 }}
        />
        unknown
      </h3>
    </div>
  )
}

export const renderAffectedBalance = (txObj) => {
  let { type, address, category } = txObj

  // "category" is used on native, while "type" is used for electrum & eth/erc20
  type = type ? type : category

  const affectedBalance = expandObj({
    [`${MINED_TX}, ${MINTED_TX}, ${IMMATURE_TX}, ${STAKE_TX}, ${SELF_TX}`]: PUBLIC_BALANCE,
    [UNKNOWN_TX]: UNKNOWN_BALANCE,
    [`${IN_TX_ELECTRUM}, ${IN_TX}`]: address && address[0] === 'z' ? PRIVATE_BALANCE : PUBLIC_BALANCE, // TODO: Add in checking for PBaaS reserve transactions here
    [`${OUT_TX_ELECTRUM}, ${OUT_TX}`]: PUBLIC_BALANCE // TODO: Add in checking for PBaaS reserve transactions here, test z-z transactions
  })

  const balanceType = affectedBalance[type]

  return (
    <h3
      className="text-capitalize"
      style={{ marginBottom: 0, fontSize: 16, color: "rgb(78,115,223)" }}>
      {balanceType ? (balanceType === PUBLIC_BALANCE ? 'transparent' : balanceType) : UNKNOWN_BALANCE}
    </h3>
  );
}
