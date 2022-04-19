import React from 'react';
import CurrenciesCard from '../../../../../containers/CurrenciesCard/CurrenciesCard';
import NetworkOverviewCard from '../../../../../containers/NetworkOverviewCard/NetworkOverviewCard';
import PbaasOverviewCard from '../../../../../containers/PbaasOverviewCard/PbaasOverviewCard';
import StyledTabs from '../../../../../containers/StyledTabs/StyledTabs';
import SupplyDistributionCard from '../../../../../containers/SupplyDistributionCard/SupplyDistributionCard';
import WalletPaper from '../../../../../containers/WalletPaper/WalletPaper';

export const PbaasChainRender = (props, state, modifiers) => {
  const { coin } = props;
  const { currencies, currenciesTabIndex, hasCurrencies } = state
  const { setCurrenciesTabIndex } = modifiers

  return (
    <div className="col-md-8 col-lg-9" style={{ padding: 16, overflow: "scroll" }}>
      <WalletPaper
        style={{
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <NetworkOverviewCard coin={coin} />
        </div>
      </WalletPaper>
      <WalletPaper
        style={{
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <PbaasOverviewCard coin={coin} />
        </div>
      </WalletPaper>
      <WalletPaper
        style={{
          marginBottom: 16,
        }}
      >
        {hasCurrencies && (
          <StyledTabs
            tabs={[
              { label: "All Currencies" },
              { label: "Fractional Currencies" },
              { label: "Gateways" },
              { label: "Standalone Currencies" },
            ]}
            setTabIndex={(index) => setCurrenciesTabIndex(index)}
            tabIndex={currenciesTabIndex}
            tabStyle={{
              marginBottom: 16,
            }}
          />
        )}
        <CurrenciesCard coin={coin} currencies={{ [props.coin]: currencies }} />
      </WalletPaper>
      <SupplyDistributionCard coin={coin} />
    </div>
  );
};