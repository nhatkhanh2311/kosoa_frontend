import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "../../stores/axios";
import secureStorage from "../../stores/secure-storage";
import snackbarContext from "../../stores/snackbar-context";
import {Button, Card, CardContent, Stack, Typography} from "@mui/material";

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
      .post("/choose-level", {
        level: level
      })
      .then((res) => {
        secureStorage.setItem("level", level);
        history.push("/temp");
      })
      .catch((err) => {
        setDisabled(false);
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  return (
    <>
      <Typography textAlign="center" fontSize={30} my={4}>
        Chọn cấp độ bạn muốn học
      </Typography>

      <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
        <Card sx={styles.card}>
          <CardContent>
            <Typography textAlign="center" fontSize={30} mt={3}>Căn bản</Typography>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(6)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography textAlign="center" fontSize={30} mt={3}>N5</Typography>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(5)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography textAlign="center" fontSize={30} mt={3}>N4</Typography>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(4)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography textAlign="center" fontSize={30} mt={3}>N3</Typography>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(3)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography textAlign="center" fontSize={30} mt={3}>N2</Typography>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(2)}>
              chọn
            </Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography textAlign="center" fontSize={30} mt={3}>N1</Typography>

            <Button disabled={disabled} variant="contained" color="success" sx={styles.button}
                    onClick={() => setLevel(1)}>
              chọn
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}

export default ChooseLevel;

const styles = {
  card: {
    height: 200,
    width: 200
  },
  button: {
    mt: 5,
    mx: 6
  }
}
