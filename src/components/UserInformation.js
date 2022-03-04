import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Avatar, Box, Card, CircularProgress, Grid, Typography} from "@mui/material";
import moment from "moment";

function UserInformation() {
  const {userId} = useParams();
  const history = useHistory();
  const sbCtx = useContext(snackbarContext);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .post("/users/show", {
        id: parseInt(userId)
      })
      .then((res) => {
        if (res.data.message === "is personal") {
          history.replace("/personal");
        }
        else {
          setUsername(res.data.user.username);
          setName(res.data.user.name);
          setEmail(res.data.user.email);
          setBirthday(res.data.user.birthday);
          setPhone(res.data.user.phone);
          setRole(res.data.user.role);
          setAvatar(res.data.user.avatar);
          setLoading(false);
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
          <Box display="block" my={2}>
            <Avatar src={avatar} sx={styles.avatar}/>
          </Box>

          <Typography textAlign="center" fontWeight="bold" fontSize={30} my={2}>
            {name}
          </Typography>

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

export default UserInformation;

const styles = {
  avatar: {
    mx: "auto",
    height: 200,
    width: 200
  }
}
