import React, {useContext, useEffect} from "react";
import signContext from "../stores/sign-context";
import {Box, Button, Card, Grid, Typography} from "@mui/material";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import flashCard from "../assets/icons/flash-card.png";
import N3 from "../assets/icons/N3.png";
import presentation from "../assets/icons/presentation.png";
import logo from "../assets/logo/logo-lime.png";

function Home() {
  const signCtx = useContext(signContext);

  useEffect(() => {
    document.title = "KoSoA";
  }, []);

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Box width="70%">
        <Card elevation={6}>
          <Grid container>
            <Grid item xs={3} display="flex" justifyContent="left" alignItems="center">
              <img src={img1} alt="img1" width="80%"/>
            </Grid>

            <Grid item xs={6} my={2}>
              <Typography fontSize={20} fontWeight="medium" textAlign="center">
                Học thuật ngữ tiếng Nhật bằng các công cụ online.
                <br/>
                Hỗ trợ điều phối lớp học.
                <br/><br/>
                Để bắt đầu, chỉ cần một tài khoản!
              </Typography>

              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="success" onClick={signCtx.onSignUp}>
                  đăng ký ngay
                </Button>
              </Box>
            </Grid>

            <Grid item xs={3} display="flex" justifyContent="right" alignItems="center">
              <img src={img2} alt="img2" width="80%"/>
            </Grid>
          </Grid>
        </Card>

        <Box display="flex" justifyContent="center">
          <Box width="65%" mt={7}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center" height={250}>
                <img src={flashCard} alt="flashCard" height="70%"/>
              </Grid>

              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                <Typography fontSize={20} fontWeight="medium" textAlign="center" mr={2}>
                  Các công cụ học tập giúp ghi nhớ thuật ngữ nhanh chóng và hiệu quả
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Box width="65%" mt={7}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                <Typography fontSize={20} fontWeight="medium" textAlign="center" mr={2}>
                  Phân loại theo cấp độ học tập
                </Typography>
              </Grid>

              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center" height={250}>
                <img src={N3} alt="N3" height="70%"/>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Box width="65%" mt={7}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center" height={250}>
                <img src={presentation} alt="presentation" height="70%"/>
              </Grid>

              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                <Typography fontSize={20} fontWeight="medium" textAlign="center" mr={2}>
                  Hỗ trợ chức năng lớp học
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" my={5}>
          <img src={logo} alt="logo" height={120}/>
        </Box>

        <Box display="flex" justifyContent="center" my={2}>
          <Button variant="contained" color="success" onClick={signCtx.onSignUp}>
            đăng ký ngay
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
