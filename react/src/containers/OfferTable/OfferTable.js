import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import OfferVisual from '../OfferVisual/OfferVisual';
import useKeyPress from '../../hooks/useKeyPress';
import { closeTextDialog, openTextDialog } from '../../actions/actionDispatchers';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function getSideLabel(offerSide) {
  return offerSide.length > 1 ? `${offerSide[0].label} + ${offerSide.length - 1} more` : offerSide[0].label
}

function openCloseOfferModal(onClose) {
  openTextDialog(
    closeTextDialog,
    [
      {
        title: "No",
        onClick: async () => {              
          closeTextDialog()
        },
      },
      {
        title: "Yes",
        onClick: async () => {              
          closeTextDialog()
          onClose()
        },
      },
    ],
    `Are you sure you would like to cancel this offer?`,
    "Cancel offer?"
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const overrideButtonDisable = useKeyPress('Alt')
  const classes = useRowStyles();
  const [takeOpen, setTakeOpen] = React.useState(false);
  const [destinationAddress, setDestinationAddress] = React.useState("");
  const [changeAddress, setChangeAddress] = React.useState("");

  return (
    <React.Fragment>
      <TableRow className={classes.root} onClick={() => setOpen(!open)}>
        <TableCell>{getSideLabel(row.offering)}</TableCell>
        <TableCell>{getSideLabel(row.for)}</TableCell>
        <TableCell>{`at block ${row.expiring}`}</TableCell>
        <TableCell align="right">
          <Button
            aria-label="expand row"
            onClick={() => setOpen(!open)}
            startIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          >
            Details
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <OfferVisual left={row.for} right={row.offering} />
              {takeOpen && (
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      Take offer?
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Enter a change address and a receiving address to take this offer.
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
                      <TextField
                        label={"Change address"}
                        variant="outlined"
                        onChange={(e) => setChangeAddress(e.target.value)}
                        value={changeAddress}
                      />
                      <TextField
                        label={"Receiving address"}
                        variant="outlined"
                        onChange={(e) => setDestinationAddress(e.target.value)}
                        value={destinationAddress}
                        style={{
                          marginTop: 8,
                        }}
                      />
                    </div>
                  </CardContent>
                  <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => setTakeOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => row.onTake(destinationAddress, changeAddress)}
                    >
                      Take Offer
                    </Button>
                  </CardActions>
                </Card>
              )}
              <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  aria-label="close offer"
                  onClick={() => openCloseOfferModal(row.onClose)}
                  color="secondary"
                  disabled={!overrideButtonDisable && !row.canClose}
                  style={{
                    marginBottom: 8,
                    marginTop: 8,
                  }}
                >
                  Cancel Offer
                </Button>
                {!takeOpen && (
                  <Button
                    variant="contained"
                    aria-label="take offer"
                    onClick={() => setTakeOpen(!takeOpen)}
                    color="primary"
                    disabled={!overrideButtonDisable && !row.canTake}
                    style={{
                      marginLeft: 16,
                      marginBottom: 8,
                      marginTop: 8,
                    }}
                  >
                    Take Offer
                  </Button>
                )}
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    offering: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        onDetails: PropTypes.func.isRequired
      }),
    ).isRequired,
    for: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        onDetails: PropTypes.func.isRequired
      }),
    ).isRequired,
    expiring: PropTypes.string.isRequired,
    onTake: PropTypes.func,
    onClose: PropTypes.func,
    canTake: PropTypes.bool,
    canClose: PropTypes.bool
  }).isRequired,
};

export default function OfferTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Offering</TableCell>
            <TableCell>For</TableCell>
            <TableCell>Expiring</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}