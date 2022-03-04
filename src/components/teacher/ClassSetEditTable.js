import React, {useContext, useEffect, useState} from "react";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {
  Box, Button, Card, CircularProgress, Collapse, Divider, FormControl, Grid, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Tooltip, Typography
} from "@mui/material";
import {
  Add as AddIcon, BorderColor as BorderColorIcon, Cancel as CancelIcon, Delete as DeleteIcon,
  Description as DescriptionIcon, Edit as EditIcon, KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon, Save as SaveIcon
} from "@mui/icons-material";

function ClassSetEditTable(props) {
  const sbCtx = useContext(snackbarContext);

  const [set, setSet] = useState({});
  const [terms, setTerms] = useState([]);
  const [term, setTerm] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [definition, setDefinition] = useState("");
  const [description, setDescription] = useState("");
  const [example, setExample] = useState("");
  const [validationTerm, setValidationTerm] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(-1);
  const [termEdit, setTermEdit] = useState("");
  const [pronunciationEdit, setPronunciationEdit] = useState("");
  const [definitionEdit, setDefinitionEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [exampleEdit, setExampleEdit] = useState("");
  const [validationTermEdit, setValidationTermEdit] = useState(false);
  const [disabledEdit, setDisabledEdit] = useState(false);
  const [edit, setEdit] = useState(-1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    getTerms();
    setTerm("");
    setPronunciation("");
    setDefinition("");
    setDescription("");
    setExample("");
    setValidationTerm(false);
    setDisabled(false);
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

  const addTerm = (e) => {
    e.preventDefault();
    if (term.trim().length > 0) {
      setDisabled(true);
      setValidationTerm(false);
      axios
        .post("/class-terms/create", {
          term: {
            term: term.trim(),
            pronunciation: pronunciation.trim(),
            definition: definition.trim(),
            description: description.trim(),
            example: example.trim(),
            course_set_id: props.id
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
          sbCtx.onSnackbar("Thêm thuật ngữ thành công!", "success");
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

  const editTerm = (id, index) => {
    if (termEdit.trim().length > 0) {
      setDisabledEdit(true);
      setValidationTermEdit(false);
      axios
        .post("/class-terms/update", {
          id: id,
          term: {
            term: termEdit.trim(),
            pronunciation: pronunciationEdit.trim(),
            definition: definitionEdit.trim(),
            description: descriptionEdit.trim(),
            example: exampleEdit.trim()
          }
        })
        .then((res) => {
          let tempTerms = terms;
          tempTerms[index] = res.data.term;
          setTerms(tempTerms);
          setDisabledEdit(false);
          setEdit(-1);
          sbCtx.onSnackbar("Chỉnh sửa thuật ngữ thành công!", "success");
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
      setValidationTermEdit(true);
    }
  }

  const deleteTerm = (id, index) => {
    axios
      .post("/class-terms/destroy", {
        id: id
      })
      .then((res) => {
        let tempTerms = terms;
        tempTerms.splice(index, 1);
        setTerms(tempTerms);
        sbCtx.onSnackbar("Xóa thuật ngữ thành công!", "success");
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const setEditNumber = (index) => {
    setEdit(index);
    setTermEdit(terms[index].term);
    setPronunciationEdit(terms[index].pronunciation);
    setDefinitionEdit(terms[index].definition);
    setDescriptionEdit(terms[index].description);
    setExampleEdit(terms[index].example);
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

                    <TableCell width={10}/>

                    <TableCell width={10}/>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {terms.map((term, index) => edit === index ? (
                    <>
                      <TableRow sx={styles.row}>
                        <TableCell align="center">
                          <Typography fontSize={15}>{index + 1}</Typography>
                        </TableCell>

                        <TableCell/>

                        <TableCell align="center">
                          <TextField type="text" variant="standard" value={termEdit}
                                     fullWidth disabled={disabledEdit} error={validationTermEdit}
                                     helperText={validationTermEdit && "Bạn phải điền thuật ngữ!"}
                                     onChange={(e) => setTermEdit(e.currentTarget.value)}/>
                        </TableCell>

                        <TableCell align="center">
                          <TextField type="text" variant="standard" value={pronunciationEdit}
                                     fullWidth disabled={disabledEdit}
                                     onChange={(e) => setPronunciationEdit(e.currentTarget.value)}/>
                        </TableCell>

                        <TableCell align="center">
                          <TextField type="text" variant="standard" value={definitionEdit}
                                     fullWidth disabled={disabledEdit}
                                     onChange={(e) => setDefinitionEdit(e.currentTarget.value)}/>
                        </TableCell>

                        <TableCell align="center">
                          <Tooltip title="Lưu">
                            <IconButton onClick={() => editTerm(term.id, index)}>
                              <SaveIcon color="success"/>
                            </IconButton>
                          </Tooltip>
                        </TableCell>

                        <TableCell align="center">
                          <Tooltip title="Hủy">
                            <IconButton onClick={() => setEdit(-1)}>
                              <CancelIcon color="error"/>
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={7}>
                          <Box display="flex" mb={1}>
                            <DescriptionIcon color="success"/>
                            <TextField type="text" variant="standard" value={descriptionEdit}
                                       fullWidth disabled={disabledEdit} sx={{ml: 0.5}}
                                       onChange={(e) => setDescriptionEdit(e.currentTarget.value)}/>
                          </Box>

                          <Box display="flex" mb={1}>
                            <BorderColorIcon color="info"/>
                            <TextField type="text" variant="standard" value={exampleEdit}
                                       fullWidth disabled={disabledEdit} sx={{ml: 0.5}}
                                       onChange={(e) => setExampleEdit(e.currentTarget.value)}/>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
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

                        <TableCell align="center">
                          <Tooltip title="Sửa">
                            <IconButton onClick={() => setEditNumber(index)}>
                              <EditIcon color="success"/>
                            </IconButton>
                          </Tooltip>
                        </TableCell>

                        <TableCell align="center">
                          <Tooltip title="Xóa">
                            <IconButton onClick={() => deleteTerm(term.id, index)}>
                              <DeleteIcon color="error"/>
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={7} sx={styles.more}>
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

            <Divider/>

            <Typography textAlign="center" fontSize={20} mt={2}>Thêm thuật ngữ mới</Typography>

            <form onSubmit={addTerm}>
              <FormControl fullWidth>
                <Grid container spacing={2} px={1}>
                  <Grid item xs={3.5}>
                    <TextField id="term" label="Thuật ngữ" type="text" variant="standard" value={term}
                               fullWidth disabled={disabled} error={validationTerm}
                               helperText={validationTerm && "Bạn phải điền thuật ngữ!"}
                               onChange={(e) => setTerm(e.currentTarget.value)}/>
                  </Grid>

                  <Grid item xs={4}>
                    <TextField id="pronunciation" label="Cách đọc" type="text" variant="standard" value={pronunciation}
                               fullWidth disabled={disabled}
                               onChange={(e) => setPronunciation(e.currentTarget.value)}/>
                  </Grid>

                  <Grid item xs={4.5}>
                    <TextField id="definition" label="Định nghĩa" type="text" variant="standard" value={definition}
                               fullWidth disabled={disabled}
                               onChange={(e) => setDefinition(e.currentTarget.value)}/>
                  </Grid>

                  <Grid item xs={12} px={1}>
                    <TextField id="description" label="Giải thích" type="text" variant="standard" value={description}
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
                </Grid>
              </FormControl>
            </form>
          </Card>
        </>
      )}
    </>
  );
}

export default ClassSetEditTable;

const styles = {
  row: {
    borderBottom: "none"
  },
  more: {
    py: 0
  },
  button: {
    width: 150,
    my: 1,
    ml: 2
  }
}
