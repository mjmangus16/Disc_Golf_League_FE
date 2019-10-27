import React from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import AppBar from "./Components/Layout/AppBar";
import Breadcrumbs from "./Components/Layout/Breadcrumbs";
import { green, blueGrey } from "@material-ui/core/colors";

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

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <AppBar />
        <Breadcrumbs />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
