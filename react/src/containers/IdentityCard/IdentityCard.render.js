import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ObjectToTable from '../ObjectToTable/ObjectToTable';
import IconDropdown from '../IconDropdown/IconDropdown'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { checkFlag } from '../../util/flagUtils';
import { IS_CURRENCY_FLAG } from '../../util/constants/flags';
import { copyDataToClipboard } from '../../util/copyToClipboard';
import StyledTabs from '../StyledTabs/StyledTabs';
import OffersTable from '../../containers/OfferTable/OfferTable';
import OfferForm from '../OfferForm/OfferForm'
import { getAddresses, getAllCurrencies, getIdentities } from '../../util/api/wallet/walletCalls';

export const IdentityCardRender = function() {
  const { props, state } = this;
  const { verusId } = props;

  const ContentComponent = this.IDENTITY_CARD_TAB_MAP[this.IDENTITY_TABS[state.selectedTabIndex].key];

  return (
    <Card square style={{ height: "100%", width: "110%", marginLeft: "-5%" }}>
      <div style={{ height: "100%" }}>
        <CardMedia
          component={() => {
            return (
              <div>
                <div
                  style={{
                    textAlign: "left",
                    fontSize: 24,
                    padding: 15,
                    backgroundColor: "rgb(49, 101, 212)",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  {`${verusId.identity.name}@`}
                  <i className="fas fa-fingerprint" />
                </div>
                <StyledTabs 
                  tabs={this.IDENTITY_TABS}
                  tabStyle={{
                    backgroundColor: "rgb(49, 101, 212)",
                    color: "white",
                  }}
                  setTabIndex={this.setSelectedTabIndex}
                  tabIndex={state.selectedTabIndex}
                />
              </div>
            );
          }}
        />
        <CardContent style={{ height: "90%", overflow: "scroll" }}>
          {ContentComponent.call(this)}
        </CardContent>
      </div>
    </Card>
  );
};

export const IdentityMakeOfferCardRender = function () {
  const { props } = this;
  const { activeCoin, verusId } = props;

  const extractResults = (response, wrap = (value) => value) => {
    if (response.msg === 'success') return wrap(response.result)
    else {
      console.error(response)
      return wrap([])
    }
  }

  return (
    <React.Fragment>
      <StyledTabs
        tabs={[{ label: "Sell" }, { label: "Buy" }]}
        setTabIndex={(index) => this.setState({ buyOffer: index ? true : false })}
        tabIndex={this.state.buyOffer ? 1 : 0}
        tabStyle={{
          marginTop: -16,
        }}
      />
      <OfferForm
        getAddrs={async () => {
          const res = await getAddresses(activeCoin.mode, activeCoin.id, true);

          if (res.msg === 'success') {
            const addrs = res.result 

            return [...addrs.public, ...addrs.private];
          } else {
            return []
          }
        }}
        getIdentities={async () =>
          extractResults(await getIdentities(activeCoin.mode, activeCoin.id))
        }
        getCurrencies={async () =>
          activeCoin.id === "VRSC"
            ? [{ fullyqualifiedname: "VRSC" }]
            : extractResults(await getAllCurrencies(activeCoin.mode, activeCoin.id))
        }
        onSubmit={(offerData, forData, changeAddr, destinationAddr, expiry) =>
          this.tryMakeOffer({ offerData, forData, changeAddr, destinationAddr, expiry })
        }
        lockFor={
          this.state.buyOffer
            ? {
                isCurrency: false,
                identity: `${verusId.identity.name}@`,
              }
            : null
        }
        lockOffer={
          !this.state.buyOffer
            ? {
                isCurrency: false,
                identity: `${verusId.identity.name}@`,
              }
            : null
        }
      />
    </React.Fragment>
  );
}

export const IdentityOffersCardRender = function () {
  const { props } = this;
  const { verusId } = props;
  const { offers } = verusId;

  const extractRow = (offerSide) => {
    return offerSide.name == null ? Object.keys(offerSide).map(key => {
      return {
        label: `${offerSide[key]} ${key}`,
        onDetails: () => {}
      }
    }) : [{
      label: `${offerSide.name}@`,
      onDetails: () => {}
    }]
  }

  return offers == null ? null : (
    <OffersTable
      rows={Object.values(offers)
        .flat()
        .map((x) => {
          return {
            offering: extractRow(x.offer.offer),
            for: extractRow(x.offer.accept),
            expiring: x.offer.blockexpiry.toString(),
            onTake: (destinationaddress, changeaddress) =>
              this.tryTakeOffer(x, destinationaddress, changeaddress),
            onClose: () => this.tryCloseOffer(x),
            canTake: x.cantake,
            canClose: x.canclose,
          };
        })}
    />
  );
}

export const IdentityInfoCardRender = function () {
  const { props, state } = this;
  const { verusId } = props;
  const { identity, status } = verusId;
  const { idMap, loadingIdMap } = state;
  const content = Object.keys(identity.contentmap).length;
  const numAddrs = identity.primaryaddresses.length;
  const addrPanelProps =
    numAddrs > 1
      ? {}
      : {
          expanded: false,
          onClick: () => copyDataToClipboard(identity.primaryaddresses[0]),
        };
  const isCurrency = checkFlag(identity.flags, IS_CURRENCY_FLAG);

  return (
    <React.Fragment>
      <ExpansionPanel square expanded={false}>
        <ExpansionPanelSummary
          expandIcon={null}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div style={{ fontWeight: "bold" }}>{"Name"}</div>
          <div
            style={{
              fontWeight: "bold",
              color: "#878787",
              flex: 1,
              textAlign: "right",
            }}
          >
            {identity.name}
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel square expanded={false}>
        <ExpansionPanelSummary
          expandIcon={null}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div style={{ fontWeight: "bold" }}>{"Status"}</div>
          <div
            style={{
              fontWeight: "bold",
              color: "#878787",
              flex: 1,
              textAlign: "right",
            }}
          >
            {status}
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel square expanded={false} disabled={!isCurrency}>
        <ExpansionPanelSummary
          expandIcon={null}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div style={{ fontWeight: "bold", alignSelf: "center" }}>{"Currency"}</div>
          <div
            style={{
              fontWeight: "bold",
              flex: 1,
              textAlign: "right",
              alignSelf: "center",
            }}
          >
            {isCurrency ? identity.name : "no currency"}
          </div>
          {isCurrency ? (
            <IconDropdown
              items={[this.FIND_CURRENCY, this.COPY]}
              dropdownIconComponent={<MoreVertIcon fontSize="small" />}
              onSelect={(option) => this.selectOption(identity.identityaddress, option)}
            />
          ) : null}
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={false}
        onClick={() => copyDataToClipboard(identity.identityaddress)}
      >
        <ExpansionPanelSummary
          expandIcon={null}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div style={{ fontWeight: "bold" }}>{"Identity Address"}</div>
          <div
            style={{
              fontWeight: "bold",
              color: "rgb(49, 101, 212)",
              flex: 1,
              textAlign: "right",
            }}
          >
            {identity.identityaddress}
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel square expanded={false}>
        <ExpansionPanelSummary
          expandIcon={null}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div style={{ fontWeight: "bold", alignSelf: "center" }}>{"Revocation Authority"}</div>
          <div
            style={{
              fontWeight: "bold",
              flex: 1,
              textAlign: "right",
              alignSelf: "center",
            }}
          >
            {idMap[identity.revocationauthority] != null
              ? `${identity.revocationauthority} (${
                  idMap[identity.revocationauthority].identity.name
                }@)`
              : loadingIdMap
              ? `${identity.revocationauthority} (fetching name...)`
              : identity.revocationauthority}
          </div>
          <IconDropdown
            items={[this.FIND_ID, this.COPY]}
            dropdownIconComponent={<MoreVertIcon fontSize="small" />}
            onSelect={(option) => this.selectOption(identity.revocationauthority, option)}
          />
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel square expanded={false}>
        <ExpansionPanelSummary
          expandIcon={null}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div style={{ fontWeight: "bold", alignSelf: "center" }}>{"Recovery Authority"}</div>
          <div
            style={{
              fontWeight: "bold",
              flex: 1,
              textAlign: "right",
              alignSelf: "center",
            }}
          >
            {idMap[identity.recoveryauthority]
              ? `${identity.recoveryauthority} (${
                  idMap[identity.recoveryauthority].identity.name
                }@)`
              : loadingIdMap
              ? `${identity.recoveryauthority} (fetching name...)`
              : identity.recoveryauthority}
          </div>
          <IconDropdown
            items={[this.FIND_ID, this.COPY]}
            dropdownIconComponent={<MoreVertIcon fontSize="small" />}
            onSelect={(option) => this.selectOption(identity.recoveryauthority, option)}
          />
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={false}
        disabled={identity.privateaddress == null}
        onClick={
          identity.privateaddress == null
            ? () => {}
            : () => copyDataToClipboard(identity.privateaddress)
        }
      >
        <ExpansionPanelSummary
          expandIcon={null}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div style={{ fontWeight: "bold" }}>{"Private Address"}</div>
          <div
            style={{
              fontWeight: "bold",
              color: identity.privateaddress == null ? "unset" : "rgb(49, 101, 212)",
              flex: 1,
              textAlign: "right",
            }}
          >
            {identity.privateaddress == null ? "none" : identity.privateaddress}
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel square {...addrPanelProps}>
        <ExpansionPanelSummary
          expandIcon={numAddrs > 1 ? <ExpandMoreIcon /> : null}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <div style={{ fontWeight: "bold" }}>{`Primary Address${numAddrs > 1 ? "es" : ""}`}</div>
          <div
            style={{
              fontWeight: "bold",
              color: numAddrs > 1 ? "#878787" : "rgb(49, 101, 212)",
              flex: 1,
              textAlign: "right",
            }}
          >
            {`${identity.primaryaddresses[0]}${numAddrs > 1 ? ` + ${numAddrs - 1} more` : ""}`}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ maxHeight: 300, overflow: "scroll" }}>
          <ObjectToTable
            dataObj={Object.assign({}, identity.primaryaddresses)}
            pagination={false}
            paperStyle={{ width: "100%", height: "100%" }}
            paperProps={{ square: true }}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square disabled={content === 0}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <div style={{ fontWeight: "bold" }}>{"Content"}</div>
          <div
            style={{
              fontWeight: "bold",
              color: content === 0 ? "unset" : "#878787",
              flex: 1,
              textAlign: "right",
            }}
          >
            {`${content === 0 ? "no content" : `${content} item${content > 1 ? "s" : ""}`}`}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ maxHeight: 300, overflow: "scroll" }}>
          <ObjectToTable
            dataObj={identity.contentmap}
            pagination={false}
            paperStyle={{ width: "100%", height: "100%" }}
            paperProps={{ square: true }}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
};
