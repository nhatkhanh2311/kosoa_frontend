import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {Grid} from "@mui/material";

import AppBarSets from "../../components/student/AppBarSets";
import SystemSetsWelcome from "../../components/student/SystemSetsWelcome";
import SystemSetsTable from "../../components/student/SystemSetsTable";

function SystemSets() {
  useEffect(() => {
    document.title = "Học phần - KoSoA";
  }, []);

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={2.5}>
        <AppBarSets/>
      </Grid>

      <Grid item xs={9.5}>
        <Route path="/student/sets/welcome">
          <SystemSetsWelcome/>
        </Route>

        <Route path="/student/sets/:level/:category">
          <SystemSetsTable/>
        </Route>
      </Grid>
    </Grid>
  );
}

export default SystemSets;
