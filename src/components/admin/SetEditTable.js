import React, {useContext, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Button, Card, Collapse, Divider, FormControl, Grid, IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography
} from "@mui/material";
import {
  Add as AddIcon, BorderColor as BorderColorIcon, Delete as DeleteIcon, Edit as EditIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon
} from "@mui/icons-material";

function SetEditTable() {
  const {level, category} = useParams();
  const inputFocus = useRef(null);
  const sbCtx = useContext(snackbarContext);

  const [terms, setTerms] = useState([]);
  const [termsName, setTermsName] = useState("");
  const [term, setTerm] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [definition, setDefinition] = useState("");
  const [description, setDescription] = useState("");
  const [example, setExample] = useState("");
  const [validationTerm, setValidationTerm] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(-1);

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
    setTerm("");
    setPronunciation("");
    setDefinition("");
    setDescription("");
    setExample("");
    setValidationTerm(false);
    setDisabled(false);
  }, [level, category]);

  const getTerms = () => {
    axios
      .post("/admin/terms/index", {
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

  const addTerm = (e) => {
    e.preventDefault();
    if (term.trim().length > 0) {
      setDisabled(true);
      setValidationTerm(false);
      axios
        .post("/admin/terms/create", {
          term: {
            term: term.trim(),
            pronunciation: pronunciation.trim(),
            definition: definition.trim(),
            description: description.trim(),
            example: example.trim(),
            level: parseInt(level),
            category: category
          }
        })
        .then((res) => {
          let tempTerms = terms;
          tempTerms.push(res.data.term);
          setTerms(tempTerms);
          setTerm("");
          setPronunciation("");
          setDefinition("");
          setDescription("");
          setExample("");
          setDisabled(false);
          inputFocus.current.focus();
          sbCtx.onSnackbar(`Thêm ${termsName} thành công!`, "success");
        })
        .catch((err) => {
          if (err.response.data.message === "term taken") {
            sbCtx.onSnackbar("Thuật ngữ đã tồn tại!", "warning");
          }
          else {
            sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
          }
          setDisabled(false);
        });
    }
    else {
      setValidationTerm(true);
    }
  }

  const deleteTerm = (id, index, term) => {
    axios
      .post("admin/terms/destroy", {
        id: id
      })
      .then((res) => {
        let tempTerms = terms;
        tempTerms.splice(index, 1);
        setTerms(tempTerms);
        sbCtx.onSnackbar(`Xóa "${term}" thành công!`, "success");
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

                <TableCell width={10}/>

                <TableCell width={10}/>
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

                    <TableCell align="center">
                      <IconButton>
                        <EditIcon color="success"/>
                      </IconButton>
                    </TableCell>

                    <TableCell align="center">
                      <IconButton onClick={() => deleteTerm(term.id, index, term.term)}>
                        <DeleteIcon color="error"/>
                      </IconButton>
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

        <Divider/>

        <Typography textAlign="center" fontSize={20} mt={2}>Thêm {termsName} mới</Typography>

        <form onSubmit={addTerm}>
          <FormControl fullWidth>
            <Grid container spacing={2} px={1}>
              <Grid item xs={3.5}>
                <TextField id="term" label={termsName} type="text" variant="standard" value={term}
                           fullWidth disabled={disabled} ref={inputFocus} error={validationTerm}
                           helperText={validationTerm && "Bạn phải điền thuật ngữ!"}
                           onChange={(e) => setTerm(e.currentTarget.value)}/>
              </Grid>

              {(category === "vocabulary" || category === "grammar") && (
                <Grid item xs={4}>
                  <TextField id="pronunciation" label="Cách đọc" type="text" variant="standard" value={pronunciation}
                             fullWidth disabled={disabled}
                             onChange={(e) => setPronunciation(e.currentTarget.value)}/>
                </Grid>
              )}

              <Grid item xs={4.5}>
                <TextField id="definition" label="Định nghĩa" type="text" variant="standard" value={definition}
                           fullWidth disabled={disabled}
                           onChange={(e) => setDefinition(e.currentTarget.value)}/>
              </Grid>
            </Grid>

            <Grid item xs={12} px={1}>
              <TextField id="description" label="Bổ sung" type="text" variant="standard" value={description}
                         fullWidth disabled={disabled}
                         onChange={(e) => setDescription(e.currentTarget.value)}/>
            </Grid>

            <Grid item xs={12} px={1} mb={1}>
              <TextField id="example" label="Ví dụ" type="text" variant="standard" value={example}
                         fullWidth disabled={disabled}
                         onChange={(e) => setExample(e.currentTarget.value)}/>
            </Grid>

            <Button type="submit" disabled={disabled} variant="contained" color="success" sx={styles.button}>
              <AddIcon/>Thêm
            </Button>
          </FormControl>
        </form>
      </Card>
    </>
  );
}

export default SetEditTable;

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
  },
  button: {
    width: 150,
    my: 1,
    ml: 1
  }
}
