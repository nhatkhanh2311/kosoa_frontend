import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {
  Avatar, Badge, Box, Button, Card, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField,
  Tooltip, Typography
} from "@mui/material";
import {
  CameraAlt as CameraAltIcon, Cancel as CancelIcon, Edit as EditIcon, Save as SaveIcon
} from "@mui/icons-material";
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
  const [nameEdit, setNameEdit] = useState("");
  const [phoneEdit, setPhoneEdit] = useState("");
  const [edit, setEdit] = useState("");
  const [disabledEdit, setDisabledEdit] = useState(false);
  const [validation, setValidation] = useState(false);

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

  const editInfo = (type) => {
    let ok = true;
    switch (type) {
      case "name": if (nameEdit.length === 0) {
        setValidation(true);
        ok = false;
      } break;
      case "phone": if (!(phoneEdit.length === 0 || /^\d+$/.test(phoneEdit))) {
        setValidation(true);
        ok = false;
      } break;
    }
    if (ok) {
      setDisabledEdit(true);
      setValidation(false);
      axios
        .post("/users/update", type === "name" ? {
          user: {
            name: nameEdit
          }
        } : {
          user: {
            phone: phoneEdit
          }
        })
        .then((res) => {
          sbCtx.onSnackbar("Cập nhật thông tin thành công!", "success");
          switch (type) {
            case "name": setName(nameEdit); break;
            case "phone": setPhone(phoneEdit); break;
          }
          setEdit("");
          setDisabledEdit(false);
        })
        .catch((err) => {
          sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
          setDisabledEdit(false);
        });
    }
  }

  const setEditType = (type) => {
    setEdit(type);
    setNameEdit(name);
    setPhoneEdit(phone);
    setValidation(false);
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

          <Grid container spacing={2} px={2} mt={1}>
            <Grid item xs={4}>
              <Typography>Tên đăng nhập:</Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography>{username}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} px={2} mt={0.5}>
            <Grid item xs={4} display="flex" alignItems="center">
              <Typography>Họ và tên:</Typography>
            </Grid>
            {edit === "name" ? (
              <>
                <Grid item xs={7} display="flex" alignItems="center">
                  <TextField type="text" variant="standard" value={nameEdit}
                             fullWidth disabled={disabledEdit} error={validation}
                             helperText={validation && "Tên không được để trống!"}
                             onChange={(e) => setNameEdit(e.currentTarget.value)}/>
                </Grid>

                <Grid item xs={1}>
                  <Tooltip title="Lưu" placement="top">
                    <IconButton onClick={() => editInfo("name")}>
                      <SaveIcon color="success"/>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Hủy">
                    <IconButton onClick={() => setEditType("")}>
                      <CancelIcon color="error"/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={7} display="flex" alignItems="center">
                  <Typography>{name}</Typography>
                </Grid>

                <Grid item xs={1}>
                  <Tooltip title="Sửa">
                    <IconButton onClick={() => setEditType("name")}>
                      <EditIcon color="success"/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            )}
          </Grid>

          <Grid container spacing={2} px={2} mt={0.5}>
            <Grid item xs={4}>
              <Typography>Email:</Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography>{email}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} px={2} mt={1}>
            <Grid item xs={4}>
              <Typography>Ngày sinh:</Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography>{moment(birthday).add(1, "d").format("DD/MM/YYYY")}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} px={2} mt={1}>
            <Grid item xs={4} display="flex" alignItems="center">
              <Typography>Điện thoại:</Typography>
            </Grid>
            {edit === "phone" ? (
              <>
                <Grid item xs={7} display="flex" alignItems="center">
                  <TextField type="text" variant="standard" value={phoneEdit}
                             fullWidth disabled={disabledEdit} error={validation}
                             helperText={validation && "Số điện thoại chỉ bao gồm chữ số!"}
                             onChange={(e) => setPhoneEdit(e.currentTarget.value)}/>
                </Grid>

                <Grid item xs={1}>
                  <Tooltip title="Lưu" placement="top">
                    <IconButton onClick={() => editInfo("phone")}>
                      <SaveIcon color="success"/>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Hủy">
                    <IconButton onClick={() => setEditType("")}>
                      <CancelIcon color="error"/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={7} display="flex" alignItems="center">
                  <Typography>{phone}</Typography>
                </Grid>

                <Grid item xs={1}>
                  <Tooltip title="Sửa">
                    <IconButton onClick={() => setEditType("phone")}>
                      <EditIcon color="success"/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            )}
          </Grid>

          <Grid container spacing={2} px={2} my={1}>
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
