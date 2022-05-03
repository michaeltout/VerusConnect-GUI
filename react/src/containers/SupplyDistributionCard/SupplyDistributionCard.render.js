import React from 'react';
import { normalizeNum } from '../../util/displayUtil/numberFormat';
import WalletPaper from '../WalletPaper/WalletPaper';
import { VirtualizedTable } from '../VirtualizedTable/VirtualizedTable';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import ColoredCircle from '../ColoredCircle/ColoredCircle';
import InfoIcon from '@material-ui/icons/Info';
import { Tooltip } from '@material-ui/core';

export const SupplyDistributionCardRender = (state, props) => {
  return (
    <WalletPaper style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", width: "100%" }}>
        <h6 className="card-title" style={{ fontSize: 14, margin: 0 }}>
          {"Supply Distribution"}
        </h6>
        <Tooltip
          title={`The supply distribution chart shows where supply of this chain's native currency (${props.coin}) is held`}
        >
          <InfoIcon fontSize="small" color="primary" style={{ marginBottom: 2, marginLeft: 3 }} />
        </Tooltip>
      </div>
      <div className="d-lg-flex justify-content-lg-center">
        <div className="col-lg-3" style={{ display: "flex", paddingLeft: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {SupplyDistributionChartRender(state)}
          </div>
        </div>
        {SupplyDistributionTableRender(state)}
      </div>
    </WalletPaper>
  );
}

export const SupplyDistributionChartRender = (state) => {
  const { supplyDistribution } = state;
  return (
    <ReactMinimalPieChart
      animate
      animationDuration={500}
      animationEasing="ease-out"
      background="#bfbfbf"
      cx={50}
      cy={50}
      data={supplyDistribution}
      label={false}
      labelPosition={50}
      lengthAngle={360}
      lineWidth={100}
      onClick={undefined}
      onMouseOut={undefined}
      onMouseOver={undefined}
      paddingAngle={0}
      radius={50}
      ratio={1}
      rounded={false}
      startAngle={0}
      style={{
        maxHeight: "200px",
        maxWidth: "200px",
        alignSelf: "center",
      }}
    />
  );
};

export const SupplyDistributionTableRender = (state) => {
  const { supplyDistribution } = state
  return (
    <div style={{ height: 300, width: "100%" }}>
      <VirtualizedTable
        rowCount={supplyDistribution.length}
        rowGetter={({ index }) => {
          return supplyDistribution[index]
        }}
        columns={[
          {
            width: 100,
            cellDataGetter: ({ rowData }) => {
              return <ColoredCircle color={rowData.color}></ColoredCircle>;
            },
            label: "Color",
            flexGrow: 1,
            dataKey: "color",
          },
          {
            width: 100,
            cellDataGetter: ({ rowData }) => {
              return (
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis",
                  }}
                >
                  {`${rowData.value >= 0.01 ? rowData.value.toFixed(2) : "<0.01"}%`}
                </div>
              );
            },
            label: "Share",
            flexGrow: 1,
            dataKey: "share",
          },
          {
            width: 200,
            cellDataGetter: ({ rowData }) => {
              return (
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis",
                  }}
                >
                  {rowData.name}
                </div>
              );
            },
            label: "Location",
            flexGrow: 1,
            dataKey: "location",
          },
          {
            width: 150,
            cellDataGetter: ({ rowData }) => {
              const amountLabel = normalizeNum(rowData.amount)

              return (
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis",
                  }}
                >
                  {`${amountLabel[0]}${amountLabel[2]}`}
                </div>
              );
            },
            label: "Amount",
            flexGrow: 1,
            dataKey: "amount",
          },
        ]}
      />
    </div>
  );
};