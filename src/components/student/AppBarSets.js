import React from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import secureStorage from "../../stores/secure-storage";
import {Box, Card, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {ChangeCircle as ChangeCircleIcon} from "@mui/icons-material";
import hiraganaIcon from "../../assets/icons/hiragana.png";
import katakanaIcon from "../../assets/icons/katakana.png";
import characterIcon from "../../assets/icons/character.png";
import kanjiIcon from "../../assets/icons/kanji.png";
import vocabularyIcon from "../../assets/icons/vocabulary.png";
import grammarIcon from "../../assets/icons/grammar.png";

function AppBarSets() {
  const history = useHistory();
  const {category} = useParams();

  const toSet = (category) => {
    history.push(`/student/sets/${secureStorage.getItem("level")}/${category}`);
  }

  return (
    <Card elevation={6}>
      <Typography textAlign="center" fontSize={25} fontWeight="bold" mt={2}>
        {secureStorage.getItem("level") === "6" ? "Căn bản" :
          secureStorage.getItem("level") === "5" ? "N5" :
            secureStorage.getItem("level") === "4" ? "N4" :
              secureStorage.getItem("level") === "3" ? "N3" :
                secureStorage.getItem("level") === "2" ? "N2" :
                  secureStorage.getItem("level") === "1" && "N1"}
      </Typography>

      <List>
        {secureStorage.getItem("level") === "6" ? (
          <>
            <ListItem button selected={category === "hiragana"} onClick={() => toSet("hiragana")}>
              <ListItemAvatar>
                <img src={hiraganaIcon} alt="hiragana" height={45} width={45}/>
              </ListItemAvatar>
              <ListItemText primary="Hiragana" primaryTypographyProps={styles.primary}
                            secondary="平仮名" secondaryTypographyProps={styles.secondary}/>
            </ListItem>

            <ListItem button selected={category === "katakana"} onClick={() => toSet("katakana")}>
              <ListItemAvatar>
                <img src={katakanaIcon} alt="katakana" height={45} width={45}/>
              </ListItemAvatar>
              <ListItemText primary="Katakana" primaryTypographyProps={styles.primary}
                            secondary="片仮名" secondaryTypographyProps={styles.secondary}/>
            </ListItem>

            <ListItem button selected={category === "character"} onClick={() => toSet("character")}>
              <ListItemAvatar>
                <img src={characterIcon} alt="character" height={45} width={45}/>
              </ListItemAvatar>
              <ListItemText primary="Bộ thủ Hán tự" primaryTypographyProps={styles.primary}
                            secondary="部首" secondaryTypographyProps={styles.secondary}/>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button selected={category === "kanji"} onClick={() => toSet("kanji")}>
              <ListItemAvatar>
                <img src={kanjiIcon} alt="kanji" height={45} width={45}/>
              </ListItemAvatar>
              <ListItemText primary="Hán tự" primaryTypographyProps={styles.primary}
                            secondary="漢字" secondaryTypographyProps={styles.secondary}/>
            </ListItem>

            <ListItem button selected={category === "vocabulary"} onClick={() => toSet("vocabulary")}>
              <ListItemAvatar>
                <img src={vocabularyIcon} alt="vocabulary" height={45} width={45}/>
              </ListItemAvatar>
              <ListItemText primary="Từ vựng" primaryTypographyProps={styles.primary}
                            secondary="語彙" secondaryTypographyProps={styles.secondary}/>
            </ListItem>

            <ListItem button selected={category === "grammar"} onClick={() => toSet("grammar")}>
              <ListItemAvatar>
                <img src={grammarIcon} alt="vocabulary" height={45} width={45}/>
              </ListItemAvatar>
              <ListItemText primary="Ngữ pháp" primaryTypographyProps={styles.primary}
                            secondary="文法" secondaryTypographyProps={styles.secondary}/>
            </ListItem>
          </>
        )}
      </List>

      <Box component={Link} to="/student/choose-level" display="flex" justifyContent="right" alignItems="center"
           mt={2} mb={1} sx={styles.change}>
        <ChangeCircleIcon/>
        <Typography fontSize={20} mx={0.5}>
          Thay đổi cấp độ học
        </Typography>
      </Box>
    </Card>
  );
}

export default AppBarSets;

const styles = {
  primary: {
    fontWeight: "medium",
    fontSize: 20
  },
  secondary: {
    fontSize: 18
  },
  change: {
    textDecoration: "none"
  }
}
