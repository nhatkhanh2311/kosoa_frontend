import React, {useContext, useEffect, useState} from "react";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {Avatar, Box, Button, Card, CircularProgress, Grid, Typography} from "@mui/material";
import {Group as GroupIcon, Launch as LaunchIcon} from "@mui/icons-material";
import {Link} from "react-router-dom";

function ClassTab(props) {
  const sbCtx = useContext(snackbarContext);

  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [props.id]);

  const getData = () => {
    setLoading(true);
    axios
      .post("/classes/show", {
        id: props.id
      })
      .then((res) => {
        setCourse(res.data.course);
        setLoading(false);
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
          <Box display="block">
            <Box height={200} width={200} mx="auto" my={2}>
              <Avatar variant="rounded" src={course.avatar} sx={styles.avatar}>
                <GroupIcon sx={styles.avatar}/>
              </Avatar>
            </Box>
          </Box>

          <Typography textAlign="center" fontSize={25} fontWeight="bold" my={2}>
            {course.name}
          </Typography>

          <Typography textAlign="justify" whiteSpace="pre-line" fontSize={18} my={4} mx={2}>
            {course.description}
          </Typography>

          <Grid container spacing={1} px={2} mb={1}>
            <Grid item xs={6} display="flex" color="#3f6600">
              <GroupIcon/>
              <Typography fontSize={18} ml={0.5}>
                {course.members} thành viên
              </Typography>
            </Grid>

            <Grid item xs={6} display="flex" justifyContent="right">
              <Button color="success" variant="outlined" endIcon={<LaunchIcon/>}
                      component={Link} to={`/student/class/${course.id}`}>
                Chi tiết
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Card>
  );
}

export default ClassTab;

const styles = {
  avatar: {
    height: 200,
    width: 200
  }
}
