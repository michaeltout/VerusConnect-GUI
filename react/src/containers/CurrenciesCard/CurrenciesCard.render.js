
import React from 'react';
import { VirtualizedTable } from '../VirtualizedTable/VirtualizedTable'
import { SortDirection } from 'react-virtualized';
import WalletPaper from '../WalletPaper/WalletPaper';
import SearchBar from '../SearchBar/SearchBar';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { openAddCoinModal } from '../../actions/actionDispatchers';

export const CurrenciesCardRender = (
  openCurrencyInfo,
  getDisplayCurrencies,
  filterCurrencies,
  currencies,
  state,
  props
) => {
  const {
    setCurrencySearchTerm,
    currencySearchTerm,
    displayCurrencies,
    setDisplayCurrencies,
    activeTicker,
    setActiveTicker,
    verusCoins,
  } = state;
  const { title, allCurrencies, info, blacklists, identities } = props;
  const coins = Object.keys(allCurrencies);

  return (
    <WalletPaper style={{ marginBottom: 16 }}>
      <h6
        className="card-title"
        style={{ fontSize: 14, margin: 0, marginBottom: 8, width: "max-content" }}
      >
        {title == null ? "Currencies" : title}
      </h6>
      {currencies != null && coins != null && coins.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 8,
          }}
        >
          <FormControl variant="outlined">
            <Select
              value={coins.findIndex((value) => value === activeTicker)}
              onChange={(e) =>
                setActiveTicker(
                  e.target.value === -1 ? null : coins[e.target.value]
                )
              }
            >
              <MenuItem value={-1}>{"All Blockchains"}</MenuItem>
              {coins.map((coin, index) => {
                return <MenuItem value={index}>{coin}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <SearchBar
            label={"Currency Filter"}
            variant={"outlined"}
            placeholder={"Type and press enter"}
            clearable={true}
            style={{
              width: 300,
            }}
            onChange={(e) => setCurrencySearchTerm(e.target.value)}
            onClear={() => {
              setCurrencySearchTerm("");
              setDisplayCurrencies(
                filterCurrencies(
                  getDisplayCurrencies(
                    currencies,
                    info,
                    blacklists,
                    identities
                  ),
                  ""
                )
              );
            }}
            onSubmit={() =>
              setDisplayCurrencies(
                filterCurrencies(
                  getDisplayCurrencies(
                    currencies,
                    info,
                    blacklists,
                    identities
                  ),
                  currencySearchTerm
                )
              )
            }
            value={currencySearchTerm}
          />
        </div>
      )}
      {displayCurrencies.length > 0 ? (
        CurrencyTableRender(displayCurrencies, openCurrencyInfo, props)
      ) : verusCoins.length == 0 ? (
        <a
          href="#"
          style={{ color: "rgb(78,115,223)" }}
          onClick={openAddCoinModal}
        >
          {"Add VRSCTEST to discover new currencies!"}
        </a>
      ) : (
        <div>{"No currencies found."}</div>
      )}
    </WalletPaper>
  );
};

export const CurrencyTableRender = (displayCurrencies, openCurrencyInfo, props) => {
  return (
    <div style={{ height: ((50 * displayCurrencies.length) + 50), maxHeight: 500, width: '100%' }}>
      <VirtualizedTable
        rowCount={displayCurrencies.length}
        sortBy="confirmations"
        sortDirection={ SortDirection.ASC }
        onRowClick={ async ({rowData}) => await openCurrencyInfo(rowData, props.identities) }
        rowGetter={({ index }) => displayCurrencies[index]}
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
                    textOverflow: "ellipsis",
                  }}
                >
                  {rowData.currency.name}
                </div>
              );
            },
            flexGrow: 1,
            label: 'Name',
            dataKey: 'name'
          },
          {
            width: 100,
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
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis",
                  }}
                >
                  {rowData.status === 'pending'
                    ? `Pending (${rowData.ageString})`
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
            width: 160,
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
                  {rowData.status === "pending" ? "-" : rowData.ageString}
                </div>
              );
            },
            flexGrow: 1,
            label: 'Age',
            dataKey: 'age',
          },
          {
            width: 100,
            flexGrow: 1,
            cellDataGetter: ({ rowData }) => {
              return rowData.spendableTo ? "Yes" : "No"
            },
            label: 'Convertable To',
            dataKey: 'spendableTo',
          },
          {
            width: 100,
            flexGrow: 1,
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
                  {rowData.currency.parent_name}
                </div>
              );
            },
            label: 'Chain',
            dataKey: 'chain',
          },
          {
            width: 60,
            flexGrow: 1,
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
                  {props.whitelists && props.whitelists[rowData.currency.parent_name]
                    ? props.whitelists[rowData.currency.parent_name].includes(
                        rowData.currency.name
                      ) || Object.keys(props.activatedCoins).includes(rowData.currency.name)
                      ? "Yes"
                      : "No"
                    : "-"}
                </div>
              );
            },
            label: 'Added',
            dataKey: 'added',
          },
        ]}
      />
    </div>
  )
}
