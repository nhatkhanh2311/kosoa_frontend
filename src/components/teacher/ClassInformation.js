import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Avatar, Badge, Box, Button, Card, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField,
  Tooltip, Typography
} from "@mui/material";
import {
  CameraAlt as CameraAltIcon, Cancel as CancelIcon, Edit as EditIcon, Group as GroupIcon, Launch as LaunchIcon,
  Save as SaveIcon
} from "@mui/icons-material";

function ClassInformation() {
  const {classId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [members, setMembers] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarEdit, setAvatarEdit] = useState(null);
  const [nameEdit, setNameEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [edit, setEdit] = useState("");
  const [disabledEdit, setDisabledEdit] = useState(false);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    getData();
  }, [classId]);

  const getData = () => {
    setLoading(true);
    axios
      .post("/classes/show", {
        id: classId
      })
      .then((res) => {
        setName(res.data.course.name);
        setDescription(res.data.course.description);
        setAvatar(res.data.course.avatar);
        setMembers(res.data.course.members);
        setLoading(false);
        document.title = `${res.data.course.name} - KoSoA`;
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const uploadAvatar = () => {
    setDisabled(true);
    const formData = new FormData();
    formData.append("id", classId.toString());
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

  const editInfo = (type) => {
    let ok = true;
    if (type === "name" && nameEdit.trim().length === 0) {
      setValidation(true);
      ok = false;
    }
    if (ok) {
      setDisabledEdit(true);
      setValidation(false);
      axios
        .post("/classes/update", type === "name" ? {
          id: classId,
          course: {
            name: nameEdit.trim()
          }
        } : {
          id: classId,
          course: {
            description: descriptionEdit.trim()
          }
        })
        .then((res) => {
          sbCtx.onSnackbar("Cập nhật thông tin thành công!", "success");
          switch (type) {
            case "name": setName(nameEdit); break;
            case "description": setDescription(descriptionEdit); break;
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
    setDescriptionEdit(description);
    setValidation(false);
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
                <Avatar variant="rounded" src={avatar} sx={styles.avatar}>
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

          <Grid container my={2}>
            {edit === "name" ? (
              <>
                <Grid item xs={11} display="flex" alignItems="center">
                  <TextField type="text" variant="standard" value={nameEdit}
                             fullWidth disabled={disabledEdit} error={validation}
                             helperText={validation && "Tên học phần là bắt buộc!"}
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
                <Grid item xs={11} display="flex" justifyContent="center" alignItems="center" pl={1}>
                  <Typography textAlign="center" fontSize={25} fontWeight="bold">
                    {name}
                  </Typography>
                </Grid>

                <Grid item xs={1} display="flex" alignItems="center">
                  <Tooltip title="Sửa">
                    <IconButton onClick={() => setEditType("name")}>
                      <EditIcon color="success"/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            )}
          </Grid>

          <Grid container my={4}>
            {edit === "description" ? (
              <>
                <Grid item xs={11} display="flex" alignItems="center">
                  <TextField type="text" multiline rows={5} variant="standard" value={descriptionEdit}
                             fullWidth disabled={disabledEdit}
                             onChange={(e) => setDescriptionEdit(e.currentTarget.value)}/>
                </Grid>

                <Grid item xs={1}>
                  <Tooltip title="Lưu" placement="top">
                    <IconButton onClick={() => editInfo("description")}>
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
                <Grid item xs={11} display="flex" alignItems="center" pl={1}>
                  <Typography textAlign="justify" whiteSpace="pre-line" fontSize={18}>
                    {description}
                  </Typography>
                </Grid>

                <Grid item xs={1} display="flex" alignItems="center">
                  <Tooltip title="Sửa">
                    <IconButton onClick={() => setEditType("description")}>
                      <EditIcon color="success"/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            )}
          </Grid>

          <Box display="flex" color="#3f6600" ml={2} mb={2}>
            <GroupIcon/>
            <Typography fontSize={18} ml={0.5}>
              {members} thành viên
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" my={2}>
            <Button color="success" variant="outlined" endIcon={<LaunchIcon/>}
                    component={Link} to={`/teacher/class-sets/${classId}`}>
              Học phần
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
}

export default ClassInformation;

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
