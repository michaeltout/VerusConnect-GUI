import React from 'react';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { ETH } from '../../../../../util/constants/componentConstants';

export const DashboardRender = function() {
  return (
    <div
      className="col-md-8 col-lg-9"
      style={{ padding: 16, overflow: "scroll" }}
    >
      { DashboardRenderIds.call(this) }
      <div className="d-flex" style={{ marginBottom: 16 }}>
        <div className="col-lg-12" style={{ padding: 0 }}>
          <div className="card border rounded-0" style={{ height: "100%" }}>
            <div className="card-body">
              <h6
                className="card-title"
                style={{ fontSize: 14, margin: 0, width: "100%" }}
              >
                {"Portfolio Overview"}
              </h6>
              <div className="d-lg-flex justify-content-lg-center">
                <div className="col-lg-3" style={{ padding: 0, marginTop: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={ this.saveChanges }
                      style={{
                        fontSize: 14,
                        backgroundColor: "rgb(78,115,223)",
                        borderWidth: 1,
                        borderColor: "rgb(78,115,223)",
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginBottom: 16
                      }}>
                      <strong>{"Reserve Name for Verus ID"}</strong>
                    </button>
                  </div>
                </div>
                <div
                  className="col d-lg-flex align-items-lg-center"
                  style={{ marginTop: 20 }}
                >
                  {DashboardRenderTable.call(this)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const DashboardRenderTable = function() {
  return (
    <div className="table-responsive" style={{maxHeight: 600, overflowY: "scroll"}}>
      <table className="table table-striped">
        <thead>
          <tr />
        </thead>
        <tbody>
          {this.state.nameReservations.map((reservationObj, index) => {
            const { namereservation } = reservationObj
            return (
              <tr key={index}>
                <td style={{ color: "rgb(0,0,0)" }}>
                  <strong>{namereservation.name}</strong>
                </td>
                <td>
                  <h3
                    className={`d-lg-flex align-items-lg-center coin-type ${
                      reservationObj.confirmations == null ||
                      reservationObj.confirmations > 0 ? "native" : "lite"
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
                    {reservationObj.confirmations == null ? "Unknown" : (reservationObj.confirmations > 0 ? "Ready" : "Pending...")}
                  </h3>
                </td>
                <td style={{ color: "rgb(0,0,0)" }}>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.saveChanges}
                    style={{
                      fontSize: 14,
                      backgroundColor: "rgb(78,115,223)",
                      borderWidth: 1,
                      borderColor: "rgb(78,115,223)"
                    }}
                  >
                    <strong>{"Create Verus ID"}</strong>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export const DashboardRenderIds = function() {
  return (
    <div className="d-flex flex-fill flex-wrap" style={{marginBottom: 16}}>
      {this.state.compiledIds.map((idObj, index) => {
        const { identity } = idObj
        
        return (
          <div
            className="flex-grow-1"
            style={{ maxWidth: "50%" }}
            key={ index }
          >
            <div className="col-lg-12" style={{ padding: 0 }}>
              <div className="card border-on-hover rounded-0">
                <div className="card-body">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={`assets/images/idThumbnail.png`}
                      width="50px"
                      height="50px"
                    />
                    <div style={{ paddingLeft: 10 }}>
                      <h3
                        className="d-lg-flex align-items-lg-center"
                        style={{ fontSize: 16, color: "rgb(0,0,0)" }}
                      >
                        <strong>{identity.name}</strong>
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
                  <div style={{ paddingTop: 30 }}>
                    <h3 style={{ fontSize: 14, color: "rgb(20,20,20)" }}>
                      {"Balance:"}
                    </h3>
                    <h3 style={{ fontSize: 16, color: "rgb(0,0,0)" }}>
                      {`${idObj.balance} ${idObj.chainTicker}`}
                    </h3>
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


