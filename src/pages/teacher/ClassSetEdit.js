import React, {useState} from "react";
import {Box} from "@mui/material";

import ClassAppBarSets from "../../components/teacher/ClassAppBarSets";
import ClassSetEditTable from "../../components/teacher/ClassSetEditTable";

function ClassSetEdit() {
  const [setId, setSetId] = useState(-1);

  return (
    <Box display="flex" mt={2}>
      <Box width="25%" position="fixed">
        <ClassAppBarSets render={(id) => setSetId(id)}/>
      </Box>

      <Box width="25%" mr={2}/>

      <Box width="75%">
        {setId !== -1 && <ClassSetEditTable id={setId}/>}
      </Box>
    </Box>
  );
}

export default ClassSetEdit;
