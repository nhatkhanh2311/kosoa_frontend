import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import signContext from "../stores/sign-context";
import snackbarContext from "../stores/snackbar-context";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, Radio,
  RadioGroup, TextField, Typography
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {vi} from "date-fns/locale";

function SignUp() {
  const signCtx = useContext(signContext);
  const sbCtx = useContext(snackbarContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("student");
  const [validations, setValidations] = useState({});
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setRepass("");
    setName("");
    setEmail("");
    setBirthday(null);
    setPhone("");
    setValidations({});
    setDisableButton(false);
  }, [signCtx.signUp]);

  const validate = () => {
    let validations = {
      username: false,
      usernameSpace: false,
      password: false,
      passwordSpace: false,
      repass: false,
      name: false,
      email: false,
      phone: false
    };
    let ok = true;
    if (username.length === 0) {
      validations.username = true;
      ok = false;
    }
    if (username.includes(" ")) {
      validations.usernameSpace = true;
      ok = false;
    }
    if (password.length < 8) {
      validations.password = true;
      ok = false;
    }
    if (password.includes(" ")) {
      validations.passwordSpace = true;
      ok = false;
    }
    if (repass !== password) {
      validations.repass = true;
      ok = false;
    }
    if (name.length === 0) {
      validations.name = true;
      ok = false;
    }
    if (email.length === 0) {
      validations.email = true;
      ok = false;
    }
    if (!(phone.length === 0 || /^\d+$/.test(phone))) {
      validations.phone = true;
      ok = false;
    }
    setValidations(validations);
    return ok;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setDisableButton(true);
      axios
        .post("/sign-up", {
          user: {
            username: username,
            password: password,
            name: name,
            email: email,
            birthday: birthday,
            phone: phone,
            role: role
          }
        })
        .then((res) => {
          sbCtx.onSnackbar("Đăng ký tài khoản thành công!", "success");
          signCtx.onNothing();
        })
        .catch((err) => {
          switch (err.response.data.message) {
            case "username taken":
              setValidations({usernameTaken: true}); break;
            case "email taken":
              setValidations({emailTaken: true}); break;
            default:
              sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
          }
          setDisableButton(false);
        });
    }
  }

  return (
    <Dialog open={signCtx.signUp} onClose={signCtx.onNothing} fullWidth>
      <DialogTitle sx={styles.title}>
        Tạo tài khoản
      </DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth>
            <Grid container spacing={1}>
              <Grid item md={2}/>

              <Grid item md={8}>
                <TextField id="username" label="Tên đăng nhập" type="text" variant="outlined"
                           fullWidth sx={{mt: 0.7}} autoFocus
                           error={validations.username || validations.usernameSpace || validations.usernameTaken}
                           helperText={validations.username ? "Tên đăng nhập không được để trống!" :
                             validations.usernameSpace ? "Tên đăng nhập không được có khoảng trắng!" :
                               validations.usernameTaken ? "Tên đăng nhập đã được sử dụng!" : ""}
                           onChange={(e) => setUsername(e.currentTarget.value)}/>
              </Grid>

              <Grid item md={6}>
                <TextField id="password" label="Mật khẩu" type="password" variant="outlined"
                           fullWidth sx={styles.input} error={validations.password || validations.passwordSpace}
                           helperText={validations.password ? "Mật khẩu không ít hơn 8 ký tự!" :
                             validations.passwordSpace ? "Mật khẩu không được có khoảng trắng!" : ""}
                           onChange={(e) => setPassword(e.currentTarget.value)}/>
              </Grid>

              <Grid item md={6}>
                <TextField id="repass" label="Nhập lại mật khẩu" type="password" variant="outlined"
                           fullWidth sx={styles.input} error={validations.repass}
                           helperText={validations.repass ? "Chưa khớp với mật khẩu!" : ""}
                           onChange={(e) => setRepass(e.currentTarget.value)}/>
              </Grid>

              <Grid item md={6}>
                <TextField id="name" label="Họ và tên" type="text" variant="outlined"
                           fullWidth sx={styles.input} error={validations.name}
                           helperText={validations.name ? "Tên không được để trống!" : ""}
                           onChange={(e) => setName(e.currentTarget.value)}/>
              </Grid>

              <Grid item md={6}>
                <TextField id="email" label="Địa chỉ email" type="email" variant="outlined"
                           fullWidth sx={styles.input} error={validations.email || validations.emailTaken}
                           helperText={validations.email ? "Email không được để trống!" :
                             validations.emailTaken ? "Email đã được sử dụng!" : ""}
                           onChange={(e) => setEmail(e.currentTarget.value)}/>
              </Grid>

              <Grid item md={6}>
                <Box sx={styles.input}>
                  <LocalizationProvider id="birthday" dateAdapter={AdapterDateFns} locale={vi}>
                    <DatePicker label="Ngày sinh (không bắt buộc)" variant="standard" cancelText="Hủy"
                                onChange={(newDate) => setBirthday(newDate)} value={birthday}
                                renderInput={(params) => <TextField {...params}/>}/>
                  </LocalizationProvider>
                </Box>
              </Grid>

              <Grid item md={6}>
                <TextField id="phone" label="Số điện thoại (không bắt buộc)" type="text" variant="outlined"
                           fullWidth sx={styles.input} error={validations.phone}
                           helperText={validations.phone ? "Số điện thoại chỉ bao gồm chữ số!" : ""}
                           onChange={(e) => setPhone(e.currentTarget.value)}/>
              </Grid>
            </Grid>

            <Typography sx={styles.role}>
              Chức năng tài khoản
            </Typography>

            <RadioGroup row value={role} onChange={(e) => setRole(e.currentTarget.value)}>
              <Grid container spacing={2}>
                <Grid item md={6} sx={styles.radio}>
                  <FormControlLabel control={<Radio/>} label="Người học" value="student"/>
                </Grid>
                <Grid item md={6} sx={styles.radio}>
                  <FormControlLabel control={<Radio/>} label="Người dạy" value="teacher"/>
                </Grid>
              </Grid>
            </RadioGroup>

            <Grid container spacing={2}>
              <Grid item md={6} sx={styles.radio}>
                <Typography>
                  Bạn có thể học theo chương trình của web hoặc tham gia lớp học của người dạy.
                </Typography>
              </Grid>

              <Grid item md={6} sx={styles.radio}>
                <Typography>
                  Bạn có thể tạo lớp học của riêng bạn.
                </Typography>
              </Grid>
            </Grid>

            <Button disabled={disableButton} variant="contained" color="success" sx={styles.button} type="submit">
              đăng ký
            </Button>
          </FormControl>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={signCtx.onNothing}>hủy</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignUp;

const styles = {
  title: {
    fontSize: 30,
    textAlign: "center",
    mb: 0.5,
    fontWeight: "bold"
  },
  input: {
    my: 0
  },
  button: {
    mt: 3,
    height: 50,
    mx: 5,
    fontSize: 18
  },
  role: {
    mt: 2,
    textAlign: "center",
    color: "black",
    fontSize: 20
  },
  radio: {
    textAlign: "center"
  }
}
