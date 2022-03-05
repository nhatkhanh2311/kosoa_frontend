import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Avatar, Box, Card, CircularProgress, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {Group as GroupIcon} from "@mui/icons-material";

function UserClasses() {
  const {userId} = useParams();
  const history = useHistory();
  const sbCtx = useContext(snackbarContext);

  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = () => {
    setLoading(true);
    axios
      .post("/users/show", {
        id: parseInt(userId)
      })
      .then((res) => {
        setRole(res.data.user.role);
        setName(res.data.user.name);
        switch (res.data.user.role) {
          case "student":
            axios
              .post("classes/joined-user", {
                id: userId
              })
              .then((res) => {
                setCourses(res.data.courses);
                setLoading(false);
              })
              .catch((err) => {
                sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
              });
            break;
          case "teacher":
            axios
              .post("classes/index-user", {
                id: userId
              })
              .then((res) => {
                setCourses(res.data.courses);
                setLoading(false);
              })
              .catch((err) => {
                sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
              });
            break;
        }
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  return (
    <Card elevation={6}>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : (
        <>
          <Typography textAlign="center" fontSize={25} fontWeight="bold" my={2}>
            {role === "student" && `Lớp học đã tham gia`}
            {role === "teacher" && `Lớp học của ${name}`}
          </Typography>

          {courses.map((course) => (
            <ListItem button onClick={() => history.push(`/student/class/${course.id}`)}>
              <ListItemAvatar>
                <Avatar variant="rounded" src={course.avatar}>
                  <GroupIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={course.name} primaryTypographyProps={styles.primary}/>
            </ListItem>
          ))}
        </>
      )}
    </Card>
  );
}

export default UserClasses;

const styles = {
  primary: {
    fontWeight: "medium",
    fontSize: 20
  }
}
