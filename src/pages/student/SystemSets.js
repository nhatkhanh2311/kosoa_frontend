import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {Box} from "@mui/material";

import AppBarSets from "../../components/student/AppBarSets";
import SystemSetsWelcome from "../../components/student/SystemSetsWelcome";
import SystemSetsTable from "../../components/student/SystemSetsTable";

function SystemSets() {
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
          <SystemSetsWelcome/>
        </Box>
      </Route>

      <Route path="/student/sets/:level/:category">
        <Box width="20%" position="fixed">
          <AppBarSets/>
        </Box>

        <Box width="20%" mr={2}/>

        <Box width="80%">
          <SystemSetsTable/>
        </Box>
      </Route>
    </Box>
  );
}

export default SystemSets;
