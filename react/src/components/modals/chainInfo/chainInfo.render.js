import React from 'react';
import ObjectToTable from '../../../containers/ObjectToTable/ObjectToTable'

export const ChainInfoRender = function() {
  return (
    <div className="col-xs-12 margin-top-20 backround-gray" style={{ width: "90%" }}>
      <ObjectToTable 
        dataObj={ this.props.info }
        pagination={ false }
        paperStyle={{ marginBottom: 40 }}
      /> 
    </div>
  );
}


