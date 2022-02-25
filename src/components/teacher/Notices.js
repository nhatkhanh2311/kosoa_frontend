import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Box, Button, Card, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl,
  Pagination, TextField, Typography
} from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material";
import moment from "moment";

function Notices() {
  const {classId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [notices, setNotices] = useState([]);
  const [fabVariant, setFabVariant] = useState("circular");
  const [dialog, setDialog] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
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
  }

  const onSubmit = () => {
    if (content.trim().length > 0) {
      setValidate(false);
      setDisabled(true);
      axios
        .post("/notices/create", {
          notice: {
            content: content,
            course_id: classId
          }
        })
        .then((res) => {
          getData();
          sbCtx.onSnackbar("Thêm thông báo thành công!", "success");
          setDisabled(false);
          setDialog(false);
        })
        .catch((err) => {
          sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
          setDisabled(false);
        });
    }
    else {
      setValidate(true);
    }
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
      ) : (
        <>
          <Fab color="primary" aria-label="add" variant={fabVariant} sx={styles.fab}
               onMouseEnter={() => setFabVariant("extended")}
               onMouseLeave={() => setFabVariant("circular")}
               onClick={() => setDialog(true)}>
            {fabVariant === "circular" ? (
              <AddIcon/>
            ) : (
              <Typography maxHeight>Tạo thông báo</Typography>
            )}
          </Fab>

          <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth>
            <DialogTitle sx={styles.title}>
              Thông báo
            </DialogTitle>

            <DialogContent>
              <FormControl fullWidth>
                <TextField type="text" multiline rows={10} variant="standard" fullWidth autoFocus
                           error={validate} helperText={validate ? "Vui lòng điền thông báo!" : ""}
                           onChange={(e) => setContent(e.currentTarget.value)}/>

                <Button disabled={disabled} variant="contained" color="success" sx={styles.button} onClick={onSubmit}>
                  tạo
                </Button>
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDialog(false)}>hủy</Button>
            </DialogActions>
          </Dialog>

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
      )}
    </Container>
  );
}

export default Notices;

const styles = {
  fab: {
    mb: 2,
    height: 50
  },
  title: {
    mb: 0.5,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold"
  },
  button: {
    mt: 3,
    mx: 10,
    height: 50,
    fontSize: 18
  },
  card: {
    mb: 3,
    mr: 3
  }
}
