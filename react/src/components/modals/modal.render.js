import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {
  ADD_COIN,
  CHAIN_INFO,
  ID_INFO,
  PBAAS_CHAIN_INFO,
  RECEIVE_COIN,
  SEND_COIN,
  TX_INFO,
  CSV_EXPORT,
  OPERATION_INFO,
  IMMATURE_DETAILS,
  CREATE_IDENTITY,
  SIGN_VERIFY_ID_DATA,
  SHIELDCOINBASE,
  CURRENCY_INFO
} from "../../util/constants/componentConstants";
import AddCoin from "./addCoin/addCoin";
import ChainInfo from "./chainInfo/chainInfo";
import IdInfo from "./idInfo/idInfo";
import CurrencyInfo from "./currencyInfo/currencyInfo";
import PbaasChainInfo from "./pbaasChainInfo/pbaasChainInfo";
import ReceiveCoin from "./receiveCoin/receiveCoin";
import SendCoin from "./sendCoin/sendCoin";
import CreateIdentity from "./createIdentity/createIdentity";
import TxInfo from "./txInfo/txInfo";
import ExportToCsv from "./exportToCsv/exportToCsv";
import OperationInfo from "./operationInfo/operationInfo";
import ImmatureDetails from "./immatureDetails/immatureDetails";
import SignVerifyIdData from "./signVerifyIdData/signVerifyIdData";
import ShieldCoinbase from "./shieldCoinbase/shieldCoinbase";

export const ModalRender = function() {
  const COMPONENT_PROPS = {
    setModalHeader: this.getModalHeader,
    modalPathArray: this.state.modalPath,
    setModalLock: this.getModalLock,
    closeModal: this.closeModal,
  }
  
  const COMPONENT_MAP = {
    [ADD_COIN]: (
      <AddCoin
        {...COMPONENT_PROPS}
      />
    ),
    [CHAIN_INFO]: (
      <ChainInfo
        {...COMPONENT_PROPS}
      />
    ),
    [ID_INFO]: (
      <IdInfo
        {...COMPONENT_PROPS}
      />
    ),
    [CURRENCY_INFO]: (
      <CurrencyInfo
        {...COMPONENT_PROPS}
      />
    ),
    [PBAAS_CHAIN_INFO]: (
      <PbaasChainInfo
        {...COMPONENT_PROPS}
      />
    ),
    [RECEIVE_COIN]: (
      <ReceiveCoin
        {...COMPONENT_PROPS}
      />
    ),
    [SEND_COIN]: (
      <SendCoin
        {...COMPONENT_PROPS}
      />
    ),
    [CREATE_IDENTITY]: (
      <CreateIdentity
        {...COMPONENT_PROPS}
      />
    ),
    [TX_INFO]: (
      <TxInfo
        {...COMPONENT_PROPS}
      />
    ),
    [CSV_EXPORT]: (
      <ExportToCsv
        {...COMPONENT_PROPS}
      />
    ),
    [OPERATION_INFO]: (
      <OperationInfo
        {...COMPONENT_PROPS}
      />
    ),
    [IMMATURE_DETAILS]: (
      <ImmatureDetails
        {...COMPONENT_PROPS}
      />
    ),
    [SIGN_VERIFY_ID_DATA]: (
      <SignVerifyIdData
        {...COMPONENT_PROPS}
      />
    ),
    [SHIELDCOINBASE]: (
      <ShieldCoinbase
        {...COMPONENT_PROPS}
      />
    )
  };

  return (
    <Dialog
      open={this.props.modalPathArray.length > 0}
      onClose={this.closeModal}
      fullWidth={true}
      disableBackdropClick={this.state.modalLock}
      disableEscapeKeyDown={this.state.modalLock}
      maxWidth="md"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        id="form-dialog-title"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
        disableTypography={true}
      >
        <h4>{this.state.modalHeader}</h4>
        <IconButton
          aria-label="Close Modal"
          onClick={this.closeModal}
          style={{ visibility: this.state.modalLock ? "hidden" : "unset" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          minHeight: 600
        }}
      >
        {COMPONENT_MAP[this.state.modalPath[0]]}
      </DialogContent>
    </Dialog>
  );
}


