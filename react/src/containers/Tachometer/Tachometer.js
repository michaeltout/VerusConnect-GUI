import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';

function Tachometer(props) {
  const { value, style, label, labelStyle, tachColor } = props;
  const [initializing, setInitializing] = useState(true);

  // Run little init animation on load
  useEffect(() => {
    setTimeout(() => {
      setInitializing(false);
    }, 700);
  }, []);

  return (
    <PieChart
      data={[{ value: 1, key: 1, color: tachColor == null ? "url(#gradient1)" : tachColor }]}
      startAngle={135}
      lengthAngle={270}
      lineWidth={10}
      background="#bfbfbf"
      style={style}
      labelPosition={0}
      reveal={initializing ? 100 : value}
      label={() => label}
      rounded
      animate
      injectSvg={() => (
        <defs>
          <linearGradient id="gradient1">
            <stop offset="0%" stopColor="rgb(0,178,26)" />
            <stop offset="45%" stopColor="#ffb961" />
            <stop offset="55%" stopColor="#ffb961" />
            <stop offset="100%" stopColor="rgb(236,43,43)" />
          </linearGradient>
        </defs>
      )}
      labelStyle={{
        fill: "black",
        //fontWeight: "bold",
        ...labelStyle
      }}
    />
  );
}

Tachometer.propTypes = {
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  tachColor: PropTypes.string
};

export default Tachometer