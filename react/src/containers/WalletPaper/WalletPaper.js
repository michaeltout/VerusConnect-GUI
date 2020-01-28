import React from 'react';
import Paper from '@material-ui/core/Paper';

function WalletPaper(props) {
  const { children, style, ...otherProps } = props;

  return (
    <Paper
      elevation={0}
      style={{
        padding: 16,
        border: "solid",
        borderWidth: 1,
        borderColor: "#e3e6f0",
        ...style
      }}
      square
      { ...otherProps }
    >
      { children }
    </Paper>
  );
}

export default WalletPaper
