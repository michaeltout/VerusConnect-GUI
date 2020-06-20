import React from 'react';
import CurrencyCard from '../../../containers/CurrencyCard/CurrencyCard'
import { getCurrencyInfo } from '../../../util/multiverse/multiverseCurrencyUtils';

export const CurrencyInfoRender = function() {  
  return (
    <div
      className="col-xs-12 backround-gray"
      style={{ width: "90%", marginBottom: 20 }}
    >
      <CurrencyCard
        currencyInfo={
          this.props.currencyInfo
            ? this.props.currencyInfo
            : getCurrencyInfo(
                this.props.activeCurrency,
                this.props.info != null ? this.props.info.longestchain : -1,
                this.props.identities
              )
        }
        activeCoin={this.props.activeCoin}
        dispatch={this.props.dispatch}
        openCurrency={this.props.openCurrency}
        setLock={this.props.setModalLock}
        openIdentity={this.props.openIdentity}
        addToBlacklist={this.addToBlacklist}
        addToWhitelist={this.addToWhitelist}
        removeFromBlacklist={this.removeFromBlacklist}
        removeFromWhitelist={this.removeFromWhitelist}
        whitelist={this.props.whitelists[this.props.activeCoin.id] || []}
        blacklist={this.props.blacklists[this.props.activeCoin.id] || []}
      />
    </div>
  );
}


