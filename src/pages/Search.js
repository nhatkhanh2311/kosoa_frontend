import React, {useContext, useEffect, useMemo, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {
  Avatar, Box, Card, CardContent, CardHeader, CircularProgress, Grid, IconButton, Tab, Tabs, Tooltip, Typography
} from "@mui/material";
import {Category as CategoryIcon, Launch as LaunchIcon, Stairs as StairsIcon} from "@mui/icons-material";
import moment from "moment";

function Search() {
  const query = useQuery();
  const sbCtx = useContext(snackbarContext);

  const [tab, setTab] = useState("student");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Tìm kiếm - KoSoA";
  }, []);

  useEffect(() => {
    getData();
  }, [query.get("value"), tab]);

  const getData = () => {
    setLoading(true);
    axios
      .post(`/search/${tab}`, {
        search: query.get("value")
      })
      .then((res) => {
        setResults(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Card elevation={6} sx={styles.card}>
        <Typography fontWeight="medium" fontSize={20} mt={2} mx={2}>
          Kết quả tìm kiếm cho: {query.get("value")}
        </Typography>

        <Box mb={2}>
          <Tabs value={tab} centered onChange={(e, value) => setTab(value)}>
            <Tab label="Người học" value="student"/>
            <Tab label="Người dạy" value="teacher"/>
            <Tab label="Lớp học" value="class"/>
            <Tab label="Thuật ngữ" value="term"/>
          </Tabs>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress color="success"/>
          </Box>
        ) : (
          <Box mt={2}>
            {(tab === "teacher" || tab === "student") && results.map((user) => (
              <Card sx={styles.cardChild}>
                <CardHeader avatar={<Avatar src={user.avatar} component={Link} to={`/user/${user.id}`}/>}
                            title={
                              <Typography sx={styles.title} component={Link} to={`/user/${user.id}`}>
                                {user.name}
                              </Typography>
                            }
                            subheader={user.username}/>

                <CardContent>
                  <Grid container spacing={2} mx={1}>
                    <Grid item xs={4}>
                      <Typography>Email:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{user.email}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mx={1}>
                    <Grid item xs={4}>
                      <Typography>Ngày sinh:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{moment(user.birthday).add(1, "d").format("DD/MM/YYYY")}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mx={1}>
                    <Grid item xs={4}>
                      <Typography>Điện thoại:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{user.phone}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}

            {tab === "class" && results.map((course) => (
              <Card sx={styles.cardChild}>
                <CardHeader avatar={<Avatar variant="rounded" src={course.avatar} component={Link}
                                            to={`/student/class/${course.id}`}/>}
                            title={
                              <Typography sx={styles.title} component={Link} to={`/student/class/${course.id}`}>
                                {course.name}
                              </Typography>
                            }
                            subheader={course.members + " thành viên"}/>

                <CardContent>
                  {course.description.length > 80 ? course.description.substring(0, 80) + "..." : course.description}
                </CardContent>
              </Card>
            ))}

            {tab === "term" && results.map((term) => (
              <Card sx={styles.cardChild}>
                <Grid container my={2} mx={2}>
                  <Grid item xs={5}>
                    <Typography textAlign="center" fontSize={20} color="#3f6600">
                      {term.term}
                    </Typography>

                    <Typography textAlign="center" mt={0.5}>
                      {term.pronunciation}
                    </Typography>

                    <Typography textAlign="center" mt={1}>
                      {term.definition}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Box display="flex" justifyContent="center" color="#d4380d">
                      <CategoryIcon/>
                      <Typography ml={0.5}>
                        {term.category === "hiragana" ? "Hiragana" :
                          term.category === "katakana" ? "Katakana" :
                            term.category === "character" ? "Bộ thủ" :
                              term.category === "kanji" ? "Hán tự" :
                                term.category === "vocabulary" ? "Từ vựng" :
                                  term.category === "grammar" && "Ngữ pháp"}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="center" color="#d4b106">
                      <StairsIcon/>
                      <Typography ml={0.5}>
                        {term.level === 6 ? "Căn bản" :
                          term.level === 5 ? "N5" :
                            term.level === 4 ? "N4" :
                              term.level === 3 ? "N3" :
                                term.level === 2 ? "N2" :
                                  term.level === 1 ? "N1" :
                                    term.level === 0 && "Kiến thức bổ trợ"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={3} display="flex" justifyContent="center" alignItems="center">
                    <Tooltip title="Chi tiết">
                      <IconButton component={Link} to={`/term/${term.id}`} target="_blank">
                        <LaunchIcon color="success"/>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Box>
        )}
      </Card>
    </Box>
  );
}

export default Search;

const styles = {
  card: {
    width: 800
  },
  cardChild: {
    mb: 3,
    mx: 3
  },
  title: {
    fontWeight: "bold",
    textDecoration: "none"
  }
}

const useQuery = () => {
  const {search} = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
