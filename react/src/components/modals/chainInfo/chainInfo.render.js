import React from 'react';
import ObjectToTable from '../../../containers/ObjectToTable/ObjectToTable'

export const ChainInfoRender = function() {
  return (
    <div className="col-xs-12 backround-gray" style={{ width: "90%", marginBottom: 20 }}>
      <ObjectToTable 
        dataObj={ this.props.info }
        pagination={ false }
        paperStyle={{ marginBottom: 40 }}
      /> 
    </div>
  );
}


