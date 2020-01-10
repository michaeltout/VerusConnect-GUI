import React from 'react';
import { connect } from 'react-redux';
import { 
  OperationInfoRender,
} from './operationInfo.render';
import {
  OPERATION_INFO,
} from "../../../util/constants/componentConstants";
import { timeConverter } from '../../../util/displayUtil/timeUtils';

class OperationInfo extends React.Component {
  constructor(props) {
    super(props);

    props.setModalHeader("Pending Transaction Info")
    this.modalObj = this.generateOperationInfo(props)
  }

  // To be called from constructor
  generateOperationInfo(props) {
    const { opObj } = props
    
    let opDataSchema = {
      ["Status"]: opObj.status,
      ["Daemon Command"]: opObj.method,
      ["Transaction ID"]: opObj.result ? opObj.result.txid : null,
      ["Creation Time"]: timeConverter(opObj.creation_time),
      ["Completion time (seconds)"]: opObj.execution_secs,
      ["Operation ID"]: opObj.id,
      ["From"]: opObj.params.from,
      ["Amount"]: opObj.params.amounts[0].amount,
      ["Fee"]: opObj.params.fee,
      ["Result"]: opObj.error ? opObj.error.message : null
    };

    Object.keys(opDataSchema).forEach(opDataKey => {
      if (opDataSchema[opDataKey] == null) delete opDataSchema[opDataKey]
    })

    return opDataSchema
  }

  render() {
    return OperationInfoRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    opObj: state.modal[OPERATION_INFO].opObj ? state.modal[OPERATION_INFO].opObj : {},
  };
};

export default connect(mapStateToProps)(OperationInfo);