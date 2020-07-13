import React from 'react';
import IdentityCard from '../../../containers/IdentityCard/IdentityCard'

export const IdInfoRender = function() {
  return (
    <div className="col-xs-12 backround-gray" style={{ width: "90%", marginBottom: 20 }}>
      <IdentityCard 
        verusId={this.props.activeIdentity}
        activeCoin={this.props.activeCoin}
        dispatch={this.props.dispatch}
        openIdentity={this.props.openIdentity}
        setLock={this.props.setModalLock}
        openCurrency={this.props.openCurrency}
      />
    </div>
  );
}


