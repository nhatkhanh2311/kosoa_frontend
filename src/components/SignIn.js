import React, {useContext, useEffect, useState} from "react";
import axios from "../store/axios";
import secureStorage from "../store/secure-storage";
import signContext from "../store/sign-context";
import snackbarContext from "../store/snackbar-context";
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, TextField,
} from "@mui/material";

function SignIn() {
  const signCtx = useContext(signContext);
  const sbCtx = useContext(snackbarContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setValidations({});
    setShowPassword(false);
    setDisableButton(false);
  }, [signCtx.signIn]);

  const validate = () => {
    let validations = {
      username: false,
      password: false
    };
    let ok = true;
    if (username.length === 0) {
      validations.username = true;
      ok = false;
    }
    if (password.length < 8) {
      validations.password = true;
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
        .post("/sign-in", {
          username: username,
          password: password
        })
        .then((res) => {
          secureStorage.setItem("token", res.data["token"]);
          secureStorage.setItem("role", res.data["role"]);
          secureStorage.setItem("username", username);
          window.location.reload();
        })
        .catch((err) => {
          switch (err.response.data["message"]) {
            case "wrong password":
              setValidations({passwordWrong: true}); break;
            case "username not exist":
              setValidations({usernameWrong: true}); break;
            default:
              sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
          }
          setDisableButton(false);
        });
    }
  }

  return (
    <Dialog open={signCtx.signIn} onClose={signCtx.onNothing}>
      <DialogTitle sx={styles.title}>
        Đăng nhập
      </DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormControl sx={styles.form}>
            <TextField id="username" label="Tên đăng nhập" type="text" variant="standard"
                       fullWidth sx={styles.input} autoFocus error={validations.username || validations.usernameWrong}
                       helperText={validations.username ? "Tên đăng nhập không được để trống!" :
                         validations.usernameWrong ? "Tên đăng nhập không tồn tại!" : ""}
                       onChange={(e) => setUsername(e.currentTarget.value)}/>

            <TextField id="password" label="Mật khẩu" type={showPassword ? "text" : "password"} variant="standard"
                       fullWidth sx={styles.input} error={validations.password || validations.passwordWrong}
                       helperText={validations.password ? "Mật khẩu không ít hơn 8 ký tự!" :
                         validations.passwordWrong ? "Mật khẩu không đúng!" : ""}
                       onChange={(e) => setPassword(e.currentTarget.value)}/>

            <FormControlLabel control={<Checkbox/>} label="Hiện mật khẩu" checked={showPassword}
                              onChange={(e) => setShowPassword(e.currentTarget.checked)}/>

            <Button disabled={disableButton} variant="contained" color="success" sx={styles.button} type="submit">
              đăng nhập
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

export default SignIn;

const styles = {
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold"
  },
  form: {
    width: 400
  },
  input: {
    my: 1
  },
  button: {
    marginTop: 3,
    height: 50,
    mx: 2,
    fontSize: 18
  },
  error: {
    mt: 1,
    color: "red",
    textAlign: "center",
    fontWeight: "bold"
  }
}
