
import React from 'react';
import { VirtualizedTable } from '../VirtualizedTable/VirtualizedTable'
import { SortDirection } from 'react-virtualized';
import WalletPaper from '../WalletPaper/WalletPaper';
import SearchBar from '../SearchBar/SearchBar';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

export const CurrenciesCardRender = (openCurrencyInfo, getDisplayCurrencies, filterCurrencies, currencies, state, props) => {
  const {
    setCurrencySearchTerm,
    currencySearchTerm,
    displayCurrencies,
    setDisplayCurrencies,
    activeTicker,
    setActiveTicker,
  } = state;
  const { title, allCurrencies, info } = props
  const coins = Object.keys(allCurrencies)

  return (
    <WalletPaper style={{ marginBottom: 16 }}>
      <h6
        className="card-title"
        style={{ fontSize: 14, margin: 0, width: "max-content" }}
      >
        {title == null ? "Currencies" : title}
      </h6>
      {currencies != null && coins != null && coins.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <FormControl variant="outlined">
            <Select
              value={coins.findIndex((value) => value === activeTicker)}
              onChange={(e) => setActiveTicker(e.target.value === -1 ? null : coins[e.target.value])}
            >
              <MenuItem value={-1}>{'All Blockchains'}</MenuItem>
              {coins.map((coin, index) => {
                return <MenuItem value={index}>{coin}</MenuItem>
              })}
            </Select>
          </FormControl>
          <SearchBar
            label={"Currency Search"}
            placeholder={"Type and press enter"}
            clearable={true}
            style={{
              width: 300
            }}
            onChange={e => setCurrencySearchTerm(e.target.value)}
            onClear={() => {
              setCurrencySearchTerm('')
              setDisplayCurrencies(getDisplayCurrencies(filterCurrencies(currencies, ''), info))
            }}
            onSubmit={() =>
              setDisplayCurrencies(getDisplayCurrencies(filterCurrencies(currencies, currencySearchTerm), info))
            }
            value={currencySearchTerm}
          />
        </div>
      )}
      {displayCurrencies.length > 0 ? (
        CurrencyTableRender(displayCurrencies, openCurrencyInfo, props)
      ) : (
        <div style={{ marginTop: 20 }}>{"No currencies found."}</div>
      )}
    </WalletPaper>
  );
}

export const CurrencyTableRender = (displayCurrencies, openCurrencyInfo, props) => {
  return (
    <div style={{ height: ((50 * displayCurrencies.length) + 50), maxHeight: 500, width: '100%' }}>
      <VirtualizedTable
        rowCount={displayCurrencies.length}
        sortBy="confirmations"
        sortDirection={ SortDirection.ASC }
        onRowClick={ ({rowData}) => openCurrencyInfo(props, rowData) }
        rowGetter={({ index }) => displayCurrencies[index]}
        columns={[
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
                  {rowData.currency.currencyname}
                </div>
              );
            },
            flexGrow: 1,
            label: 'Name',
            dataKey: 'name'
          },
          {
            width: 150,
            cellDataGetter: ({ rowData }) => {
              return (
                <div
                  style={{
                    fontWeight: "bold",
                    color: rowData.status === 'pending'
                      ? "#878787" /* GRAY */
                      : rowData.status === 'failed'
                      ? "rgb(236,43,43)" /* RED */
                      : "rgb(0,178,26)" /* GREEN */,
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  {rowData.status === 'pending'
                    ? 'Pending'
                    : rowData.status === 'failed'
                    ? "Failed"
                    : "Active"}
                </div>
              );
            },
            flexGrow: 1,
            label: 'Status',
            dataKey: 'status'
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
                  {rowData.currency.endblock === 0
                    ? `Permanent ${rowData.isToken ? "Token" : "Blockchain"}`
                    : `Temporary ${
                        rowData.isToken ? "Token" : "Blockchain"
                      }`}
                </div>
              );
            },
            flexGrow: 1,
            label: 'Type',
            dataKey: 'type'
          },
          {
            width: 150,
            cellDataGetter: ({ rowData }) => {
              return <div>{rowData.status === 'pending' ? '-' : rowData.ageString}</div>
            },
            flexGrow: 1,
            label: 'Age',
            dataKey: 'age',
          },
          {
            width: 120,
            flexGrow: 1,
            cellDataGetter: ({ rowData }) => {
              return rowData.convertable ? "Yes" : "No"
            },
            label: 'Convertable',
            dataKey: 'convertable',
          },
        ]}
      />
    </div>
  )
}
