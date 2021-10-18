import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#6b3152',
    },
    secondary: {
      main: '#adce7b',
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif;",
  },
  overrides: {
    MuiScopedCssBaseline:{
      root: {
        backgroundColor: '#fff',
        fontFamily: "'Roboto', sans-serif;",
        fontSize: '16px'
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none'
      },
    }, 
  }, 
});

export default theme;