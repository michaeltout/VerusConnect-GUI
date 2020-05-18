import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TablePaginationActions from './TablePaginationActions';
import Paper from '@material-ui/core/Paper';


class ObjectToTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      rows: [],
      rowsPerPage: props.defaultRowsPerPage ? props.defaultRowsPerPage : -1,
      page: 0
    }

    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
  }

  handleChangePage(event, newPage) {
    this.setState({ page: newPage })
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0})
  };

  render() {
    const { props, state, handleChangePage, handleChangeRowsPerPage } = this
    const { pagination, dataObj, paperStyle, tableProps, paperProps } = props
    const { rowsPerPage, page } = state
    const rows = dataObj ? Object.keys(dataObj) : []
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    return (
      <Paper style={paperStyle} { ...paperProps }>
        <div style={{ overflow: "auto" }}>
          <Table { ...tableProps }>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map(row => (
                <TableRow key={row}>
                  <TableCell
                    className="text-capitalize"
                    component="th"
                    scope="row"
                  >
                    {row != null && !(typeof row === 'string' && row.length === 0) ? row.toString() : "-"}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ display: "flex", alignContent: "end" }}
                  >
                    <div
                      style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        maxWidth: 500
                      }}
                    >
                      {dataObj[row] != null && !(typeof row === 'string' && row.length === 0) ? dataObj[row].toString() : "-"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {pagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        )}
      </Paper>
    );
  }
}

ObjectToTable.propTypes = {
  dataObj: PropTypes.object.isRequired,
  pagination: PropTypes.bool,
  defaultRowsPerPage: PropTypes.number,
  paperStyle: PropTypes.object,
  tableProps: PropTypes.object,
  paperProps: PropTypes.object
};

export default ObjectToTable