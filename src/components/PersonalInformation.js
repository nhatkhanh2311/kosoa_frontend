import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {
  Avatar, Badge, Box, Button, Card, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography
} from "@mui/material";
import {CameraAlt as CameraAltIcon} from "@mui/icons-material";
import moment from "moment";

function PersonalInformation() {
  const sbCtx = useContext(snackbarContext);

  const [id, setId] = useState(0);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [dialog, setDialog] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarEdit, setAvatarEdit] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .get("/users/personal")
      .then((res) => {
        setId(res.data.user.id);
        setUsername(res.data.user.username);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setBirthday(res.data.user.birthday);
        setPhone(res.data.user.phone);
        setRole(res.data.user.role);
        setAvatar(res.data.user.avatar);
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const uploadAvatar = () => {
    setDisabled(true);
    const formData = new FormData();
    formData.append("avatar", avatarEdit[0]);
    axios
      .post("/users/avatar", formData)
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
      <Typography textAlign="center" fontWeight="bold" fontSize={30} my={2}>
        Thông tin cá nhân
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : (
        <>
          <Box display="block">
            <Box sx={styles.badge}>
              <Badge overlap="circular" anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                     badgeContent={
                       <IconButton sx={styles.iconBox} onClick={() => setDialog(true)}>
                         <CameraAltIcon sx={styles.icon}/>
                       </IconButton>
                     }>
                <Avatar src={avatar} sx={styles.avatar}/>
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
                  <Avatar src={URL.createObjectURL(avatarEdit[0])} sx={styles.avatar}/>
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

          <Grid container spacing={2} mx={1} mt={1}>
            <Grid item xs={4}>
              <Typography>Tên đăng nhập:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{username}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} mx={1} mt={1}>
            <Grid item xs={4}>
              <Typography>Họ và tên:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{name}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} mx={1} mt={1}>
            <Grid item xs={4}>
              <Typography>Email:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{email}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} mx={1} mt={1}>
            <Grid item xs={4}>
              <Typography>Ngày sinh:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{moment(birthday).add(1, "d").format("DD/MM/YYYY")}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} mx={1} mt={1}>
            <Grid item xs={4}>
              <Typography>Điện thoại:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{phone}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} mx={1} my={1}>
            <Grid item xs={4}>
              <Typography>Chức năng:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {role === "student" && "Người học"}
                {role === "teacher" && "Người dạy"}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Card>
  );
}

export default PersonalInformation;

const styles = {
  badge: {
    mx: "auto",
    my: 2,
    height: 200,
    width: 200
  },
  avatar: {
    height: 200,
    width: 200
  },
  iconBox: {
    backgroundColor: "#aaaaaa"
  },
  icon: {
    height: 35,
    width: 35
  }
}
