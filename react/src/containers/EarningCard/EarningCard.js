/*
The MIT License (MIT)

Copyright (c) 2015 Mui-Treasury

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Divider, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import WalletPaper from '../WalletPaper/WalletPaper';

const useStyles = makeStyles(theme => ({
  root: {
    //borderRadius: 12,
    //minWidth: 256,
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
    spacing: 10,
  },
  list: {
    padding: '20px',
  },
  button: {
    margin: theme.spacing(1),
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

const EarningCard = (props) => {
  const classes = useStyles();
  const { title, content, cardProps, cardStyle, mainValue, subValueTop, subValueBottom } = props

  return (
    <WalletPaper className={classes.root} style={{ padding: 0, display: "flex", flexDirection: "column", ...cardStyle }} {...cardProps}>
      <div className={classes.header} style={{ fontWeight: "bold" }}>
        {title}
      </div>
      <Divider variant="middle" />
      <CardContent style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        { subValueTop }
        <h5 style={{ margin: 0, color: "black", fontSize: 24 }}>
          { mainValue }
        </h5>
        { subValueBottom }
      </CardContent>
    </WalletPaper>
  );
};

EarningCard.propTypes = {
  title: PropTypes.string,
  mainValue: PropTypes.string,
  subValueTop: PropTypes.any,
  subValueBottom: PropTypes.any,
  cardStyle: PropTypes.object,
  cardProps: PropTypes.object
};


export default EarningCard;