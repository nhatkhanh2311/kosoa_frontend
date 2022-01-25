import React from "react";
import {Box} from "@mui/material";

import SystemTermDetails from "../components/SystemTermDetails";
import SystemTermComments from "../components/SystemTermComments";

function SystemTerm() {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Box width="40%" maxWidth={600} mr={2}>
        <SystemTermDetails/>
      </Box>

      <Box width="40%" maxWidth={600}>
        <SystemTermComments/>
      </Box>
    </Box>
  );
}

export default SystemTerm;
