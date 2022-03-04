import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Avatar, Box, Button, Card, CardHeader, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tab,
  Tabs, Tooltip, Typography
} from "@mui/material";
import {Clear as ClearIcon, Done as DoneIcon} from "@mui/icons-material";

function MembersList() {
  const {classId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [tab, setTab] = useState("accepted");
  const [members, setMembers] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    getData();
  }, [tab]);

  const getData = () => {
    setLoading(true);
    axios
      .post(`/members/${tab}`, {
        id: classId
      })
      .then((res) => {
        setMembers(res.data.members);
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const accept = (id) => {
    axios
      .post("/members/accept", {
        id: id
      })
      .then((res) => {
        getData();
        sbCtx.onSnackbar("Đã chấp nhận yêu cầu tham gia!", "success");
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const reject = (id) => {
    axios
      .post("/members/reject", {
        id: id
      })
      .then((res) => {
        getData();
        sbCtx.onSnackbar("Đã hủy yêu cầu tham gia!", "success");
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const deleteMember = (id) => {
    setDisabled(true);
    axios
      .post("/members/reject", {
        id: id
      })
      .then((res) => {
        getData();
        setDialog(false);
        setDisabled(false);
        sbCtx.onSnackbar("Đã xóa khỏi lớp học!", "success");
      })
      .catch((err) => {
        setDisabled(false);
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  return (
    <Card elevation={6}>
      <Tabs value={tab} centered onChange={(e, value) => setTab(value)}>
        <Tab label="thành viên" value="accepted"/>
        <Tab label="yêu cầu" value="requested"/>
      </Tabs>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : (
        <>
          {tab === "accepted" && members.map((member) => (
            <Grid container>
              <Grid item xs={8}>
                <CardHeader avatar={<Avatar src={member.avatar} component={Link}
                                            to={`/user/${member.userId}`} target="_blank"/>}
                            title={
                              <Typography sx={styles.title} component={Link} to={`/user/${member.userId}`} target="_blank">
                                {member.name}
                              </Typography>
                            }/>
              </Grid>

              <Grid item xs={4} display="flex" justifyContent="right" pr={2}>
                <Tooltip title="Xóa thành viên">
                  <IconButton onClick={() => setDialog(true)}>
                    <ClearIcon color="error"/>
                  </IconButton>
                </Tooltip>
              </Grid>

              <Dialog open={dialog} onClose={() => setDialog(false)}>
                <DialogTitle>
                  Bạn có chắc chắn muốn xóa {member.name} khỏi lớp học?
                </DialogTitle>

                <DialogContent>
                  <Box display="flex" justifyContent="space-evenly" mt={3}>
                    <Button disabled={disabled} color="success" variant="contained"
                            onClick={() => deleteMember(member.id)}>
                      chốt
                    </Button>

                    <Button disabled={disabled} color="error" variant="contained"
                            onClick={() => setDialog(false)}>
                      hủy
                    </Button>
                  </Box>
                </DialogContent>
              </Dialog>
            </Grid>
          ))}

          {tab === "requested" && members.map((member) => (
            <Grid container>
              <Grid item xs={8}>
                <CardHeader avatar={<Avatar src={member.avatar} component={Link}
                                            to={`/user/${member.userId}`} target="_blank"/>}
                            title={
                              <Typography sx={styles.title} component={Link} to={`/user/${member.userId}`} target="_blank">
                                {member.name}
                              </Typography>
                            }/>
              </Grid>

              <Grid item xs={4} display="flex" justifyContent="right" pr={2}>
                <Tooltip title="Đồng ý">
                  <IconButton onClick={() => accept(member.id)}>
                    <DoneIcon color="success"/>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Xóa">
                  <IconButton onClick={() => reject(member.id)}>
                    <ClearIcon color="error"/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </Card>
  );
}

export default MembersList;

const styles = {
  title: {
    fontWeight: "bold",
    textDecoration: "none"
  }
}
