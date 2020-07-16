import React from 'react';
import { MINING, WALLET, VERUSID, APPS, MULTIVERSE } from '../../../util/constants/componentConstants'
import { getPathParent } from '../../../util/navigationUtils'
import CircularProgress from '@material-ui/core/CircularProgress';

export const UxSelectorRender = function() {
  const { mainPathArray } = this.props

  return (
    <div className="d-flex d-sm-flex d-md-flex align-items-center align-items-sm-center align-items-md-center contact-clean pre-auth-container">
      
        <div className="pre-auth-inner-container">
          {!this.state.loading &&
            <React.Fragment>
              <div className="text-center pre-auth-header-container">
                <img src="assets/images/verus-graphics/truthandprivacyforall.png" width="325px" height="40px"/>
              </div>
              <h4 className="text-center under-logo-header">{"Get Started."}</h4>
              <div className="col-lg-8 offset-lg-2 ux-selector-card-container">
                <button className="unstyled-button" onClick={ () => this.selectUx(`${getPathParent(mainPathArray)}/${APPS}/${WALLET}`) }>
                  <div className="card shadow ux-selector-card-body border-on-hover">
                    <div className="card-body inherit-color">
                      <div className="d-flex align-items-lg-center inherit-color">
                        <div className="d-flex ux-selector-card-logo-container inherit-color"><i className="fas fa-wallet ux-selector-card-logo inherit-color"></i></div>
                        <div className="ux-selector-content-container inherit-color">
                          <h4 className="ux-selector-card-text inherit-color">Wallet</h4>
                          <h6 className="mb-2 ux-selector-card-text inherit-color">Manage your funds in an easy to use, multicurrency wallet</h6>
                        </div>
                        <div className="d-flex align-items-center inherit-color"><i className="fas fa-chevron-right ux-selector-card-text chevron inherit-color"></i></div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-lg-8 offset-lg-2 ux-selector-card-container">
                <button className="unstyled-button" onClick={ () => this.selectUx(`${getPathParent(mainPathArray)}/${APPS}/${VERUSID}`) }>
                  <div className="card shadow ux-selector-card-body border-on-hover">
                    <div className="card-body inherit-color">
                      <div className="d-flex align-items-lg-center inherit-color">
                        <div className="d-flex ux-selector-card-logo-container inherit-color"><i className="fas fa-fingerprint ux-selector-card-logo inherit-color"></i></div>
                        <div className="ux-selector-content-container inherit-color">
                          <h4 className="ux-selector-card-text inherit-color">{"Verus IDs"}</h4>
                          <h6 className="mb-2 ux-selector-card-text inherit-color">{"Manage your own verifiable, privacy maintaining, secure Verus Identities"}</h6>
                        </div>
                        <div className="d-flex align-items-center inherit-color"><i className="fas fa-chevron-right ux-selector-card-text chevron inherit-color"></i></div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-lg-8 offset-lg-2 ux-selector-card-container">
                <button className="unstyled-button" onClick={ () => this.selectUx(`${getPathParent(mainPathArray)}/${APPS}/${MINING}`) }>
                  <div className="card shadow ux-selector-card-body border-on-hover">
                    <div className="card-body inherit-color">
                      <div className="d-flex align-items-lg-center inherit-color">
                        <div className="d-flex ux-selector-card-logo-container inherit-color"><i className="fas fa-tachometer-alt ux-selector-card-logo inherit-color"></i></div>
                        <div className="ux-selector-content-container inherit-color">
                          <h4 className="ux-selector-card-text inherit-color">Mining Dashboard</h4>
                          <h6 className="mb-2 ux-selector-card-text inherit-color">Help the network, and earn</h6>
                        </div>
                        <div className="d-flex align-items-center inherit-color"><i className="fas fa-chevron-right ux-selector-card-text chevron inherit-color"></i></div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-lg-6 offset-lg-2 ux-selector-card-container">
                <button className="unstyled-button" onClick={ () => this.selectUx(`${getPathParent(mainPathArray)}/${APPS}/${MULTIVERSE}`) }>
                  <div className="card shadow ux-selector-card-body border-on-hover">
                    <div className="card-body inherit-color">
                      <div className="d-flex align-items-lg-center inherit-color">
                        <div className="d-flex ux-selector-card-logo-container inherit-color"><i className="fas fa-rocket ux-selector-card-logo inherit-color"></i></div>
                        <div className="ux-selector-content-container inherit-color">
                          <h4 className="ux-selector-card-text inherit-color">Multiverse</h4>
                          <h6 className="mb-2 ux-selector-card-text inherit-color">Discover Public Blockchains as a Service</h6>
                        </div>
                        <div className="d-flex align-items-center inherit-color"><i className="fas fa-chevron-right ux-selector-card-text chevron inherit-color"></i></div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </React.Fragment>
          }
          { this.state.loading && 
            <div className="col-lg-4 col-xl-6 offset-lg-4 offset-xl-3 text-center pre-auth-header-container" style={{
              marginTop: "25%"
            }}>
              <CircularProgress />
              <h4 className="text-center under-logo-header">Loading wallet...</h4>
            </div> }
      </div>
    </div>
  );
}


