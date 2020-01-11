import React from "react";
import {
  CONFIRMED_BALANCE,
  PRIVATE_BALANCE,
  RECEIVE_COIN,
  CHAIN_INFO,
  TRANSPARENT_BALANCE,
  SEND_COIN,
  IMMATURE_BALANCE,
  PRIVATE_ADDRS,
  API_SUCCESS,
  API_FAILED,
  ID_INFO
} from "../../../../../util/constants/componentConstants";
import { VirtualizedTable } from '../../../../../containers/VirtualizedTable/VirtualizedTable'
import { TX_TYPES } from '../../../../../util/txUtils/txRenderUtils'
import { timeConverter } from '../../../../../util/displayUtil/timeUtils'
import { SortDirection } from 'react-virtualized';
import SearchBar from '../../../../../containers/SearchBar/SearchBar'
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward'

//TODO: Combine this with HOCs from coinWallet.js

export const MiningWalletRender = function() {
  const { coin, activeIdentity, fiatCurrency } = this.props
  const { identityTransactions, spendableBalance, txSearchTerm } = this.state
  return (
    <div
      className="col-md-8 col-lg-9"
      style={{ padding: 16, width: "80%", overflow: "scroll" }}
    >
      <div className="d-flex" style={{ marginBottom: 16 }}>
        <div style={{ padding: 0, flex: 1 }}>
          <div className="card border rounded-0" style={{ height: "100%" }}>
            <div className="card-body">
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
                      spendableBalance.fiat == null
                        ? "-"
                        : spendableBalance.fiat
                    } ${fiatCurrency}`}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: 0, flex: 1 }}>
          <div className="card border rounded-0" style={{ height: "100%" }}>
            <div className="card-body">
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
                  {activeIdentity.status !== 'active' && (
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
            </div>
          </div>
        </div>
      </div>
      {WalletRenderBalances.call(this)}
      <div className="d-flex flex-fill flex-wrap" style={{ marginBottom: 16 }}>
        <div className="flex-grow-1">
          <div className="col-lg-12" style={{ padding: 0 }}>
            <div className="card border rounded-0">
              <div className="card-body">
                <h6
                  className="card-title"
                  style={{ fontSize: 14, margin: 0, width: "max-content" }}
                >
                  {"Transactions"}
                </h6>
                {identityTransactions &&
                  identityTransactions.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%"
                      }}
                    >
                      <SearchBar
                        label={"Transaction Search"}
                        placeholder={"Type and press enter"}
                        name="txSearchTerm"
                        clearable={true}
                        style={{
                          width: 300
                        }}
                        onChange={this.setInput}
                        onClear={this.clearTxSearch}
                        onSubmit={() =>
                          this.filterTransactions(
                            this.getDisplayTransactions(
                              identityTransactions
                            )
                          )
                        }
                        value={txSearchTerm}
                      />
                    </div>
                  )}
                {identityTransactions &&
                identityTransactions.length > 0 ? (
                  WalletRenderTransactions.call(this)
                ) : (
                  <div style={{ marginTop: 20 }}>
                    {"No transactions found."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {this.props.zOperations &&
        this.props.zOperations.length > 0 && (
          <div
            className="d-flex flex-fill flex-wrap"
            style={{ marginBottom: 16 }}
          >
            <div className="flex-grow-1">
              <div className="col-lg-12" style={{ padding: 0 }}>
                <div className="card border rounded-0">
                  <div className="card-body">
                    <h6
                      className="card-title"
                      style={{ fontSize: 14, margin: 0, width: "max-content" }}
                    >
                      {"Pending Transaction Log:"}
                    </h6>
                    {WalletRenderOperations.call(this)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export const WalletRenderBalances = function() {
  return (
    <div
      className="d-flex flex-fill"
      style={{
        marginBottom: 16,
        backgroundColor: "#ffffff",
        paddingLeft: 8,
        paddingRight: 8,
        overflowX: "scroll"
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
              paddingBottom: 16,
              paddingTop: 16,
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
                        paddingTop: 6,
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: 150
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
                          fontSize: 10,
                          backgroundColor: "rgb(236,43,43)",
                          borderWidth: 1,
                          borderColor: "rgb(236,43,43)",
                          fontWeight: "bold",
                          visibility: unusable ? "hidden" : "unset"
                        }}
                      >
                        <ArrowUpward name={SEND_COIN} />
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
                          fontSize: 10,
                          backgroundColor: "rgb(0,178,26)",
                          borderWidth: 1,
                          borderColor: "rgb(0,178,26)",
                          fontWeight: "bold",
                          visibility: unusable ? "hidden" : "unset"
                        }}
                      >
                        <ArrowDownward />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const WalletRenderTransactions = function() {  
  const { displayTransactions } = this.state

  return (
    <div style={{ height: ((50 * displayTransactions.length) + 50), maxHeight: 500, width: '100%' }}>
      <VirtualizedTable
        rowCount={displayTransactions.length}
        sortBy="confirmations"
        sortDirection={ SortDirection.ASC }
        onRowClick={ ({rowData}) => this.openTxInfo(rowData) }
        rowGetter={({ index }) => displayTransactions[index]}
        columns={[
          {
            width: 150,
            cellDataGetter: ({ rowData }) => {
              return TX_TYPES[rowData.type]
            },
            flexGrow: 1,
            label: 'Type',
            dataKey: 'type',
          },
          {
            width: 150,
            cellDataGetter: ({ rowData }) => {
              return <strong>{rowData.amount}</strong>
            },
            flexGrow: 1,
            label: 'Amount',
            dataKey: 'amount',
          },
          {
            width: 120,
            flexGrow: 1,
            cellDataGetter: ({ rowData }) => {
              return rowData.confirmations
            },
            label: 'Confirmations',
            dataKey: 'confirmations',
          },
          {
            width: 125,
            cellDataGetter: ({ rowData }) => {
              const time = timeConverter(rowData.time == null ? rowData.timestamp : rowData.time)
              return time ? time : '-'
            },
            flexGrow: 1,
            label: 'Time',
            dataKey: 'time',
          },
          {
            width: 150,
            flexGrow: 1,
            label: 'Balance',
            dataKey: 'affectedBalance',
          },
          {
            width: 200,
            cellDataGetter: ({ rowData }) => {
              return <div style={{overflow: "hidden", whiteSpace: "nowrap", width: "100%", textOverflow: "ellipsis"}}>{rowData.address}</div>
            },
            flexGrow: 1,
            label: 'Address',
            dataKey: 'address'
          },
        ]}
      />
    </div>
  )
}

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
            label: 'Id',
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
