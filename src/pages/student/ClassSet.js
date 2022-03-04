import React, {useState} from "react";
import {Box} from "@mui/material";

import ClassAppBarSets from "../../components/student/ClassAppBarSets";
import ClassSetTable from "../../components/student/ClassSetTable";

function ClassSet() {
  const [setId, setSetId] = useState(-1);

  return (
    <Box display="flex" mt={2}>
      <Box width="20%" position="fixed">
        <ClassAppBarSets render={(id) => setSetId(id)}/>
      </Box>

      <Box width="20%" mr={2}/>

      <Box width="80%">
        {setId !== -1 && <ClassSetTable id={setId}/>}
      </Box>
    </Box>
  );
}

export default ClassSet;
