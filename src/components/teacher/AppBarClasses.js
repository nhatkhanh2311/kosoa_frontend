import React, {useContext, useEffect, useState} from "react";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Avatar, Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, ListItem,
  ListItemAvatar, ListItemText, Pagination, TextField, Typography
} from "@mui/material";
import {Add as AddIcon, Group as GroupIcon} from "@mui/icons-material";

function AppBarClasses(props) {
  const sbCtx = useContext(snackbarContext);

  const [courses, setCourses] = useState([]);
  const [currentClass, setCurrentClass] = useState(-1);
  const [dialog, setDialog] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validateName, setValidateName] = useState(false);
  const [disabled, setDisabled]= useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = () => {
    setLoading(true);
    axios
      .get("/classes/index")
      .then((res) => {
        setCourses(res.data.courses);
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const addClass = () => {
    if (name.trim().length > 0) {
      setDisabled(true);
      setValidateName(false);
      axios
        .post("/classes/create", {
          course: {
            name: name.trim(),
            description: description.trim()
          }
        })
        .then((res) => {
          sbCtx.onSnackbar("Tạo lớp học thành công!", "success");
          setDisabled(false);
          setDialog(false);
          getClasses();
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

  const selectClass = (index, id) => {
    setCurrentClass(index);
    props.render(id);
  }

  const handlePage = (e, value) => {
    setPage(value);
  }

  return (
    <Card elevation={6}>
      <Typography textAlign="center" fontSize={25} fontWeight="bold" my={2}>
        Lớp học của bạn
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : (
        <>
          {courses.slice((page - 1) * 7, page * 7).map((course, index) => (
            <ListItem button selected={currentClass === index} onClick={() => selectClass(index, course.id)}>
              <ListItemAvatar>
                <Avatar variant="rounded" src={course.avatar}>
                  <GroupIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={course.name} primaryTypographyProps={styles.primary}/>
            </ListItem>
          ))}

          <Box display="flex" justifyContent="center" my={1}>
            <Pagination color="success" size="small" shape="rounded"
                        count={Math.ceil(courses.length / 7)} page={page} onChange={handlePage}/>
          </Box>

          <ListItem button sx={styles.addButton} onClick={() => setDialog(true)}>
            <AddIcon/>
            <Typography ml={1}>Tạo lớp học mới</Typography>
          </ListItem>

          <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth>
            <DialogTitle sx={styles.title}>
              Tạo lớp học
            </DialogTitle>

            <DialogContent>
              <FormControl fullWidth>
                <Typography>
                  TÊN LỚP
                </Typography>

                <TextField type="text" variant="standard" fullWidth autoFocus
                           error={validateName} helperText={validateName ? "Tên lớp là bắt buộc!" : ""}
                           onChange={(e) => setName(e.currentTarget.value)}/>

                <Typography mt={2}>
                  MÔ TẢ
                </Typography>

                <TextField type="text" multiline rows={5} variant="standard" fullWidth
                           onChange={(e) => setDescription(e.currentTarget.value)}/>

                <Button disabled={disabled} variant="contained" color="success" sx={styles.button} onClick={addClass}>
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

export default AppBarClasses;

const styles = {
  title: {
    mb: 0.5,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold"
  },
  addButton: {
    display: "flex",
    justifyContent: "center",
    height: 50,
    fontSize: 20,
    color: "blue"
  },
  button: {
    mt: 3,
    mx: 5,
    height: 50,
    fontSize: 18
  },
  primary: {
    fontWeight: "medium",
    fontSize: 20
  }
}
