import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import secureStorage from "./stores/secure-storage";
import {SignProvider} from "./stores/sign-context";
import {SnackbarProvider} from "./stores/snackbar-context";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SnackbarMessage from "./components/SnackbarMessage";
import Header from "./components/Header";
import Home from "./pages/Home";
import SetEdit from "./pages/admin/SetEdit";
import ChooseLevel from "./pages/student/ChooseLevel";
import SystemSets from "./pages/student/SystemSets";

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

            {/*Admin pages*/}

            <Route path="/admin/sets">
              {secureStorage.getItem("role") === "admin" ? (
                <SetEdit/>
              ) : (
                <Redirect to="/"/>
              )}
            </Route>

            {/*Student pages*/}

            <Route path="/student/choose-level">
              {secureStorage.getItem("role") === "student" ? (
                <ChooseLevel/>
              ) : (
                <Redirect to="/"/>
              )}
            </Route>

            <Route path="/student/sets">
              {secureStorage.getItem("role") === "student" ? (
                secureStorage.getItem("level") ? (
                  <SystemSets/>
                ) : (
                  <Redirect to="/student/choose-level"/>
                )
              ) : (
                <Redirect to="/"/>
              )}
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </SignProvider>
  );
}

export default App;
