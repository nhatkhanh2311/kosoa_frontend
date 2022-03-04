import React, {useContext, useEffect, useState} from "react";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {Avatar, Box, Card, CircularProgress, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {Group as GroupIcon} from "@mui/icons-material";

function AppBarClasses(props) {
  const sbCtx = useContext(snackbarContext);

  const [courses, setCourses] = useState([]);
  const [currentClass, setCurrentClass] = useState(-1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = () => {
    setLoading(true);
    axios
      .get("/classes/joined")
      .then((res) => {
        setCourses(res.data.courses);
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const selectClass = (index, id) => {
    setCurrentClass(index);
    props.render(id);
  }

  return (
    <Card elevation={6}>
      <Typography textAlign="center" fontSize={25} fontWeight="bold" my={2}>
        Lớp học đã tham gia
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : courses.map((course, index) => (
        <ListItem button selected={currentClass === index} onClick={() => selectClass(index, course.id)}>
          <ListItemAvatar>
            <Avatar variant="rounded" src={course.avatar}>
              <GroupIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={course.name} primaryTypographyProps={styles.primary}/>
        </ListItem>
      ))}
    </Card>
  );
}

export default AppBarClasses;

const styles = {

  primary: {
    fontWeight: "medium",
    fontSize: 20
  }
}
