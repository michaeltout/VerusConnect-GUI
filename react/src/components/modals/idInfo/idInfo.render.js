import React from 'react';
import ObjectToTable from '../../../containers/ObjectToTable/ObjectToTable'

export const IdInfoRender = function() {
  return (
    <div className="col-xs-12 backround-gray" style={{ width: "90%", marginBottom: 20 }}>
      <ObjectToTable 
        dataObj={ this.displayObj }
        pagination={ false }
        paperStyle={{ marginBottom: 40 }}
      /> 
    </div>
  );
}


