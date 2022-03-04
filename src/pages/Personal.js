import React, {useEffect} from "react";
import {Box} from "@mui/material";

import PersonalInformation from "../components/PersonalInformation";

function Personal() {
  useEffect(() => {
    document.title = "Trang cá nhân - KoSoA";
  }, []);

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Box width="40%" minWidth={500}>
        <PersonalInformation/>
      </Box>
    </Box>
  );
}

export default Personal;
