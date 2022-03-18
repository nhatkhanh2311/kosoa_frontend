import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "../../stores/axios";
import secureStorage from "../../stores/secure-storage";
import snackbarContext from "../../stores/snackbar-context";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import basicIcon from "../../assets/icons/basic.png";
import N5Icon from "../../assets/icons/N5.png";
import N4Icon from "../../assets/icons/N4.png";
import N3Icon from "../../assets/icons/N3.png";
import N2Icon from "../../assets/icons/N2.png";
import N1Icon from "../../assets/icons/N1.png";

function ChooseLevel() {
  const history = useHistory();
  const sbCtx = useContext(snackbarContext);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    document.title = "Chọn cấp độ - KoSoA";
  }, []);

  const setLevel = (level) => {
    setDisabled(true);
    axios
      .post("/users/choose-level", {
        level: level
      })
      .then((res) => {
        secureStorage.setItem("level", `${level}`);
        history.push("/student/sets/welcome");
      })
      .catch((err) => {
        setDisabled(false);
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  return (
    <>
      <Typography textAlign="center" fontSize={30} my={4}>
        Chọn cấp độ bạn đang học
      </Typography>

      <Box textAlign="center">
        <Card sx={styles.card}>
          <CardContent>
            <Typography fontSize={30} mt={1}>Căn bản</Typography>

            <Box display="flex" justifyContent="center">
              <img src={basicIcon} alt="basic" height={150}/>
            </Box>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(6)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography fontSize={30} mt={1}>N5</Typography>

            <Box display="flex" justifyContent="center">
              <img src={N5Icon} alt="N5" height={150}/>
            </Box>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(5)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography fontSize={30} mt={1}>N4</Typography>

            <Box display="flex" justifyContent="center">
              <img src={N4Icon} alt="N4" height={150}/>
            </Box>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(4)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography fontSize={30} mt={1}>N3</Typography>

            <Box display="flex" justifyContent="center">
              <img src={N3Icon} alt="N3" height={150}/>
            </Box>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(3)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography fontSize={30} mt={1}>N2</Typography>

            <Box display="flex" justifyContent="center">
              <img src={N2Icon} alt="N2" height={150}/>
            </Box>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(2)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography fontSize={30} mt={1}>N1</Typography>

            <Box display="flex" justifyContent="center">
              <img src={N1Icon} alt="N1" height={150}/>
            </Box>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(1)}>
              chọn
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default ChooseLevel;

const styles = {
  card: {
    mx: 2,
    my: 2,
    height: 300,
    width: 400,
    display: "inline-block"
  },
  button: {
    mt: 2
  }
}
