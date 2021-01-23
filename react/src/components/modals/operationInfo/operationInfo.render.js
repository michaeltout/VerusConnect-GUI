import React from 'react';
import ObjectToTable from '../../../containers/ObjectToTable/ObjectToTable'

export const OperationInfoRender = function() {
  const { modalObj } = this

  return (
    <div
      className="col-xs-12 margin-top-20 backround-gray"
      style={{
        width: this.props.inline ? "100%" : "90%",
      }}
    >
      <ObjectToTable dataObj={ modalObj } pagination={false} />
    </div>
  );
}


