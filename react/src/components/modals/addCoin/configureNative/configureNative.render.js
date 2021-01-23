import React from 'react';
import PieChart from 'react-minimal-pie-chart';

export const ConfigureNativeRender = function() {
  const { error, done, passThrough } = this.state
  return (
    <div
      className="d-sm-flex flex-column justify-content-sm-center"
      style={{ paddingBottom: 40 }}
    >
      <div
        className="d-flex d-sm-flex justify-content-center justify-content-sm-center"
        style={{
          paddingBottom: 40,
          textAlign: "center",
          paddingRight: 50,
          paddingLeft: 50
        }}
      >
        <h1 style={{ fontSize: 16 }}>
          {error && (
            <i
              className="fas fa-exclamation-triangle"
              style={{ paddingRight: 6, color: "rgb(236,124,43)" }}
            />
          )}
          {error
            ? error
            : done
            ? "Done. Great!"
            : passThrough
            ? "Loading coin data..."
            : "Downloading the required tools to sync to the blockchain (ZCash Parameters), please do not close Verus Desktop. This should only happen once, but it may take a while."}
        </h1>
      </div>
      <div
        className="d-flex d-sm-flex justify-content-center justify-content-sm-center"
        style={{ paddingBottom: 40 }}
      >
        {RenderZcpmsPie.call(this)}
      </div>
    </div>
  );
}

export const RenderZcpmsPie = function() {
  const { overallProgress } = this.state

  return (
    <PieChart
      data={[{ value: 1, key: 1, color: "rgb(49, 101, 212)" }]}
      reveal={overallProgress}
      lineWidth={20}
      animate
      labelPosition={0}
      label={() => Math.round(overallProgress) + "%"}
      labelStyle={{
        fontSize: "25px"
      }}
      style={{
        maxHeight: "60px",
        maxWidth: "60px"
      }}
    />
  )
}


