import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Box, Card, CircularProgress, Grid, Typography} from "@mui/material";
import {
  BorderColor as BorderColorIcon, Category as CategoryIcon, Description as DescriptionIcon, Stairs as StairsIcon
} from "@mui/icons-material";

function SystemTermDetails() {
  const {termId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [term, setTerm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .post("/terms/show", {
        id: parseInt(termId)
      })
      .then((res) => {
        setTerm(res.data.term);
        setLoading(false);
        document.title = `${res.data.term.term} - KoSoA`;
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  return (
    <Card elevation={6}>
      <Typography fontWeight="medium" fontSize={18} my={2} ml={2}>
        Chi tiết:
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : (
        <>
          <Typography textAlign="center" fontSize={30} color="#3f6600">
            {term.term}
          </Typography>

          <Typography textAlign="center" fontSize={20} mt={0.5}>
            {term.pronunciation}
          </Typography>

          <Typography textAlign="center" fontSize={20} mt={1}>
            {term.definition}
          </Typography>

          <Grid container mt={5} mx={2}>
            <Grid item xs={6} display="flex" color="#d4380d">
              <CategoryIcon/>
              <Typography fontSize={18} ml={0.5}>
                Loại:
              </Typography>
            </Grid>

            <Grid item xs={6} display="flex" color="#d4b106">
              <StairsIcon/>
              <Typography fontSize={18} ml={0.5}>
                Cấp độ:
              </Typography>
            </Grid>
          </Grid>

          <Grid container mx={2}>
            <Grid item xs={6}>
              <Typography fontSize={18}>
                {term.category === "hiragana" ? "Hiragana" :
                  term.category === "katakana" ? "Katakana" :
                    term.category === "character" ? "Bộ thủ" :
                      term.category === "kanji" ? "Hán tự" :
                        term.category === "vocabulary" ? "Từ vựng" :
                          term.category === "grammar" && "Ngữ pháp"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography fontSize={18}>
                {term.level === 6 ? "Căn bản" :
                  term.level === 5 ? "N5" :
                    term.level === 4 ? "N4" :
                      term.level === 3 ? "N3" :
                        term.level === 2 ? "N2" :
                          term.level === 1 ? "N1" :
                            term.level === 0 && "Kiến thức bổ trợ"}
              </Typography>
            </Grid>
          </Grid>

          <Box display="flex" mt={2} ml={2} color="#5b8c00">
            <DescriptionIcon/>
            <Typography fontSize={18} ml={0.5}>
              Giải thích:
            </Typography>
          </Box>

          <Typography fontSize={18} mx={2}>
            {term.description}
          </Typography>

          <Box display="flex" mt={2} ml={2} color="#08979c">
            <BorderColorIcon/>
            <Typography fontSize={18} ml={0.5}>
              Ví dụ:
            </Typography>
          </Box>

          <Typography fontSize={18} mx={2} mb={2}>
            {term.example}
          </Typography>
        </>
      )}
    </Card>
  );
}

export default SystemTermDetails;
