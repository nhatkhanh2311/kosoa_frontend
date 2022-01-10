import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {
  Accordion as MuiAccordion, AccordionDetails as MuiAccordionDetails, AccordionSummary as MuiAccordionSummary,
  Card, ListItem, ListItemText, styled, Typography
} from "@mui/material";
import {ArrowForwardIosSharp as ArrowForwardIosSharpIcon, ExpandMore as ExpandMoreIcon} from "@mui/icons-material";

function AppBarSets() {
  const history = useHistory();

  const toSet = (level, category) => {
    history.push(`/admin/sets/${level}/${category}`);
  }

  return (
    <Card sx={styles.card}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography>
            CƠ BẢN
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <ListItem button onClick={() => toSet(6, "hiragana")}>
            <ListItemText primary="Hiragana"/>
          </ListItem>

          <ListItem button onClick={() => toSet(6, "katakana")}>
            <ListItemText primary="Katakana"/>
          </ListItem>

          <ListItem button onClick={() => toSet(6, "character")}>
            <ListItemText primary="Bộ thủ Hán tự"/>
          </ListItem>
        </AccordionDetails>
      </Accordion>

      {[5, 4, 3, 2, 1].map((level) => (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography>
              N{level}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <ListItem button onClick={() => toSet(level, "kanji")}>
              <ListItemText primary="Hán tự"/>
            </ListItem>

            <ListItem button onClick={() => toSet(level, "vocabulary")}>
              <ListItemText primary="Từ vựng"/>
            </ListItem>

            <ListItem button onClick={() => toSet(level, "grammar")}>
              <ListItemText primary="Ngữ pháp"/>
            </ListItem>
          </AccordionDetails>
        </Accordion>
      ))}

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography>
            KIẾN THỨC BỔ TRỢ
          </Typography>
        </AccordionSummary>
      </Accordion>
    </Card>
  );
}

export default AppBarSets;

const styles = {
  card: {
    overflow: "auto"
  }
}

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props}/>
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`, "&:not(:last-child)": {borderBottom: 0}, "&:before": {display: "none"}
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: "0.9rem"}}/>}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#eaff8f",
  flexDirection: "row-reverse", "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {transform: "rotate(90deg)"},
  "& .MuiAccordionSummary-content": {marginLeft: theme.spacing(1)}
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
