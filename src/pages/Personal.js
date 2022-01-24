import React, {useEffect} from "react";
import {Box} from "@mui/material";

import PersonalInformation from "../components/PersonalInformation";

function Personal() {
  useEffect(() => {
    document.title = "Trang cá nhân - KoSoA";
  }, []);

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Box width="40%" position="fixed">
        <PersonalInformation/>
      </Box>

      <Box width="40%" mr={2}/>

      <Box width="40%">
      </Box>
    </Box>
  );
}

export default Personal;
