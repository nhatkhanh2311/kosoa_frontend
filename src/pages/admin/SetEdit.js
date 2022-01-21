import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {Box} from "@mui/material";

import AppBarSets from "../../components/admin/AppBarSets";
import SetEditWelcome from "../../components/admin/SetEditWelcome";
import SetEditTable from "../../components/admin/SetEditTable";

function SetEdit() {
  useEffect(() => {
    document.title = "Chỉnh sửa học phần - KoSoA";
  }, []);

  return (
    <Box display="flex" mt={2}>
      <Route path="/admin/sets/welcome">
        <Box width="20%" position="fixed">
          <AppBarSets/>
        </Box>

        <Box width="20%" mr={2}/>

        <Box width="80%">
          <SetEditWelcome/>
        </Box>
      </Route>

      <Route path="/admin/sets/:level/:category">
        <Box width="20%" position="fixed">
          <AppBarSets/>
        </Box>

        <Box width="20%" mr={2}/>

        <Box width="80%">
          <SetEditTable/>
        </Box>
      </Route>
    </Box>
  );
}

export default SetEdit;
