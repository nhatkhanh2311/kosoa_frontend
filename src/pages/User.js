import React from "react";
import {Box} from "@mui/material";

import UserInformation from "../components/UserInformation";
import UserClasses from "../components/UserClasses";

function User() {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Box width="30%" minWidth={400} mr={2}>
        <UserInformation/>
      </Box>

      <Box width="30%">
        <UserClasses/>
      </Box>
    </Box>
  );
}

export default User;
