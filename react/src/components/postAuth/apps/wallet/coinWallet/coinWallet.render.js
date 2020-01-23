import React from "react";
import PieChart from "react-minimal-pie-chart";
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  CONFIRMED_BALANCE,
  PRIVATE_BALANCE,
  DARK_CARD,
  RESERVE_BALANCE,
  RECEIVE_COIN,
  CHAIN_INFO,
  SEND,
  TRANSPARENT_BALANCE,
  IMMATURE_DETAILS,
  SEND_COIN,
  API_SUCCESS,
  API_FAILED,
  IMMATURE_BALANCE,
  MINED_TX,
  MINTED_TX,
  IMMATURE_TX,
  STAKE_TX
} from "../../../../../util/constants/componentConstants";
import { VirtualizedTable } from '../../../../../containers/VirtualizedTable/VirtualizedTable'
import { TX_TYPES } from '../../../../../util/txUtils/txRenderUtils'
import { timeConverter } from '../../../../../util/displayUtil/timeUtils'
import { SortDirection } from 'react-virtualized';
import SearchBar from '../../../../../containers/SearchBar/SearchBar'
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import WalletPaper from '../../../../../containers/WalletPaper/WalletPaper'
import TransactionCard from '../../../../../containers/TransactionCard/TransactionCard'

export const CoinWalletRender = function() {
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
          border: "none"
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
              {`Current ${this.props.coin} Balance`}
            </h6>
          </div>
          <div style={{ paddingTop: 5 }}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <h5
                style={{
                  color: "rgb(0,0,0)",
                  fontSize: 36,
                  fontWeight: "bold"
                }}
              >
                {Number(this.state.spendableBalance.crypto.toFixed(8))}
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
                {this.props.coin}
              </h5>
            </div>
            <div className="d-lg-flex justify-content-lg-start">
              <h1 style={{ margin: 0, fontSize: 16, color: "rgb(0,0,0)" }}>
                {`${
                  this.state.spendableBalance.fiat == null
                    ? "-"
                    : this.state.spendableBalance.fiat
                } ${this.props.fiatCurrency}`}
              </h1>
            </div>
          </div>
        </WalletPaper>
        {this.state.spendableBalance.crypto !=
          this.state.pendingBalance.crypto && (
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
                {`Pending ${this.props.coin} Balance`}
              </h6>
            </div>
            <div style={{ paddingTop: 5 }}>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <h5
                  style={{
                    color: "rgb(0,0,0)",
                    fontSize: 36,
                    fontWeight: "bold"
                  }}
                >
                  {Number(this.state.pendingBalance.crypto.toFixed(8))}
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
                  {this.props.coin}
                </h5>
              </div>
              <div className="d-lg-flex justify-content-lg-start">
                <h1 style={{ margin: 0, fontSize: 16, color: "rgb(0,0,0)" }}>
                  {`${
                    this.state.pendingBalance.fiat == null
                      ? "-"
                      : this.state.pendingBalance.fiat
                  } ${this.props.fiatCurrency}`}
                </h1>
              </div>
            </div>
          </WalletPaper>
        )}
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
              Blockchain Status
            </h6>
            <button
              className="btn btn-primary border rounded"
              type="button"
              name={CHAIN_INFO}
              onClick={e => this.openModal(e, null)}
              style={{
                fontSize: 14,
                backgroundColor: "rgba(0,178,26,0)",
                borderWidth: 0,
                color: "rgb(133,135,150)",
                borderColor: "rgb(133, 135, 150)",
                fontWeight: "bold"
              }}
            >
              {"Chain Info"}
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
            {WalletRenderPie.call(this)}
            <h1
              style={{
                margin: 0,
                fontSize: 16,
                color: "rgb(0,0,0)",
                paddingLeft: 23,
                overflow: "-webkit-paged-x"
              }}
            >
              {this.state.walletLoadState.error && (
                <i
                  className="fas fa-exclamation-triangle"
                  style={{
                    marginRight: 6,
                    color: "rgb(236,124,43)",
                    fontSize: 18
                  }}
                />
              )}
              {this.state.walletLoadState.message}
            </h1>
          </div>
        </WalletPaper>
      </WalletPaper>
      <div style={{ position: "relative" }}>
        {this.state.chevronVisible && (
          <div
            className="d-flex"
            style={{
              zIndex: 1,
              position: "absolute",
              height: "100%",
              width: "10%",
              right: 0,
              marginRight: "-2px"
            }}
          >
            <div
              style={{
                height: "100%",
                width: "35%",
                right: 0,
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))"
              }}
            />
            <div
              className="d-flex d-sm-flex d-lg-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center justify-content-lg-center align-items-lg-center"
              style={{
                height: "100%",
                width: "65%",
                right: 0,
                backgroundColor: "#ffffff",
                opacity: 1
              }}
            >
              <i
                className="fas fa-chevron-right"
                style={{ fontSize: 34, paddingRight: 6 }}
              />
            </div>
          </div>
        )}
      </div>
      {WalletRenderBalances.call(this)}
      <TransactionCard
        transactions={
          this.props.transactions[this.props.coin] != null
            ? this.props.transactions[this.props.coin].filter(tx => {
                return (
                  tx.category !== MINED_TX &&
                  tx.category !== MINTED_TX &&
                  tx.category !== IMMATURE_TX &&
                  tx.category !== STAKE_TX
                );
              })
            : []
        }
        coin={this.props.coin}
      />
      {this.props.zOperations[this.props.coin] &&
        this.props.zOperations[this.props.coin].length > 0 && (
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

export const WalletRenderPie = function() {
  const { percentage, error } = this.state.walletLoadState

  return error ? (
    <div style={{ color: `rgb(78,115,223)` }}>
      <CircularProgress
        variant={"indeterminate"}
        thickness={4.5}
        size={60}
        color="inherit"
      />
    </div>
  ) : (
    <PieChart
      data={[{ value: 1, key: 1, color: `rgb(78,115,223)` }]}
      reveal={percentage}
      lineWidth={20}
      animate
      labelPosition={0}
      label={() => Math.round(percentage) + "%"}
      labelStyle={{
        fontSize: "25px"
      }}
      style={{
        maxHeight: 60,
        maxWidth: 60,
        minWidth: 60,
        maxWidth: 60
      }}
    />
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
          fundable,
          unusable
        } = balanceObj;

        /*const balanceTag = balanceChain === RESERVE_BALANCE
        ? RESERVE_BALANCE
        : balanceAddrType === PRIVATE_BALANCE
        ? PRIVATE_BALANCE
        : balanceType === CONFIRMED_BALANCE
        ? TRANSPARENT_BALANCE
        : balanceType*/

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
            }}>
            <div className="col-lg-12" style={{ padding: 0 }}>
              <div
                className="card border rounded-0">
                <div className="card-body">
                  <div
                    className="d-flex flex-row justify-content-between"
                    style={{ paddingBottom: 3 }}>
                    <h6
                      className="text-capitalize"
                      style={{
                        fontSize: 14,
                        margin: 0,
                      }}>
                      <i
                        className={`far ${balanceTag === PRIVATE_BALANCE ? 'fa-eye-slash' : 'fa-eye'}`}
                        style={{ paddingRight: 6, color: "rgb(133, 135, 150)" }}
                      />
                      { balanceTag + " Balance" }
                    </h6>
                  </div>
                  <div>
                    <div
                      className="d-lg-flex justify-content-lg-start"
                      style={{ paddingBottom: 3, paddingTop: 3 }}>
                      <h1
                        style={{
                          margin: 0,
                          fontSize: 16,
                          color: "rgb(0, 0, 0)",
                          fontWeight: "bold"
                        }}>
                        {`${balance} ${this.props.coin}`}
                      </h1>
                    </div>
                    <div
                      className="d-lg-flex justify-content-lg-start"
                      style={{ paddingBottom: 3, paddingTop: 3 }}>
                      <h1
                        style={{
                          margin: 0,
                          fontSize: 14
                        }}>
                        {`${balanceFiat} ${this.props.fiatCurrency}`}
                      </h1>
                    </div>
                    <div
                      style={{ paddingTop: 6, display: "flex", justifyContent: "space-between", maxWidth: 150 }}>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={ (e) => this.openModal(null, {balanceTag, fund: false, balance, isMessage: false}, SEND_COIN) }
                        disabled={ balance === 0 || balance === '-' || !this.props.addresses[this.props.coin] }
                        style={{
                          fontSize: 10,
                          backgroundColor: "rgb(236,43,43)",
                          borderWidth: 1,
                          borderColor: "rgb(236,43,43)",
                          fontWeight: "bold",
                          visibility: unusable ? "hidden" : "unset"
                        }}>
                        <ArrowUpward name={ SEND_COIN }/>
                      </button>
                      <button
                        className="btn btn-primary"
                        type="button"
                        name={ RECEIVE_COIN }
                        onClick={e => this.openModal(null, {balanceTag}, RECEIVE_COIN)}
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
                      {/*unusable && (
                        <button
                          className="btn btn-primary"
                          type="button"
                          name={ IMMATURE_DETAILS }
                          onClick={ (e) => this.openModal(e, null) }
                          style={{
                            fontSize: 14,
                            backgroundColor: "rgb(98,98,98)",
                            borderWidth: 1,
                            borderColor: "rgb(98,98,98)",
                            paddingRight: 20,
                            paddingLeft: 20,
                            fontWeight: "bold"
                          }}>
                          {"Details"}
                        </button>
                      )*/}
                      {/*fundable && (
                        <button
                          className="btn btn-primary"
                          type="button"
                          name={ SEND_COIN }
                          onClick={ (e) => this.openModal(e, {balanceTag, fund: true, isMessage: false, balance}) }
                          style={{
                            fontSize: 14,
                            backgroundColor: "rgb(78,115,223)",
                            borderWidth: 1,
                            borderColor: "rgb(78,115,223)",
                            paddingRight: 20,
                            paddingLeft: 20,
                            fontWeight: "bold"
                          }}>
                          {"Fund"}
                        </button>
                        )*/}
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
  const zOperations = this.props.zOperations[this.props.coin]
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
