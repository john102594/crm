import {createMuiTheme} from '@material-ui/core/styles';
import {blue, grey, cyan} from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: "#f44336",
    },
    action: {
      active: "#fff",
    },
    properties: {
      border: "1px solid rgba(0,0,0,0.12)",
      background: "#263238",
      contrastText: "#fff",
      textcolor: grey[400],
      hover: "#222d32",
      hoverP: cyan[700],
      active: "#fff",
    },
  },
});

export default theme;