import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

export default function OfferVisual(props) {
  const classes = useStyles();

  const customList = (items) => (
    items.map((value) => {
      return (
        <Paper onClick={value.onDetails} style={{ padding: 16 }}>
          <Typography style={{ margin: 0 }} variant="h6">
            {value.label}
          </Typography>
        </Paper>
      );
    })
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item style={{ flex: 1 }}>{customList(props.left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <SyncAltIcon fontSize='large'/>
        </Grid>
      </Grid>
      <Grid item style={{ flex: 1 }}>{customList(props.right)}</Grid>
    </Grid>
  );
}
