import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {Box} from "@mui/material";

import AppBarSets from "../../components/student/AppBarSets";
import SystemSetWelcome from "../../components/student/SystemSetWelcome";
import SystemSetTable from "../../components/student/SystemSetTable";

function SystemSet() {
  useEffect(() => {
    document.title = "Học phần - KoSoA";
  }, []);

  return (
    <Box display="flex" mt={2}>
      <Route path="/student/sets/welcome">
        <Box width="20%" position="fixed">
          <AppBarSets/>
        </Box>

        <Box width="20%" mr={2}/>

        <Box width="80%">
          <SystemSetWelcome/>
        </Box>
      </Route>

      <Route path="/student/sets/:level/:category">
        <Box width="20%" position="fixed">
          <AppBarSets/>
        </Box>

        <Box width="20%" mr={2}/>

        <Box width="80%">
          <SystemSetTable/>
        </Box>
      </Route>
    </Box>
  );
}

export default SystemSet;
