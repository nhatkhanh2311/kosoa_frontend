import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Box, Card, CircularProgress, Collapse, Dialog, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography
} from "@mui/material";
import {
  BorderColor as BorderColorIcon, Description as DescriptionIcon, KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon, Launch as LaunchIcon
} from "@mui/icons-material";
import flashCardIcon from "../../assets/icons/flash-card.png";
import multipleChoiceIcon from "../../assets/icons/multiple-choice.png";

import Flashcards from "./Flashcards";
import MultipleChoices from "./MultipleChoices";

function SystemSetTable() {
  const {level, category} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [terms, setTerms] = useState([]);
  const [termsName, setTermsName] = useState("");
  const [open, setOpen] = useState(-1);
  const [flashcard, setFlashcard] = useState(false);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTerms();
    switch (category) {
      case "hiragana": setTermsName("Hiragana"); break;
      case "katakana": setTermsName("Katakana"); break;
      case "character": setTermsName("Bộ thủ"); break;
      case "kanji": setTermsName("Hán tự"); break;
      case "vocabulary": setTermsName("Từ vựng"); break;
      case "grammar": setTermsName("Ngữ pháp"); break;
    }
  }, [level, category]);

  const getTerms = () => {
    setLoading(true);
    axios
      .post("/terms/index", {
        level: parseInt(level),
        category: category
      })
      .then((res) => {
        setTerms(res.data.terms);
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  return (
    <>
      <Typography fontSize={30} textAlign="center" fontWeight="bold" mb={3}>
        {[5, 4, 3, 2, 1].includes(parseInt(level)) ? `${termsName} N${level}` : termsName}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : (
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
                        <Typography fontSize={20} textAlign="center" fontWeight="medium">{termsName}</Typography>
                      </TableCell>

                      {(category === "vocabulary" || category === "grammar") && (
                        <TableCell>
                          <Typography fontSize={20} textAlign="center" fontWeight="medium">Cách đọc</Typography>
                        </TableCell>
                      )}

                      <TableCell>
                        <Typography fontSize={20} textAlign="center" fontWeight="medium">Định nghĩa</Typography>
                      </TableCell>

                      <TableCell width={10}/>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {terms.map((term, index) => (
                      <>
                        <TableRow sx={styles.row}>
                          <TableCell align="center">
                            <Typography fontSize={16}>{index + 1}</Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Tooltip title="Xem thêm">
                              <IconButton onClick={() => setOpen(open === index ? -1 : index)}>
                                {open === index ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                              </IconButton>
                            </Tooltip>
                          </TableCell>

                          <TableCell align="center">
                            <Typography fontSize={16}>{term.term}</Typography>
                          </TableCell>

                          {(category === "vocabulary" || category === "grammar") && (
                            <TableCell align="center">
                              <Typography fontSize={16}>{term.pronunciation}</Typography>
                            </TableCell>
                          )}

                          <TableCell align="center">
                            <Typography fontSize={16}>{term.definition}</Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Tooltip title="Chi tiết">
                              <IconButton component={Link} to={`/term/${term.id}`} target="_blank">
                                <LaunchIcon color="success"/>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell colSpan={6} sx={styles.more}>
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
                <Flashcards terms={terms} exit={() => setFlashcard(false)} system={true}
                            setName={[5, 4, 3, 2, 1].includes(parseInt(level)) ? `${termsName} N${level}` : termsName}/>
              </Dialog>

              <ListItem button disabled={terms.length < 4} onClick={() => setMultipleChoice(true)}>
                <ListItemAvatar>
                  <img src={multipleChoiceIcon} alt="multipleChoice" height={30} width={35}/>
                </ListItemAvatar>
                <ListItemText primary="Trắc nghiệm" primaryTypographyProps={styles.primary}/>
              </ListItem>

              <Dialog open={multipleChoice} onClose={() => setMultipleChoice(false)} fullScreen>
                <MultipleChoices terms={terms} exit={() => setMultipleChoice(false)} system={true}
                                 setName={[5, 4, 3, 2, 1].includes(parseInt(level)) ? `${termsName} N${level}` : termsName}/>
              </Dialog>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default SystemSetTable;

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
