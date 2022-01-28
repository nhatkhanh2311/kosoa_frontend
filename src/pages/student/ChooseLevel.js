import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "../../stores/axios";
import secureStorage from "../../stores/secure-storage";
import snackbarContext from "../../stores/snackbar-context";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";

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
            <Typography fontSize={30} mt={3}>Căn bản</Typography>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(6)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography fontSize={30} mt={3}>N5</Typography>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(5)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography fontSize={30} mt={3}>N4</Typography>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(4)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography fontSize={30} mt={3}>N3</Typography>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(3)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography fontSize={30} mt={3}>N2</Typography>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(2)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography fontSize={30} mt={3}>N1</Typography>

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
    height: 200,
    width: 400,
    display: "inline-block"
  },
  button: {
    mt: 2
  }
}
