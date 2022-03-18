import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {Box, Card, CircularProgress, Container,Pagination, Typography} from "@mui/material";
import moment from "moment";

function Notices() {
  const {classId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .post("/members/check", {
        id: classId
      })
      .then((res) => {
        if (res.data.message === "accepted") {
          axios
            .post("/notices/index", {
              id: classId
            })
            .then((res) => {
              setNotices(res.data.notices);
              setLoading(false);
            })
            .catch((err) => {
              sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
            });
          setJoined(true);
        }
        else {
          setLoading(false);
          setJoined(false);
        }
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const handlePage = (e, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  }

  return (
    <Container>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : joined ? (
        <>
          {notices.slice((page - 1) * 5, page * 5).map((notice) => (
            <Card elevation={6} sx={styles.card}>
              <Typography fontSize={18} whiteSpace="pre-line" mx={2} my={2}>
                {notice.content}
              </Typography>

              <Typography fontStyle="italic" textAlign="right" mx={2} my={2}>
                {moment(notice.created_at).fromNow()}
              </Typography>
            </Card>
          ))}

          <Box display="flex" justifyContent="center">
            <Pagination color="success" count={Math.ceil(notices.length / 5)} page={page} onChange={handlePage}/>
          </Box>
        </>
      ) : (
        <Card elevation={6} sx={styles.card}>
          <Typography fontSize={18} color="red" mx={2} my={2}>
            Bạn chưa tham gia lớp học này!
          </Typography>
        </Card>
      )}
    </Container>
  );
}

export default Notices;

const styles = {
  card: {
    mb: 3,
    mr: 3
  }
}
