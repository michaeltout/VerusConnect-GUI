import React from "react";
import {
  CONFIRMED_BALANCE,
  PRIVATE_BALANCE,
  RECEIVE_COIN,
  TRANSPARENT_BALANCE,
  SEND_COIN,
  IMMATURE_BALANCE,
  API_SUCCESS,
  API_FAILED,
  ID_INFO
} from "../../../../../util/constants/componentConstants";
import { VirtualizedTable } from '../../../../../containers/VirtualizedTable/VirtualizedTable'
import { timeConverter } from '../../../../../util/displayUtil/timeUtils'
import { SortDirection } from 'react-virtualized';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import TransactionCard from "../../../../../containers/TransactionCard/TransactionCard";
import WalletPaper from "../../../../../containers/WalletPaper/WalletPaper";

//TODO: Combine this with HOCs from coinWallet.js

export const IdWalletRender = function() {
  const { coin, activeIdentity, fiatCurrency, multiverseNameMap } = this.props
  const { identityTransactions, spendableBalance } = this.state
  return (
    <div
      className="col-md-8 col-lg-9"
      style={{ padding: 16, width: "80%", overflow: "scroll" }}
    >
      <WalletPaper
        style={{
          marginBottom: 16,
          display: "flex",
          padding: 0,
          border: "none",
          overflowX: 'scroll'
        }}
      >
        <WalletPaper
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            flex: 1
          }}
        >
          <div className="d-flex flex-row justify-content-between">
            <h6 style={{ fontSize: 14, margin: 0, width: "max-content" }}>
              {`${activeIdentity.identity.name}@ ${coin} Balance`}
            </h6>
          </div>
          <div style={{ paddingTop: 5 }}>
            <div className="d-lg-flex justify-content-lg-start">
              <h5
                style={{
                  color: "rgb(0,0,0)",
                  fontSize: 36,
                  fontWeight: "bold"
                }}
              >
                {Number(spendableBalance.crypto.toFixed(8))}
              </h5>
              <h5
                className="d-lg-flex align-items-lg-end"
                style={{
                  color: "rgb(0,0,0)",
                  fontSize: 16,
                  paddingBottom: 5,
                  paddingLeft: 8,
                  fontWeight: "bold"
                }}
              >
                {coin}
              </h5>
            </div>
            <div className="d-lg-flex justify-content-lg-start">
              <h1 style={{ margin: 0, fontSize: 16, color: "rgb(0,0,0)" }}>
                {`${
                  spendableBalance.fiat == null ? "-" : spendableBalance.fiat
                } ${fiatCurrency}`}
              </h1>
            </div>
          </div>
        </WalletPaper>
        <WalletPaper
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            flex: 1
          }}
        >
          <div className="d-flex flex-row justify-content-between">
            <h6 style={{ fontSize: 14, margin: 0, width: "max-content" }}>
              {"ID Information"}
            </h6>
            <button
              className="btn btn-primary border rounded"
              type="button"
              name={ID_INFO}
              onClick={e => this.openModal(e, { activeIdentity })}
              style={{
                fontSize: 14,
                backgroundColor: "rgba(0,178,26,0)",
                borderWidth: 0,
                color: "rgb(133,135,150)",
                borderColor: "rgb(133, 135, 150)",
                fontWeight: "bold"
              }}
            >
              {"ID Info"}
            </button>
          </div>
          <div
            className="d-lg-flex"
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center"
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: 16,
                color: "rgb(0,0,0)",
                overflow: "-webkit-paged-x"
              }}
            >
              {activeIdentity.status !== "active" && (
                <i
                  className="fas fa-exclamation-triangle"
                  style={{
                    marginRight: 6,
                    color: "rgb(236,124,43)",
                    fontSize: 18
                  }}
                />
              )}
              {`Status: ${activeIdentity.status} as of block ${activeIdentity.blockheight}.`}
            </h1>
          </div>
        </WalletPaper>
      </WalletPaper>
      {WalletRenderBalances.call(this)}
      <TransactionCard
        transactions={identityTransactions != null ? identityTransactions : []}
        coin={coin}
        title={`Transactions for ${activeIdentity.identity.name}@`}
        multiverseNameMap={multiverseNameMap}
      />
      {this.props.zOperations && this.props.zOperations.length > 0 && (
        <WalletPaper>
          <h6
            className="card-title"
            style={{ fontSize: 14, margin: 0, width: "max-content" }}
          >
            {"Pending Transaction Log:"}
          </h6>
          {WalletRenderOperations.call(this)}
        </WalletPaper>
      )}
    </div>
  );
};

export const WalletRenderBalances = function() {
  return (
    <WalletPaper
      style={{
        marginBottom: 16,
        backgroundColor: "#ffffff",
        paddingLeft: 8,
        paddingRight: 8,
        overflowX: "scroll",
        display: "flex"
      }}>
      {this.state.walletDisplayBalances.map(balanceObj => {
        const {
          balanceType,
          balanceAddrType,
          balance,
          balanceFiat,
          unusable
        } = balanceObj;
        const { activeIdentity } = this.props

        const balanceTag =
          balanceAddrType === PRIVATE_BALANCE
            ? PRIVATE_BALANCE
            : balanceType === CONFIRMED_BALANCE
            ? TRANSPARENT_BALANCE
            : balanceType === IMMATURE_BALANCE
            ? IMMATURE_BALANCE
            : null;

        return balanceTag == null ? null : (
          <div
            className="flex-grow-1"
            key={Math.random()}
            style={{
              paddingRight: 8,
              paddingLeft: 8,
              maxWidth: "100%",
              minWidth: 216,
              flex: 1
            }}
          >
            <div className="col-lg-12" style={{ padding: 0 }}>
              <div className="card border rounded-0">
                <div className="card-body">
                  <div
                    className="d-flex flex-row justify-content-between"
                    style={{ paddingBottom: 3 }}
                  >
                    <h6
                      className="text-capitalize"
                      style={{
                        fontSize: 14,
                        margin: 0
                      }}
                    >
                      <i
                        className={`far ${
                          balanceTag === PRIVATE_BALANCE
                            ? "fa-eye-slash"
                            : "fa-eye"
                        }`}
                        style={{ paddingRight: 6, color: "rgb(133, 135, 150)" }}
                      />
                      {balanceTag + " Balance"}
                    </h6>
                  </div>
                  <div>
                    <div
                      className="d-lg-flex justify-content-lg-start"
                      style={{ paddingBottom: 3, paddingTop: 3 }}
                    >
                      <h1
                        style={{
                          margin: 0,
                          fontSize: 16,
                          color: "rgb(0, 0, 0)",
                          fontWeight: "bold"
                        }}
                      >
                        {`${balance} ${this.props.coin}`}
                      </h1>
                    </div>
                    <div
                      className="d-lg-flex justify-content-lg-start"
                      style={{ paddingBottom: 3, paddingTop: 3 }}
                    >
                      <h1
                        style={{
                          margin: 0,
                          fontSize: 14
                        }}
                      >
                        {`${balanceFiat} ${this.props.fiatCurrency}`}
                      </h1>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexWrap: "wrap"
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={e =>
                          this.openModal(
                            null,
                            {
                              identity: activeIdentity,
                              balanceTag,
                              fund: false,
                              balance,
                              isMessage: false
                            },
                            SEND_COIN
                          )
                        }
                        disabled={balance === 0 || balance === "-"}
                        style={{
                          backgroundColor: "rgb(236,43,43)",
                          borderColor: "rgb(236,43,43)",
                          borderWidth: 1,
                          fontSize: 18,
                          fontWeight: "bold",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "flex-start",
                          paddingLeft: 8,
                          marginRight: 8,
                          minWidth: 80,
                          marginTop: 8,
                          visibility: unusable ? "hidden" : "unset",
                        }}
                      >
                        <ArrowUpward fontSize='inherit' name={SEND_COIN} />
                        <text style={{ fontSize: 12, marginLeft: 8 }}>Send</text>
                      </button>
                      <button
                        className="btn btn-primary"
                        type="button"
                        name={RECEIVE_COIN}
                        onClick={e =>
                          this.openModal(
                            null,
                            { identity: activeIdentity, balanceTag },
                            RECEIVE_COIN
                          )
                        }
                        style={{
                          backgroundColor: "rgb(0,178,26)",
                          borderColor: "rgb(0,178,26)",
                          fontSize: 18,
                          borderWidth: 1,
                          fontWeight: "bold",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "flex-start",
                          paddingLeft: 8,
                          marginRight: 8,
                          visibility: unusable ? "hidden" : "unset",
                          minWidth: 80,
                          marginTop: 8
                        }}
                      >
                        <ArrowDownward fontSize='inherit' />
                        <text style={{ fontSize: 12, marginLeft: 8 }}>Receive</text>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </WalletPaper>
  );
};

export const WalletRenderOperations = function() {
  const zOperations = this.props.zOperations
  const zOperationComps = zOperations.map((operation, index) => {
    return {
      status: operation.status,
      id: operation.id,
      time: operation.creation_time,
      opIndex: index,
      message: operation.error ? operation.error.message : '-'
    };
  });
  
  return (
    <div style={{ height: ((50 * zOperations.length) + 50), width: '100%' }}>
      <VirtualizedTable
        rowCount={zOperationComps.length}
        sortBy="time"
        sortDirection={ SortDirection.ASC }
        onRowClick={ ({rowData}) => this.openOpInfo(rowData) }
        rowGetter={({ index }) => zOperationComps[index]}
        columns={[
          {
            width: 125,
            cellDataGetter: ({ rowData }) => {
              return (
                <div style={{ minWidth: "max-content" }}>
                  <h3
                    className="text-uppercase"
                    style={{
                      marginBottom: 0,
                      fontSize: 16,
                      fontWeight: "bold",
                      color:
                        rowData.status === API_SUCCESS
                          ? "rgb(0,178,26)"
                          : rowData.status === API_FAILED
                          ? "rgb(236,43,43)"
                          : "#f8bb86"
                    }}
                  >
                    {rowData.status}
                  </h3>
                </div>
              );
            },
            flexGrow: 1,
            label: 'Status',
            dataKey: 'status',
          },
          {
            width: 150,
            flexGrow: 1,
            label: 'ID',
            dataKey: 'id',
          },
          {
            width: 125,
            cellDataGetter: ({ rowData }) => {
              const time = timeConverter(rowData.time)
              return time ? time : '-'
            },
            flexGrow: 1,
            label: 'Time',
            dataKey: 'time',
          },
          {
            width: 150,
            flexGrow: 1,
            label: 'Message',
            dataKey: 'message',
          },
        ]}
      />
    </div>
  )
}
