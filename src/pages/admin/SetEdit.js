import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {Grid} from "@mui/material";

import AppBarSets from "../../components/admin/AppBarSets";
import SetEditWelcome from "../../components/admin/SetEditWelcome";
import SetEditTable from "../../components/admin/SetEditTable";

function SetEdit() {
  useEffect(() => {
    document.title = "Chỉnh sửa học phần - KoSoA"
  }, []);

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={2.5}>
        <AppBarSets/>
      </Grid>

      <Grid item xs={9.5}>
        <Route path="/admin/sets/welcome">
          <SetEditWelcome/>
        </Route>

        <Route path="/admin/sets/:level/:category">
          <SetEditTable/>
        </Route>
      </Grid>
    </Grid>
  );
}

export default SetEdit;
