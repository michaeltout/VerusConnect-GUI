import React from 'react';
import IconDropdown from '../../../../containers/IconDropdown/IconDropdown'
import { VirtualizedTable } from '../../../../containers/VirtualizedTable/VirtualizedTable'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchBar from '../../../../containers/SearchBar/SearchBar';
import { timeConverter } from '../../../../util/displayUtil/timeUtils';

export const ConversionOverviewRender = function() {
  return (
    <div style={{ width: "100%" }}>
      { ConversionOverviewMainRender.call(this) }
    </div>
  );
}

export const ConversionOverviewMainRender = function() {
  const { reserveTransfers, activeCoin } = this.props

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="d-flex justify-content-between">
        <SearchBar
          label={"Transfer Search"}
          placeholder={"Type and press enter"}
          name="transferSearchTerm"
          clearable={true}
          style={{
            width: 300,
          }}
          onChange={this.setInput}
          onClear={this.clearTransferSearch}
          onSubmit={() => this.filterTransfers(reserveTransfers)}
          value={this.state.transferSearchTerm}
        />
      </div>
      <div style={{ marginTop: 10, flex: 1, height: "100%", border: "1px solid #E0E0E0" }}>
        {reserveTransfers.length > 0 ? (
          ConversionTableRender.call(this)
        ) : (
          <div>
            {`No currency conversions found.`}
            <div
              style={{ marginTop: 16 }}
            >{`Any conversions you have made since starting ${activeCoin.id} will show here. If you just made one, it may take a few minutes to appear.`}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export const ConversionTableRender = function() {
  const { reserveTransfers } = this.state
  const displayTransfers = reserveTransfers
  const ref = this

  return (
    <div style={{ height: 470, width: '100%' }}>
      <VirtualizedTable
        rowCount={displayTransfers.length}
        tableRef={ el => { this.table = el; } }
        rowGetter={({ index }) => {
          const transfer = displayTransfers[index]
          const transferIndex =
            transfer.tx && ref.state.transferIndices[transfer.tx.txid] != null
              ? ref.state.transferIndices[transfer.tx.txid]
              : 0;
        
          return {
            from: transfer.from[transferIndex],
            to: transfer.to[transferIndex],
            via: transfer.via[transferIndex],
            tx: transfer.tx,
            operation: {
              ...transfer.operation,
              params: transfer.operation.params[transferIndex]
            }
          }
        }}
        columns={[
          {
            width: 100,
            cellDataGetter: ({ rowData }) => {              
              return (
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis"
                  }}
                >
                  {rowData.from.name}
                </div>
              );
            },
            label: 'From',
            dataKey: 'from',
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
                    textOverflow: "ellipsis"
                  }}
                >
                  {rowData.to.name}
                </div>
              );
            },
            label: 'To',
            dataKey: 'to',
          },
          {
            width: 100,
            cellDataGetter: ({ rowData }) => {
              return (
                <div
                  style={{
                    fontWeight: "bold",
                    color: rowData.tx == null
                      ? "rgb(212, 49, 62)"
                      : rowData.tx.confirmations
                      ? "rgb(74, 166, 88)"
                      : "rgb(149, 149, 149)",
                    flex: 1,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis",
                  }}
                >
                  {this.getStatusString(rowData.tx)}
                </div>
              );
            },
            label: 'Status',
            dataKey: 'status',
          },
          {
            width: 125,
            cellDataGetter: ({ rowData }) => {
              const time = rowData.tx && rowData.tx.confirmations > 0
                    ? timeConverter(rowData.tx.blocktime)
                    : null

              return time ? time : '-'
            },
            flexGrow: 1,
            label: 'Time',
            dataKey: 'time',
          },
          {
            width: 125,
            cellDataGetter: ({ rowData }) => {
              return (
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis"
                  }}
                >
                  {Number(rowData.operation.params.amount)}
                </div>
              );
            },
            label: 'Amount Sent',
            dataKey: 'amount_sent',
          },
          {
            width: 50,
            flexGrow: 1,
            cellDataGetter: ({ rowData }) => {
              return ConversionOptionsRender.call(this, rowData.address)
            },
            label: 'Options',
            dataKey: 'options',
          },
        ]}
      />
    </div>
  )
}

export const ConversionOptionsRender = function(transfer) {
  const transferOptions = this.generateTransferOptions(transfer)

  return (
    <div>
      <div className="d-flex align-items-center">
        {/* <IconButton
          aria-label="Close Modal"
          size="small"
          onClick={() => copyDataToClipboard(transfer)}
        >
          <FileCopyIcon />
        </IconButton> */}
        <IconDropdown 
          items={ transferOptions }
          size="small"
          dropdownIconComponent={ <MoreVertIcon /> }
          onSelect={ (option) => this.selectTransferOption(transfer, option) }
        />
      </div>
    </div>
  )
}

