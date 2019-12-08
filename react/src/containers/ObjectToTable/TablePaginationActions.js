import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


class TablePaginationActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      rowsPerPage: props.defaultRowsPerPage ? props.defaultRowsPerPage : -1
    }

    this.handleFirstPageButtonClick = this.handleFirstPageButtonClick.bind(this)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this)
    this.handleLastPageButtonClick = this.handleLastPageButtonClick.bind(this)
  }

  handleFirstPageButtonClick = event => {
    const { onChangePage } = this.props;

    onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    const { page, onChangePage } = this.props;

    onChangePage(event, page - 1);
  };

  handleNextButtonClick = event => {
    const { page, onChangePage } = this.props;

    onChangePage(event, page + 1);
  };

  handleLastPageButtonClick = event => {
    const { count, rowsPerPage, onChangePage } = this.props;

    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  render() {
    const { handleFirstPageButtonClick, handleBackButtonClick, handleLastPageButtonClick, handleNextButtonClick, props } = this
    const { count, page, rowsPerPage } = props;
  
    return (
      <div style={{ display: "flex" }}>
        <IconButton
          onClick={ handleFirstPageButtonClick }
          disabled={ page === 0 }
          aria-label="first page"
        >
          <FirstPageIcon />
        </IconButton>

        <IconButton onClick={ handleBackButtonClick } disabled={page === 0} aria-label="previous page">
          <KeyboardArrowLeft />
        </IconButton>

        <IconButton
          onClick={ handleNextButtonClick }
          disabled={ page >= Math.ceil(count / rowsPerPage) - 1 }
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
        
        <IconButton
          onClick={ handleLastPageButtonClick }
          disabled={ page >= Math.ceil(count / rowsPerPage) - 1 }
          aria-label="last page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    );
  }

}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationActions