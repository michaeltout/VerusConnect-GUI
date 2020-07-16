import React from 'react';
import { VirtualizedTable } from '../VirtualizedTable/VirtualizedTable'
import { TX_TYPES } from '../../util/txUtils/txRenderUtils'
import { timeConverter } from '../../util/displayUtil/timeUtils'
import { SortDirection } from 'react-virtualized';
import WalletPaper from '../WalletPaper/WalletPaper';
import SearchBar from '../SearchBar/SearchBar';
import CustomButton from '../CustomButton/CustomButton';

export const TxCardRender = (openTxInfo, openCsvExport, getDisplayTxs, filterTxs, state, props, dispatch) => {
  const { setTxSearchTerm, txSearchTerm, displayTxs, setDisplayTxs } = state
  const { transactions, title } = props

  return (
    <WalletPaper style={{ marginBottom: 16 }}>
      <h6
        className="card-title"
        style={{ fontSize: 14, margin: 0, width: "max-content" }}
      >
        {title == null ? "Transactions" : title}
      </h6>
      {transactions && transactions.length > 0 && (
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
            clearable={true}
            style={{
              width: 300
            }}
            onChange={e => setTxSearchTerm(e.target.value)}
            onClear={() => {
              setTxSearchTerm('')
              setDisplayTxs(filterTxs(getDisplayTxs(transactions, props), ''))
            }}
            onSubmit={() =>
              setDisplayTxs(filterTxs(getDisplayTxs(transactions, props), txSearchTerm), props)
            }
            value={txSearchTerm}
          />
        </div>
      )}
      {displayTxs.length > 0 ? (
        TxTableRender(displayTxs, openTxInfo, props, dispatch)
      ) : (
        <div style={{ marginTop: 20 }}>{"No transactions found."}</div>
      )}
      {transactions && transactions.length > 0 &&
        <CustomButton
          onClick={() => openCsvExport(props, displayTxs, dispatch)}
          title={"Export to CSV"}
          backgroundColor={"white"}
          textColor={"unset"}
          buttonProps={{
            color: "default",
            variant: "outlined",
            style: { marginTop: 8 }
          }}
        />
      }
    </WalletPaper>
  );
}

export const TxTableRender = (displayTxs, openTxInfo, props, dispatch) => {
  return (
    <div style={{ height: ((50 * displayTxs.length) + 50), maxHeight: 500, width: '100%' }}>
      <VirtualizedTable
        rowCount={displayTxs.length}
        sortBy="confirmations"
        sortDirection={ SortDirection.ASC }
        onRowClick={ ({rowData}) => openTxInfo(props, rowData, dispatch) }
        rowGetter={({ index }) => displayTxs[index]}
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
              return (
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis",
                  }}
                >
                  {rowData.displayAddress}
                </div>
              );
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
