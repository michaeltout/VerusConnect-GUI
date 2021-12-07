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
          backgroundColor: "#fff"
        }
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: MainFont,
      },
    },
    MuiTextField: {
      root: {
        fontFamily: MainFont,
      },
    },
    MuiFormLabel: {
      root: {
        fontFamily: MainFont,
      },
    },
    MuiInputBase: {
      root: {
        fontFamily: MainFont,
      },
    },
    MuiMenuItem: {
      root: {
        fontFamily: MainFont,
      },
    },
  },
});