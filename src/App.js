import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {SignProvider} from "./store/sign-context";
import {SnackbarProvider} from "./store/snackbar-context";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SnackbarMessage from "./components/SnackbarMessage";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <SignProvider>
      <SnackbarProvider>
        <Router>
          <SignIn/>
          <SignUp/>

          <SnackbarMessage/>

          <Header/>

          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </SignProvider>
  );
}

export default App;
