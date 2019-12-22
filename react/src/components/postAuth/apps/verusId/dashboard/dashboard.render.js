import React from 'react';
import { IS_VERUS, NATIVE } from '../../../../../util/constants/componentConstants';
import Tooltip from '@material-ui/core/Tooltip';
import Block from '@material-ui/icons/Block';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

export const DashboardRender = function() {
  //TODO: Move to parent component so this isnt re-calculated at render
  const verusProtocolCoins = Object.values(this.props.activatedCoins).filter((coinObj) => {
    return coinObj.tags.includes(IS_VERUS) && coinObj.mode === NATIVE
  })

  return (
    <div
      className="col-md-8 col-lg-9"
      style={{ padding: 16, overflow: "scroll" }}
    >
      {this.state.revokeId ? DashboardRevokeDialogue.call(this) : null}
      <div className="d-flex" style={{ marginBottom: 16 }}>
        <div className="col-lg-12" style={{ padding: 0 }}>
          <div className="card border rounded-0" style={{ height: "100%" }}>
            <div className="card-body">
              <h6
                className="card-title"
                style={{ fontSize: 14, margin: 0, width: "100%" }}
              >
                {"Identity Overview"}
              </h6>
              <div className="d-lg-flex justify-content-lg-center">
                <div
                  className="col-lg-3"
                  style={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "center",
                    flexDirection: "column",
                    paddingTop: 9,
                    paddingLeft: 0
                  }}
                >
                  <div
                    className={`dropdown ${
                      this.state.nameReservationDropdownOpen ? "show" : ""
                    }`}
                    ref={node => (this.reservationDropdownMenu = node)}
                    style={{
                      marginBottom: 5
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={this.toggleReservationDropdown}
                      disabled={Object.keys(this.props.identities).length == 0}
                      style={{
                        fontSize: 14,
                        backgroundColor: "rgb(78,115,223)",
                        borderWidth: 1,
                        borderColor: "rgb(78,115,223)",
                        paddingRight: 20,
                        paddingLeft: 20
                      }}
                    >
                      <strong>{"Commit Name"}</strong>
                    </button>
                    <div
                      className={`dropdown-menu ${
                        this.state.nameReservationDropdownOpen ? "show" : ""
                      }`}
                      role="menu"
                      style={{
                        overflowY: "scroll",
                        height: "max-content",
                        maxHeight: 217
                      }}
                    >
                      <h6 className="dropdown-header" role="presentation">
                        {"Select chain:"}
                      </h6>
                      {verusProtocolCoins.map((coinObj, index) => {
                        if (this.props.identities[coinObj.id] == null) return null
                        else return (
                          <a
                            className="dropdown-item"
                            key={index}
                            role="presentation"
                            href="#"
                            onClick={() => this.openCommitNameModal(coinObj.id)}
                          >
                            {coinObj.name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className={`dropdown ${
                      this.state.idRecoveryDropdownOpen ? "show" : ""
                    }`}
                    ref={node => (this.recoveryDropdownMenu = node)}
                    style={{
                      marginBottom: 5
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={this.toggleRecoveryDropdown}
                      disabled={Object.keys(this.props.identities).length == 0}
                      style={{
                        fontSize: 14,
                        backgroundColor: "rgb(78,115,223)",
                        borderWidth: 1,
                        borderColor: "rgb(78,115,223)",
                        paddingRight: 20,
                        paddingLeft: 20
                      }}
                    >
                      <strong>{"Recover a Verus ID"}</strong>
                    </button>
                    <div
                      className={`dropdown-menu ${
                        this.state.idRecoveryDropdownOpen ? "show" : ""
                      }`}
                      role="menu"
                      style={{
                        overflowY: "scroll",
                        height: "max-content",
                        maxHeight: 217
                      }}
                    >
                      <h6 className="dropdown-header" role="presentation">
                        {"Select chain:"}
                      </h6>
                      {verusProtocolCoins.map((coinObj, index) => {
                        if (this.props.identities[coinObj.id] == null) return null
                        else return (
                          <a
                            className="dropdown-item"
                            key={index}
                            role="presentation"
                            href="#"
                            onClick={() => this.openRecoverIdModal(coinObj.id)}
                          >
                            {coinObj.name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div
                  className="col d-lg-flex align-items-lg-start"
                  style={{
                    paddingTop: 9,
                    justifyContent: "center",
                    color: "rgb(0,0,0)"
                  }}
                >
                  {verusProtocolCoins.length == 0 ? (
                    <a
                      href="#"
                      style={{color: "rgb(78,115,223)"}}
                      onClick={this.openAddCoinModal}
                    >
                      {"Add a Verus protocol coin (VRSC or VRSCTEST) to start making IDs!"}
                    </a>
                  ) : this.state.displayNameCommitments.length > 0 ? (
                    DashboardRenderTable.call(this)
                  ) : (
                    "No name commitments. Commit a name to create an ID!"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {DashboardRenderIds.call(this)}
    </div>
  );
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
            
            if (identities[chainTicker] && transactions[chainTicker]) {
              isUsed = !(identities[chainTicker].every(idObj => {
                return idObj.identity.name !== namereservation.name
              })) || !(transactions[chainTicker].every(tx => {
                return tx.address !== namereservation.nameid
              }))
            } else {
              loading = true
            }

            return (
              <tr key={index}>
                <td style={{ color: "rgb(0,0,0)", fontWeight: "bold" }}>
                  {`${namereservation.name}@`}
                </td>
                <td>
                  <h3
                    className={`d-lg-flex align-items-lg-center coin-type ${
                      reservationObj.confirmations == null || isUsed || loading
                        ? "native"
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
                      marginTop: 2,
                      marginLeft: 32,
                      borderWidth: 1
                    }}
                  >
                    {loading
                      ? "Loading..."
                      : isUsed
                      ? "Used"
                      : reservationObj.confirmations == null
                      ? "Unknown"
                      : reservationObj.confirmations > 0
                      ? "Ready"
                      : "Pending..."}
                  </h3>
                </td>
                <td>
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
                            : "rgb(78,115,223)"
                      }}
                      onClick={
                        reservationObj.confirmations == null ||
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
                        : reservationObj.confirmations == null
                        ? "Data error"
                        : reservationObj.confirmations > 0
                        ? "Create Verus ID"
                        : "Waiting for confirmation..."}
                    </a>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export const DashboardRevokeDialogue = function() {
  const { revokeDialogueOpen, revokeId } = this.state
  const { identity, chainTicker } = revokeId

  return (<Dialog
    open={revokeDialogueOpen}
    onClose={this.closeRevokeDialogue}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {`Revoke ID?`}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {`Are you sure you would like to revoke ${identity.name}@? This will prevent it from being able to be used until it is recovered. It will also disappear from your ID list, so make sure to remember its name.`}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={this.closeRevokeDialogue} color="primary">
        {"No"}
      </Button>
      <Button onClick={() => this.revokeId(chainTicker, `${identity.name}@`)} color="primary" autoFocus>
        {"Yes"}
      </Button>
    </DialogActions>
  </Dialog>)
}

export const DashboardRenderIds = function() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", minWidth: 790 }}>
      {this.state.compiledIds.map((idObj, index) => {
        const { identity } = idObj
        const isCenter = (index + 2) % 3 == 0
        const zBalance = idObj.balances.native.private.confirmed == null ? 0 : idObj.balances.native.private.confirmed
        const spendableBalance = Number((idObj.balances.native.public.confirmed + zBalance).toFixed(8))
        
        return (
          <div
            style={{
              width: "32.3%",
              minWidth: 255,
              marginBottom: "1.55%",
              marginRight: isCenter ? "1.55%" : 0,
              marginLeft: isCenter ? "1.55%" : 0
            }}
            key={index}
          >
            <div className="col-lg-12" style={{ padding: 0, height: "100%" }}>
              <div
                className="card border-on-hover rounded-0"
                style={{ height: "100%" }}
              >
                <div
                  className="card-body"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={`assets/images/idThumbnail.png`}
                      width="50px"
                      height="50px"
                    />
                    <div style={{ paddingLeft: 10, overflow: "hidden" }}>
                      <h3
                        className="d-lg-flex align-items-lg-center"
                        style={{
                          fontSize: 16,
                          color: "rgb(0,0,0)",
                          fontWeight: "bold",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {`${identity.name}@`}
                      </h3>
                      <h3
                        className="d-lg-flex align-items-lg-center coin-type native"
                        style={{
                          fontSize: 12,
                          width: "max-content",
                          padding: 4,
                          paddingTop: 1,
                          paddingBottom: 1,
                          borderWidth: 1
                        }}
                      >
                        {idObj.canspendfor ? "Can Spend" : "Can Sign"}
                      </h3>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ paddingTop: 30 }}>
                      <h3 style={{ fontSize: 14, color: "rgb(20,20,20)" }}>
                        {"Balance:"}
                      </h3>
                      <h3
                        style={{
                          fontSize: 16,
                          color: "rgb(0,0,0)",
                          marginBottom: 0
                        }}
                      >
                        {`${spendableBalance} ${idObj.chainTicker}`}
                      </h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        flex: 1
                      }}
                    >
                      <Tooltip title="Revoke">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => this.openRevokeDialogue(idObj)}
                          style={{
                            fontSize: 10,
                            backgroundColor: "rgb(236,43,43)",
                            borderWidth: 1,
                            borderColor: "rgb(236,43,43)",
                            fontWeight: "bold",
                            visibility: identity.recoveryauthority === identity.identityaddress ? "hidden" : "unset"
                          }}
                        >
                          <Block />
                        </button>
                      </Tooltip>
                      <Tooltip title="Open">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => this.openId(idObj.chainTicker, index)}
                          style={{
                            fontSize: 10,
                            backgroundColor: "#2f65d0",
                            borderWidth: 1,
                            marginLeft: 3,
                            borderColor: "#2f65d0",
                            fontWeight: "bold"
                          }}
                        >
                          <OpenInNewIcon />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })} 
    </div>
  )
}


