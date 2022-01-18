import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Button, Card, Collapse, Dialog, DialogActions, Grid, IconButton, ListItem, ListItemText, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import {
  BorderColor as BorderColorIcon, KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon
} from "@mui/icons-material";

import Flashcards from "./Flashcards";

function SystemSetsTable() {
  const {level, category} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [terms, setTerms] = useState([]);
  const [termsName, setTermsName] = useState("");
  const [open, setOpen] = useState(-1);
  const [flashcard, setFlashcard] = useState(false);

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
    axios
      .post("/terms/index", {
        level: parseInt(level),
        category: category
      })
      .then((res) => {
        setTerms(res.data.terms);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  return (
    <>
      <Typography fontSize={30} textAlign="center" fontWeight="bold" mb={2}>
        {[5, 4, 3, 2, 1].includes(parseInt(level)) ? (
          `${termsName} N${level}`
        ) : (
          termsName
        )}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Card sx={styles.table}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width={10}/>

                    <TableCell width={10}/>

                    <TableCell>
                      <Typography fontSize={20} textAlign="center" fontWeight="bold">{termsName}</Typography>
                    </TableCell>

                    {(category === "vocabulary" || category === "grammar") && (
                      <TableCell>
                        <Typography fontSize={20} textAlign="center" fontWeight="bold">Cách đọc</Typography>
                      </TableCell>
                    )}

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
                          <IconButton onClick={() => setOpen(open === index ? -1 : index)}>
                            {open === index ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                          </IconButton>
                        </TableCell>

                        <TableCell align="center">
                          <Typography fontSize={15}>{term.term}</Typography>
                        </TableCell>

                        {(category === "vocabulary" || category === "grammar") && (
                          <TableCell align="center">
                            <Typography fontSize={15}>{term.pronunciation}</Typography>
                          </TableCell>
                        )}

                        <TableCell align="center">
                          <Typography fontSize={15}>{term.definition}</Typography>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={7} sx={styles.more}>
                          <Collapse in={open === index} unmountOnExit>
                            <Typography fontSize={15} maxWidth mb={1}>{term.description}</Typography>
                            <Typography fontSize={15}><BorderColorIcon color="info"/>{term.example}</Typography>
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

        <Grid item xs={3}>
          <Card>
            <Typography textAlign="center" fontWeight="bold" my={2}>Học</Typography>

            <ListItem button onClick={() => setFlashcard(true)}>
              <ListItemText primary="Thẻ ghi nhớ"/>
            </ListItem>

            <Dialog open={flashcard} onClose={() => setFlashcard(false)} fullScreen>
              <Flashcards terms={terms} exit={() => setFlashcard(false)} system={true}
                          setName={[5, 4, 3, 2, 1].includes(parseInt(level)) ? `${termsName} N${level}` : termsName}/>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default SystemSetsTable;

const styles = {
  table: {
    backgroundColor: "#fcffe6"
  },
  row: {
    "& > *": {
      borderBottom: "none"
    }
  },
  more: {
    py: 0
  }
}
