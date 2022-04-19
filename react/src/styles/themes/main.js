import { createMuiTheme } from "@material-ui/core";

const MainFont = 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji'

export default createMuiTheme({
  palette: {
    primary: {
      main: "#3165D4",
    },
    secondary: {
      main: "#D4313E",
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          margin: 0,
          fontFamily: MainFont,
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5,
          color: '#858796',
          textAlign: 'left',
          backgroundColor: "#fff",
          textTransform: 'none',
        }
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: MainFont,
        textTransform: 'none',
      },
    },
    MuiTextField: {
      root: {
        fontFamily: MainFont,
        textTransform: 'none',
      },
    },
    MuiFormLabel: {
      root: {
        fontFamily: MainFont,
        textTransform: 'none',
      },
    },
    MuiInputBase: {
      root: {
        fontFamily: MainFont,
        textTransform: 'none',
      },
    },
    MuiMenuItem: {
      root: {
        fontFamily: MainFont,
        textTransform: 'none',
      },
    },
    MuiTab: {
      root: {
        fontFamily: MainFont,
        textTransform: 'none',
      },
    },
  },
});