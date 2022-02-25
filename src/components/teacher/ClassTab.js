import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Avatar, Badge, Box, Button, Card, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography
} from "@mui/material";
import {CameraAlt as CameraAltIcon, Group as GroupIcon, Launch as LaunchIcon} from "@mui/icons-material";

function ClassTab(props) {
  const sbCtx = useContext(snackbarContext);

  const [course, setCourse] = useState({});
  const [dialog, setDialog] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarEdit, setAvatarEdit] = useState(null);

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

  const uploadAvatar = () => {
    setDisabled(true);
    const formData = new FormData();
    formData.append("id", props.id.toString());
    formData.append("avatar", avatarEdit[0]);
    axios
      .post("/classes/avatar", formData)
      .then((res) => {
        getData();
        sbCtx.onSnackbar("Đổi ảnh đại diện thành công!", "success");
        setDisabled(false);
        setDialog(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
        setDisabled(false);
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
              <Badge overlap="circular" anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                     badgeContent={
                       <IconButton sx={styles.iconBox} onClick={() => setDialog(true)}>
                         <CameraAltIcon sx={styles.icon}/>
                       </IconButton>
                     }>
                <Avatar variant="rounded" src={course.avatar} sx={styles.avatar}>
                  <GroupIcon sx={styles.avatar}/>
                </Avatar>
              </Badge>
            </Box>
          </Box>

          <Dialog fullWidth open={dialog} onClose={() => setDialog(false)}>
            <DialogTitle>
              Đổi ảnh đại diện
            </DialogTitle>

            <DialogContent>
              <Box display="flex" justifyContent="center">
                <Button component="label">
                  tải ảnh lên
                  <input type="file" accept="image/*" hidden onChange={(e) => setAvatarEdit(e.currentTarget.files)}/>
                </Button>
              </Box>

              {avatarEdit !== null && (
                <Box display="flex" justifyContent="center" mt={3}>
                  <Avatar variant="rounded" src={URL.createObjectURL(avatarEdit[0])} sx={styles.avatar}/>
                </Box>
              )}

              <Box display="flex" justifyContent="space-evenly" mt={3}>
                <Button disabled={disabled || !avatarEdit} color="success" variant="contained" onClick={uploadAvatar}>
                  chốt
                </Button>

                <Button color="error" variant="contained" onClick={() => setDialog(false)}>
                  hủy
                </Button>
              </Box>
            </DialogContent>
          </Dialog>

          <Typography textAlign="center" fontSize={25} fontWeight="bold" my={2}>
            {course.name}
          </Typography>

          <Typography textAlign="justify" fontSize={18} my={4} mx={2}>
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
                      component={Link} to={`/teacher/class/${course.id}`}>
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
  iconBox: {
    backgroundColor: "#aaaaaa"
  },
  icon: {
    height: 35,
    width: 35
  },
  avatar: {
    height: 200,
    width: 200
  }
}
