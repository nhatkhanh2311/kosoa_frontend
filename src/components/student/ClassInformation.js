import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Avatar, Box, Button, Card, CircularProgress, Dialog, DialogContent, DialogTitle, ToggleButton, ToggleButtonGroup,
  Typography
} from "@mui/material";
import {AddBox as AddBoxIcon, Cancel as CancelIcon, Group as GroupIcon} from "@mui/icons-material";

function ClassInformation(props) {
  const {classId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [course, setCourse] = useState({});
  const [joined, setJoined] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [tab, setTab] = useState(1);

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
        setCourse(res.data.course);
        checkJoined();
        document.title = `${res.data.course.name} - KoSoA`;
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const checkJoined = () => {
    axios
      .post("/members/check" , {
        id: classId
      })
      .then((res) => {
        switch (res.data.message) {
          case "no request": setJoined(0); break;
          case "accepted": setJoined(1); break;
          case "requested": setJoined(2);
        }
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const request = () => {
    setDisabled(true);
    axios
      .post("/members/create", {
        id: classId
      })
      .then((res) => {
        setDisabled(false);
        setJoined(2);
        sbCtx.onSnackbar("Đã gửi yêu cầu tham gia!", "success");
      })
      .catch((err) => {
        setDisabled(false);
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const cancelRequest = () => {
    setDisabled(true);
    axios
      .post("/members/destroy", {
        id: classId
      })
      .then((res) => {
        setDisabled(false);
        setJoined(0);
        sbCtx.onSnackbar(joined === 2 ? "Xóa yêu cầu thành công!" : "Rời lớp học thành công!", "success");
        if (joined === 1) window.location.reload();
      })
      .catch((err) => {
        setDisabled(false);
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const changeTab = (e, value) => {
    setTab(value);
    props.render(value);
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
              <Avatar variant="rounded" src={course.avatar} sx={styles.avatar}>
                <GroupIcon sx={styles.avatar}/>
              </Avatar>
            </Box>
          </Box>

          <Typography textAlign="center" fontSize={25} fontWeight="bold" my={2}>
            {course.name}
          </Typography>

          <Typography textAlign="justify" fontSize={18} my={4} mx={2}>
            {course.description}
          </Typography>

          <Box display="flex" color="#3f6600" ml={2} mb={2}>
            <GroupIcon/>
            <Typography fontSize={18} ml={0.5}>
              {course.members} thành viên
            </Typography>
          </Box>

          {joined === 1 && (
          <Box display="flex" justifyContent="center" my={2}>
            <ToggleButtonGroup color="success" orientation="vertical" value={tab} exclusive sx={styles.group}
                               onChange={changeTab}>
              <ToggleButton value={1}>
                Thông báo
              </ToggleButton>

              <ToggleButton value={2}>
                Học phần
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          )}

          <Box display="flex" justifyContent="center" mb={2}>
            <Button color={joined === 0 ? "success" : "error"} variant="contained" disabled={disabled}
                    startIcon={joined === 0 ? <AddBoxIcon/> : <CancelIcon/>}
                    onClick={joined === 0 ? request : joined === 2 ? cancelRequest : () => setDialog(true)}>
              {joined === 0 ? "yêu cầu tham gia" : joined === 2 ? "hủy yêu cầu" : "rời khỏi lớp học"}
            </Button>
          </Box>

          <Dialog open={dialog} onClose={() => setDialog(false)}>
            <DialogTitle>
              Bạn có chắc chắn muốn rời khỏi lớp học này?
            </DialogTitle>

            <DialogContent>
              <Box display="flex" justifyContent="space-evenly" mt={3}>
                <Button disabled={disabled} color="success" variant="contained"
                        onClick={cancelRequest}>
                  chốt
                </Button>

                <Button disabled={disabled} color="error" variant="contained"
                        onClick={() => setDialog(false)}>
                  hủy
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Card>
  );
}

export default ClassInformation;

const styles = {
  avatar: {
    height: 200,
    width: 200
  },
  group: {
    width: "50%"
  }
}
