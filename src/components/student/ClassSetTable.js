import React, {useContext, useEffect, useState} from "react";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Box, Card, CircularProgress, Collapse, Dialog, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography
} from "@mui/material";
import {
  BorderColor as BorderColorIcon, Description as DescriptionIcon, KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from "@mui/icons-material";
import flashCardIcon from "../../assets/icons/flash-card.png";
import multipleChoiceIcon from "../../assets/icons/multiple-choice.png";

import Flashcards from "./Flashcards";
import MultipleChoices from "./MultipleChoices";

function ClassSetTable(props) {
  const sbCtx = useContext(snackbarContext);

  const [set, setSet] = useState({});
  const [terms, setTerms] = useState([]);
  const [author, setAuthor] = useState({});
  const [open, setOpen] = useState(-1);
  const [flashcard, setFlashcard] = useState(false);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    getTerms();
    getAuthor();
  }, [props.id]);

  const getData = () => {
    setLoading(true);
    axios
      .post("/sets/show", {
        id: props.id
      })
      .then((res) => {
        setSet(res.data.set);
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const getTerms = () => {
    setLoading(true);
    axios
      .post("/class-terms/index", {
        id: props.id
      })
      .then((res) => {
        setTerms(res.data.terms);
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const getAuthor = () => {
    axios
      .post("/users/author", {
        id: props.id
      })
      .then((res) => {
        setAuthor(res.data.user);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : (
        <>
          <Typography fontSize={30} textAlign="center" fontWeight="bold" mb={1}>
            {set.name}
          </Typography>

          <Typography fontSize={18} mb={3}>
            {set.description}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={9.5}>
              <Card elevation={6}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell width={10}/>

                        <TableCell width={10}/>

                        <TableCell>
                          <Typography fontSize={20} textAlign="center" fontWeight="bold">Thuật ngữ</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography fontSize={20} textAlign="center" fontWeight="bold">Cách đọc</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography fontSize={20} textAlign="center" fontWeight="bold">Định nghĩa</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {terms.map((term, index) => (
                        <>
                          <TableRow sx={styles.row}>
                            <TableCell align="center">
                              <Typography fontSize={15}>{index + 1}</Typography>
                            </TableCell>

                            <TableCell align="center">
                              <Tooltip title="Xem thêm">
                                <IconButton onClick={() => setOpen(open === index ? -1 : index)}>
                                  {open === index ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                </IconButton>
                              </Tooltip>
                            </TableCell>

                            <TableCell align="center">
                              <Typography fontSize={15}>{term.term}</Typography>
                            </TableCell>

                            <TableCell align="center">
                              <Typography fontSize={15}>{term.pronunciation}</Typography>
                            </TableCell>

                            <TableCell align="center">
                              <Typography fontSize={15}>{term.definition}</Typography>
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell colSpan={5} sx={styles.more}>
                              <Collapse in={open === index} unmountOnExit>
                                <Box display="flex" mb={1}>
                                  <DescriptionIcon color="success"/>
                                  <Typography fontSize={16} ml={0.5}>{term.description}</Typography>
                                </Box>

                                <Box display="flex" mb={1}>
                                  <BorderColorIcon color="info"/>
                                  <Typography fontSize={16} ml={0.5}>{term.example}</Typography>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>

            <Grid item xs={2.5}>
              <Card elevation={6}>
                <Typography fontSize={18} my={2} ml={1}>HỌC</Typography>

                <ListItem button disabled={terms.length === 0} onClick={() => setFlashcard(true)}>
                  <ListItemAvatar>
                    <img src={flashCardIcon} alt="flashCard" height={30} width={35}/>
                  </ListItemAvatar>
                  <ListItemText primary="Thẻ ghi nhớ" primaryTypographyProps={styles.primary}/>
                </ListItem>

                <Dialog open={flashcard} onClose={() => setFlashcard(false)} fullScreen>
                  <Flashcards terms={terms} exit={() => setFlashcard(false)} system={false}
                              setName={set.name} author={author}/>
                </Dialog>

                <ListItem button disabled={terms.length < 4} onClick={() => setMultipleChoice(true)}>
                  <ListItemAvatar>
                    <img src={multipleChoiceIcon} alt="multipleChoice" height={30} width={35}/>
                  </ListItemAvatar>
                  <ListItemText primary="Trắc nghiệm" primaryTypographyProps={styles.primary}/>
                </ListItem>

                <Dialog open={multipleChoice} onClose={() => setMultipleChoice(false)} fullScreen>
                  <MultipleChoices  terms={terms} exit={() => setMultipleChoice(false)} system={false}
                                    setName={set.name} author={author}/>
                </Dialog>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default ClassSetTable;

const styles = {
  row: {
    borderBottom: "none"
  },
  more: {
    py: 0
  },
  primary: {
    fontWeight: "medium",
    fontSize: 18
  }
}
