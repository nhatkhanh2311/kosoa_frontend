import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Avatar, Box, Card, CircularProgress, Divider, ListItem, ListItemAvatar, ListItemText, Pagination
} from "@mui/material";
import {Group as GroupIcon} from "@mui/icons-material";

function ClassAppBarSets(props) {
  const {classId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [course, setCourse] = useState({});
  const [sets, setSets] = useState([]);
  const [currentSet, setCurrentSet] = useState(-1);
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

          {sets.slice((page - 1) * 5, page * 5).map((set, index) => (
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
  }
}
