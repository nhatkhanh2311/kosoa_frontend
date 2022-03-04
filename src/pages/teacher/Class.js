import React from "react";
import {Box} from "@mui/material";

import ClassInformation from "../../components/teacher/ClassInformation";
import Notices from "../../components/teacher/Notices";
import MembersList from "../../components/teacher/MembersList";

function Class() {
  return (
    <Box display="flex" mt={2}>
      <Box width="30%" position="fixed">
        <ClassInformation/>
      </Box>

      <Box width="30%" mr={2}/>

      <Box width="40%">
        <Notices/>
      </Box>

      <Box width="30%">
        <MembersList/>
      </Box>
    </Box>
  );
}

export default Class;
