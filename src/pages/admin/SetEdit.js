import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {Box, Grid} from "@mui/material";

import AppBarSets from "../../components/admin/AppBarSets";
import SetEditWelcome from "../../components/admin/SetEditWelcome";
import SetEditTable from "../../components/admin/SetEditTable";

function SetEdit() {
  useEffect(() => {
    document.title = "Chỉnh sửa học phần - KoSoA";
  }, []);

  return (
    <Box display="flex" mt={2}>
      <Box width="20%" position="sticky" mr={2}>
        <AppBarSets/>
      </Box>

      <Box width="80%">
        <Route path="/admin/sets/welcome">
          <SetEditWelcome/>
        </Route>

        <Route path="/admin/sets/:level/:category">
          <SetEditTable/>
        </Route>
      </Box>
    </Box>
  );
}

export default SetEdit;
