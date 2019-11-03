import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import AppBar from "./Components/Layout/AppBar";
import Breadcrumbs from "./Components/Layout/Breadcrumbs";
import Routes from "./Routes";
import { green, blueGrey } from "@material-ui/core/colors";
import { decodeToken } from "./utils/decodeToken";

decodeToken(store);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[300]
    }
    // secondary: {
    //   main: blue[700]
    // },
    // type: "dark"
  }
});

const App = () => {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <AppBar />
            <Breadcrumbs />
            <Routes />
          </Router>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
