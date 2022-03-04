import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";

import AppBarClasses from "../../components/student/AppBarClasses";
import ClassTab from "../../components/student/ClassTab";

function Classes() {
  const [classId, setClassId] = useState(-1);

  useEffect(() => {
    document.title = "Danh sách lớp học - KoSoA";
  }, []);

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Box width="30%" maxWidth={450} mr={2}>
        <AppBarClasses render={(id) => setClassId(id)}/>
      </Box>

      <Box width="40%" maxWidth={600}>
        {classId !== -1 && <ClassTab id={classId}/>}
      </Box>
    </Box>
  );
}

export default Classes;
