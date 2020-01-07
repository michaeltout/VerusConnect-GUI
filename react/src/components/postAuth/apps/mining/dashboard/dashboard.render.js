import React from "react";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import { ETH } from "../../../../../util/constants/componentConstants";

export const DashboardRender = function() {
  return (
    <div
      className="col-md-8 col-lg-9"
      style={{ padding: 16, overflow: "scroll" }}
    >
      <div className="d-flex" style={{ marginBottom: 16 }}>
        <div className="col-lg-12" style={{ padding: 0 }}>
          <div className="card border rounded-0" style={{ height: "100%" }}>
            <div className="card-body">
              <h6
                className="card-title"
                style={{ fontSize: 14, margin: 0, width: "100%" }}
              >
                {"System Overview"}
              </h6>
              <div className="d-flex" style={{ marginBottom: 16 }}>
                { DashboardRenderSystemData.call(this) }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DashboardRenderSystemData = function() {
  const { coinsMining, coinsStaking, cpuTemp, uptime, cpuLoad } = this.state.overviewData

  const displayedSystemData = {
    ["Mining"]: `${coinsMining} ${coinsMining == 1 ? 'coin' : 'coins'}`,
    ["Staking"]: `${coinsStaking} ${coinsStaking == 1 ? 'coin' : 'coins'}`,
    ["CPU Temp"]: cpuTemp,
    ["Uptime"]: uptime,
    ["CPU Load"]: cpuLoad
  }

  return Object.keys(displayedSystemData).map(dataKey => {
    return (
      <div className="col-lg-7" style={{ padding: 0 }}>
        <div className="card border rounded-0" style={{ height: "100%" }}>
          <div className="card-body d-lg-flex flex-row justify-content-between align-items-lg-center">
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
              <strong>
                {displayedSystemData[dataKey]}
              </strong>
            </h5>
          </div>
        </div>
      </div>
    );
  });

  
}
