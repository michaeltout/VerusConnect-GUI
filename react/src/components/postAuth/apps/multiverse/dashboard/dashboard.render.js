import React from 'react';
import { IS_VERUS, NATIVE, ID_REVOKED, CHAIN_FALLBACK_IMAGE } from '../../../../../util/constants/componentConstants';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import WalletPaper from '../../../../../containers/WalletPaper/WalletPaper';
import CurrenciesCard from '../../../../../containers/CurrenciesCard/CurrenciesCard';

export const DashboardRender = function() {
  return (
    <div
      className="col-md-8 col-lg-9"
      style={{ padding: 16, overflow: "scroll" }}
    >
      <WalletPaper
        style={{
          marginBottom: 16,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h6
          className="card-title"
          style={{ fontSize: 14, margin: 0, width: "100%" }}
        >
          {"Multiverse Overview"}
        </h6>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: 10 }}>
          {DashboardRenderMultiverseOverview.call(this)}
        </div>
      </WalletPaper>
      <CurrenciesCard
        allCurrencies={this.props.allCurrencies}
        info={this.props.info}
        blacklists={this.props.localCurrencyLists.blacklists}
        whitelists={this.props.localCurrencyLists.whitelists}
        activatedCoins={this.props.activatedCoins}
        identities={this.props.identities}
      />
    </div>
  );
}

export const DashboardRenderMultiverseOverview = function() {
  const { verusProtoCoins, loadedCurrencyCoins } = this.state
  const { allCurrencies } = this.props
  let totalCurrencies = 0

  Object.keys(allCurrencies).map(chainTicker => {
    totalCurrencies += allCurrencies[chainTicker].length
  })

  let displayedMultiverseData = {
    ["Active Multiverse Blockchains"]: loadedCurrencyCoins,
    ["Total Currencies"]: totalCurrencies,
  }

  return Object.keys(displayedMultiverseData).map((dataKey, index) => {
    return (
      <WalletPaper
        style={{
          padding: 16,
          flex: 1,
          minWidth: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
        key={index}
      >
        <h6
          className="card-title"
          style={{
            fontSize: 14,
            margin: 0,
            width: "max-content"
          }}
        >
          {dataKey}
        </h6>
        <h5
          className="card-title"
          style={{
            margin: 0,
            width: "max-content",
            color: "rgb(0,0,0)"
          }}
        >
          <strong>{displayedMultiverseData[dataKey]}</strong>
        </h5>
      </WalletPaper>
    );
  });
}

export const DashboardRenderTable = function() {
  return (
    <div className="table-responsive" style={{ maxHeight: 600, overflowY: "scroll" }}>
      <table className="table table-striped">
        <thead>
          <tr />
        </thead>
        <tbody>
          {this.state.displayNameCommitments.map((reservationObj, index) => {
            const { namereservation, chainTicker } = reservationObj
            const { identities, transactions } = this.props
            let isUsed = false
            let loading = false
            let failed = reservationObj.confirmations < 0 ? true : false
            
            if (identities[chainTicker] && transactions[chainTicker]) {
              if (!(identities[chainTicker].every(idObj => {
                return idObj.identity.name !== namereservation.name
              }))) {
                isUsed = true
              } else {
                for (let i = 0; i < transactions[chainTicker].length; i++) {
                  const tx = transactions[chainTicker][i]
  
                  if (tx.address === namereservation.nameid) {
                    const { confirmations } = tx
                    // If confirmation < 0, mark as "ready" to be used again
                    if (confirmations === 0) {
                      failed = false
                      loading = true
                      break;
                    } else if (confirmations > 0) {
                      failed = false
                      isUsed = true
                      break;
                    } else {
                      failed = true
                    }
                  }
                }
              }
            } else {
              loading = true
            }

            return (
              <tr
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <td
                  style={{
                    color: "rgb(0,0,0)",
                    fontWeight: "bold",
                    borderTop: 0,
                  }}
                >
                  {`${namereservation.name}@`}
                </td>
                <td style={{ borderTop: 0 }}>
                  <h3
                    className={`d-lg-flex align-items-lg-center coin-type ${
                      reservationObj.confirmations == null || isUsed || loading
                        ? "native"
                        : failed
                        ? "red"
                        : reservationObj.confirmations > 0
                        ? "green"
                        : "lite"
                    }`}
                    style={{
                      fontSize: 12,
                      width: "min-content",
                      padding: 4,
                      paddingTop: 1,
                      paddingBottom: 1,
                      borderWidth: 1,
                      margin: 0,
                    }}
                  >
                    {loading
                      ? "Loading..."
                      : isUsed
                      ? "Used"
                      : failed
                      ? "Failed"
                      : reservationObj.confirmations != null &&
                        reservationObj.confirmations > 0
                      ? "Ready"
                      : "Pending..."}
                  </h3>
                </td>
                <td style={{ borderTop: 0 }}>
                  {
                    <a
                      className="card-link text-right"
                      href={
                        reservationObj.confirmations == null ||
                        reservationObj.confirmations == 0 ||
                        loading
                          ? undefined
                          : "#"
                      }
                      style={{
                        fontSize: 14,
                        color:
                          reservationObj.confirmations == null ||
                          reservationObj.confirmations == 0 ||
                          loading
                            ? "rgb(0,0,0)"
                            : "rgb(78,115,223)",
                      }}
                      onClick={
                        failed
                          ? () => this.openCommitNameModal(chainTicker, {
                              name: namereservation.name,
                              referralId: namereservation.referral,
                            })
                          : reservationObj.confirmations == null ||
                            reservationObj.confirmations == 0 ||
                            loading
                          ? () => {
                              return 0;
                            }
                          : isUsed
                          ? () =>
                              this.deleteNameCommitment(
                                namereservation.name,
                                chainTicker
                              )
                          : () => this.openRegisterIdentityModal(reservationObj)
                      }
                    >
                      {loading
                        ? "Loading..."
                        : isUsed
                        ? "Untrack name commitment"
                        : failed
                        ? "Try again"
                        : reservationObj.confirmations != null &&
                          reservationObj.confirmations > 0
                        ? "Create Verus ID"
                        : "Waiting for confirmation..."}
                    </a>
                  }
                </td>
                <td style={{ borderTop: 0 }}>
                  <Tooltip title="Untrack">
                    <IconButton
                      size="small"
                      aria-label="Untrack Name Commitment"
                      onClick={() =>
                        this.deleteNameCommitment(
                          namereservation.name,
                          chainTicker
                        )
                      }
                    >
                      <DeleteForever />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}


