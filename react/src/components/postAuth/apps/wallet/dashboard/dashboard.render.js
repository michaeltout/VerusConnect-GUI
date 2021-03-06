import React from 'react';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { ETH } from '../../../../../util/constants/componentConstants';

export const DashboardRender = function() {
  return (
    <div
      className="col-md-8 col-lg-9"
      style={{ padding: 16, overflow: "scroll" }}
    >
      <div className="d-flex" style={{ marginBottom: 16 }}>
        <div className="col-lg-7" style={{ padding: 0 }}>
          <div className="card border rounded-0" style={{ height: "100%" }}>
            <div className="card-body d-lg-flex flex-row justify-content-between align-items-lg-center">
              <h6
                className="card-title"
                style={{ fontSize: 14, margin: 0, width: "max-content" }}
              >
                Total Portfolio Value
              </h6>
              <h5
                className="card-title"
                style={{ margin: 0, width: "max-content", color: "rgb(0,0,0)" }}
              >
                <strong>
                  {`${this.state.totalPortfolioValue.toFixed(2)} ${
                    this.props.fiatCurrency
                  }`}
                </strong>
              </h5>
            </div>
          </div>
        </div>
        <div className="col" style={{ padding: 0 }}>
          <div className="card border rounded-0" style={{ height: "100%" }}>
            <div className="card-body d-lg-flex flex-row justify-content-between align-items-lg-center">
              <div className="d-lg-flex justify-content-lg-center">
                <h6 style={{ fontSize: 14, margin: 0, width: "max-content" }}>
                  Profile
                </h6>
                <h6
                  style={{
                    fontSize: 14,
                    margin: 0,
                    width: "max-content",
                    marginLeft: 11,
                    color: "rgb(0,0,0)"
                  }}
                >
                  {this.props.activeUser.name}
                </h6>
              </div>
              <a
                className="card-link text-right"
                href="#"
                style={{ fontSize: 14, color: "rgb(78,115,223)" }}
                onClick={this.openProfileSettings}
              >
                {"Profile Settings"}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex" style={{ marginBottom: 16 }}>
        <div className="col-lg-12" style={{ padding: 0 }}>
          <div className="card border rounded-0" style={{ height: "100%" }}>
            <div className="card-body">
              <h6
                className="card-title"
                style={{ fontSize: 14, margin: 0, width: "100%" }}
              >
                {"Portfolio Overview"}
              </h6>
              <div className="d-lg-flex justify-content-lg-center">
                <div className="col-lg-3" style={{ padding: 0, marginTop: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {DashboardRenderPie.call(this)}
                  </div>
                </div>
                <div
                  className="col d-lg-flex align-items-lg-center"
                  style={{ marginTop: 20 }}
                >
                  {DashboardRenderTable.call(this)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {DashboardRenderSpotPrices.call(this)}
    </div>
  );
}

export const DashboardRenderPie = function() {
  return (<ReactMinimalPieChart
    animate
    animationDuration={500}
    animationEasing="ease-out"
    background="#bfbfbf"
    cx={50}
    cy={50}
    data={this.state.portfolioBreakdown}
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
      maxHeight: '200px',
      maxWidth: '200px',
      alignSelf: 'center'
    }}
  />)
}

export const DashboardRenderTable = function() {
  return (
    <div className="table-responsive" style={{maxHeight: 600, overflowY: "scroll"}}>
      <table className="table table-striped">
        <thead>
          <tr />
        </thead>
        <tbody>
          {this.state.portfolioBreakdown.map((portfolioItem) => {
            return(
              <tr key={portfolioItem.id}>
                <td style={{color: portfolioItem.color}}><strong>{`${portfolioItem.value}%`}</strong></td>
                <td className="d-lg-flex align-items-lg-center" style={{color: 'rgb(0,0,0)'}}>
                  <img src={`assets/images/cryptologo/${portfolioItem.mode === ETH ? ETH : 'btc'}/${portfolioItem.id.toLowerCase()}.png`} width="20px" height="20px" style={{marginRight: 3}} />
                  <strong>{portfolioItem.name}</strong>
                </td>
                <td>{`${portfolioItem.balance != null ? portfolioItem.balance : '-'} ${portfolioItem.id}`}</td>
                <td style={{color: 'rgb(0,0,0)'}}>{`${portfolioItem.balanceFiat != null ? portfolioItem.balanceFiat.toFixed(2) : '-'} ${this.props.fiatCurrency}`}</td>
                <td style={portfolioItem.priceChange1h ? (portfolioItem.priceChange1h > 0 ? {color: 'rgb(0,178,26)'} : {color: 'rgb(236,43,43)'}) : {} }>
                  {`${portfolioItem.priceChange1h != null ? portfolioItem.priceChange1h : '-'}%`}
                </td>
              </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}

export const DashboardRenderSpotPrices = function() {
  return (
    <div className="d-flex flex-fill flex-wrap" style={{marginBottom: 16}}>
      {this.state.portfolioBreakdown.map((portfolioItem) => {
        return (
          <div className="flex-grow-1" style={{maxWidth: '50%'}} key={portfolioItem.id}>
            <div className="col-lg-12" style={{padding: 0}}>
              <div className="card border rounded-0">
                <div className="card-body">
                  <div>
                    <h3 className="d-lg-flex align-items-lg-center" style={{fontSize: 16, color: 'rgb(0,0,0)'}}>
                      <img src={`assets/images/cryptologo/${portfolioItem.mode === ETH ? ETH : 'btc'}/${portfolioItem.id.toLowerCase()}.png`} width="20px" height="20px" style={{marginRight: 3}} />
                    <strong>{portfolioItem.name}</strong>
                  </h3>
                  </div>
                  <div className="d-lg-flex justify-content-lg-end">
                    <h3 style={{fontSize: 16, color: 'rgb(0,0,0)'}}>
                      {portfolioItem.spotPrice ? (`${portfolioItem.spotPrice} ${this.props.fiatCurrency}/${portfolioItem.id}`) : `No price data found for ${portfolioItem.id}`}
                    </h3>
                    {portfolioItem.priceChange1h &&
                      <h3 style={
                        {color: portfolioItem.priceChange1h ? (portfolioItem.priceChange1h > 0 ? 'rgb(0,178,26)' : 'rgb(236,43,43)') : 'rgb(0,0,0)',
                        marginLeft: 34,
                        fontSize: 16} }>
                        {`${portfolioItem.priceChange1h}%`}
                      </h3>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })} 
    </div>
  )
}


