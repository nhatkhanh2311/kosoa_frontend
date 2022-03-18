import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Avatar, Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl,
  ListItem, ListItemAvatar, ListItemText, Pagination, TextField, Typography
} from "@mui/material";
import {Add as AddIcon, Group as GroupIcon} from "@mui/icons-material";

function ClassAppBarSets(props) {
  const {classId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [course, setCourse] = useState({});
  const [sets, setSets] = useState([]);
  const [currentSet, setCurrentSet] = useState(-1);
  const [dialog, setDialog] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validateName, setValidateName] = useState(false);
  const [disabled, setDisabled]= useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

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
        document.title = `${res.data.course.name} - KoSoA`;
        getSets();
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const getSets = () => {
    axios
      .post("/sets/index", {
        id: classId
      })
      .then((res) => {
        setSets(res.data.sets);
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const addSet = () => {
    if (name.trim().length > 0) {
      setDisabled(true);
      setValidateName(false);
      axios
        .post("/sets/create", {
          set: {
            name: name.trim(),
            description: description.trim(),
            course_id: parseInt(classId)
          }
        })
        .then((res) => {
          sbCtx.onSnackbar("Tạo học phần thành công!", "success");
          setDisabled(false);
          setDialog(false);
          getSets();
        })
        .catch((err) => {
          sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
          setDisabled(false);
        });
    }
    else {
      setValidateName(true);
    }
  }

  const selectSet = (index, id) => {
    setCurrentSet(index);
    props.render(id);
  }

  const handlePage = (e, value) => {
    setPage(value);
  }

  return (
    <Card elevation={6}>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : (
        <>
          <ListItem sx={{mb: 3}}>
            <ListItemAvatar>
              <Avatar variant="rounded" src={course.avatar} sx={styles.avatar}><GroupIcon/></Avatar>
            </ListItemAvatar>
            <ListItemText primary={course.name} primaryTypographyProps={styles.title}/>
          </ListItem>

          {sets.map((set, index) => (
            <>
            <ListItem button selected={currentSet === index} onClick={() => selectSet(index, set.id)}>
              <ListItemText primary={set.name} primaryTypographyProps={styles.primary}
                            secondary={set.description.length > 35 ? set.description.substring(0, 35) + "..." : set.description}
                            secondaryTypographyProps={styles.secondary}/>
            </ListItem>

              <Divider/>
            </>
          ))}

          <Box display="flex" justifyContent="center" my={1}>
            <Pagination color="success" size="small" shape="rounded"
                        count={Math.ceil(sets.length / 5)} page={page} onChange={handlePage}/>
          </Box>

          <ListItem button sx={styles.addButton} onClick={() => setDialog(true)}>
            <AddIcon/>
            <Typography ml={1}>Tạo học phần mới</Typography>
          </ListItem>

          <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth>
            <DialogTitle sx={styles.titleDialog}>
              Tạo học phần
            </DialogTitle>

            <DialogContent>
              <FormControl fullWidth>
                <Typography>
                  TÊN HỌC PHẦN
                </Typography>

                <TextField type="text" variant="standard" fullWidth autoFocus
                           error={validateName} helperText={validateName ? "Tên học phần là bắt buộc!" : ""}
                           onChange={(e) => setName(e.currentTarget.value)}/>

                <Typography mt={2}>
                  MÔ TẢ
                </Typography>

                <TextField type="text" multiline rows={5} variant="standard" fullWidth
                           onChange={(e) => setDescription(e.currentTarget.value)}/>

                <Button disabled={disabled} variant="contained" color="success" sx={styles.button} onClick={addSet}>
                  <AddIcon/>
                  <Typography fontSize={20} ml={1}>
                    tạo
                  </Typography>
                </Button>
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDialog(false)}>hủy</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Card>
  );
}

export default ClassAppBarSets;

const styles = {
  avatar: {
    height: 50,
    width: 50,
    mr: 2
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  primary: {
    fontWeight: "medium",
    fontSize: 18
  },
  secondary: {
    fontSize: 15
  },
  addButton: {
    display: "flex",
    justifyContent: "center",
    height: 50,
    fontSize: 20,
    color: "blue"
  },
  titleDialog: {
    mb: 0.5,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold"
  },
  button: {
    mt: 3,
    mx: 5,
    height: 50,
    fontSize: 18
  }
}
