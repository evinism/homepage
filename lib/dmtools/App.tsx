import React from "react";
import DicePage from "./pages/DicePage";
import DiceTablePage from "./pages/DiceTablePage/DiceTablePage";
import HomePage from "./pages/HomePage";
import styles from "./dmtools.module.css";
import { MemoryRouter as Router, Link, Switch, Route } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Link as MuiLink,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const HeaderLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link to={to}>
    <MuiLink className={styles.headerLink} color="textPrimary">
      {children}
    </MuiLink>
  </Link>
);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className={styles.App}>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5">Evin's DM Tools</Typography>
              <nav>
                <HeaderLink to="/dice">Dice Roller</HeaderLink>
                <HeaderLink to="/tables">Dice Tables</HeaderLink>
              </nav>
            </Toolbar>
          </AppBar>
          <div>
            <Switch>
              <Route path="/dice">
                <DicePage />
              </Route>
              <Route path="/tables">
                <DiceTablePage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
