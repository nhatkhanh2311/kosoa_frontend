import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Card, Collapse, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import basicIcon from "../../assets/icons/basic.png";
import N5Icon from "../../assets/icons/N5.png";
import N4Icon from "../../assets/icons/N4.png";
import N3Icon from "../../assets/icons/N3.png";
import N2Icon from "../../assets/icons/N2.png";
import N1Icon from "../../assets/icons/N1.png";
import additionIcon from "../../assets/icons/addition.png";
import hiraganaIcon from "../../assets/icons/hiragana.png";
import katakanaIcon from "../../assets/icons/katakana.png";
import characterIcon from "../../assets/icons/character.png";
import kanjiIcon from "../../assets/icons/kanji.png";
import vocabularyIcon from "../../assets/icons/vocabulary.png";
import grammarIcon from "../../assets/icons/grammar.png";

function AppBarSets() {
  const history = useHistory();
  const {level, category} = useParams();

  const [open, setOpen] = useState(-1);

  const toSet = (level, category) => {
    history.push(`/admin/sets/${level}/${category}`);
  }

  const Level = (props) => (
    <>
      <ListItem button selected={level === `${props.level}` && category === "kanji"} sx={styles.item}
                onClick={() => toSet(props.level, "kanji")}>
        <ListItemAvatar>
          <img src={kanjiIcon} alt="kanji" height={40} width={40}/>
        </ListItemAvatar>
        <ListItemText primary="Hán tự" primaryTypographyProps={styles.primaryL2}/>
      </ListItem>

      <ListItem button selected={level === `${props.level}` && category === "vocabulary"} sx={styles.item}
                onClick={() => toSet(props.level, "vocabulary")}>
        <ListItemAvatar>
          <img src={vocabularyIcon} alt="vocabulary" height={40} width={40}/>
        </ListItemAvatar>
        <ListItemText primary="Từ vựng" primaryTypographyProps={styles.primaryL2}/>
      </ListItem>

      <ListItem button selected={level === `${props.level}` && category === "grammar"} sx={styles.item}
                onClick={() => toSet(props.level, "grammar")}>
        <ListItemAvatar>
          <img src={grammarIcon} alt="grammar" height={40} width={40}/>
        </ListItemAvatar>
        <ListItemText primary="Ngữ pháp" primaryTypographyProps={styles.primaryL2}/>
      </ListItem>
    </>
  );

  return (
    <Card>
      <List>
        <ListItem button selected={level === "6"} onClick={() => setOpen(open === 6 ? -1 : 6)}>
          <ListItemAvatar>
            <img src={basicIcon} alt="basic" height={45} width={45}/>
          </ListItemAvatar>
          <ListItemText primary="Căn bản" primaryTypographyProps={styles.primaryL1}/>
          {open === 6 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </ListItem>

        <Collapse in={open === 6}>
          <ListItem button selected={category === "hiragana"} sx={styles.item}
                    onClick={() => toSet(6, "hiragana")}>
            <ListItemAvatar>
              <img src={hiraganaIcon} alt="hiragana" height={40} width={40}/>
            </ListItemAvatar>
            <ListItemText primary="Hiragana" primaryTypographyProps={styles.primaryL2}/>
          </ListItem>

          <ListItem button selected={category === "katakana"} sx={styles.item}
                    onClick={() => toSet(6, "katakana")}>
            <ListItemAvatar>
              <img src={katakanaIcon} alt="katakana" height={40} width={40}/>
            </ListItemAvatar>
            <ListItemText primary="Katakana" primaryTypographyProps={styles.primaryL2}/>
          </ListItem>

          <ListItem button selected={category === "character"} sx={styles.item}
                    onClick={() => toSet(6, "character")}>
            <ListItemAvatar>
              <img src={characterIcon} alt="character" height={40} width={40}/>
            </ListItemAvatar>
            <ListItemText primary="Bộ thủ Hán tự" primaryTypographyProps={styles.primaryL2}/>
          </ListItem>
        </Collapse>

        <ListItem button selected={level === "5"} onClick={() => setOpen(open === 5 ? -1 : 5)}>
          <ListItemAvatar>
            <img src={N5Icon} alt="N5" height={45} width={45}/>
          </ListItemAvatar>
          <ListItemText primary="N5" primaryTypographyProps={styles.primaryL1}/>
          {open === 5 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </ListItem>

        <Collapse in={open === 5}>
          <Level level={5}/>
        </Collapse>

        <ListItem button selected={level === "4"} onClick={() => setOpen(open === 4 ? -1 : 4)}>
          <ListItemAvatar>
            <img src={N4Icon} alt="N4" height={45} width={45}/>
          </ListItemAvatar>
          <ListItemText primary="N4" primaryTypographyProps={styles.primaryL1}/>
          {open === 4 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </ListItem>

        <Collapse in={open === 4}>
          <Level level={4}/>
        </Collapse>

        <ListItem button selected={level === "3"} onClick={() => setOpen(open === 3 ? -1 : 3)}>
          <ListItemAvatar>
            <img src={N3Icon} alt="N3" height={45} width={45}/>
          </ListItemAvatar>
          <ListItemText primary="N3" primaryTypographyProps={styles.primaryL1}/>
          {open === 3 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </ListItem>

        <Collapse in={open === 3}>
          <Level level={3}/>
        </Collapse>

        <ListItem button selected={level === "2"} onClick={() => setOpen(open === 2 ? -1 : 2)}>
          <ListItemAvatar>
            <img src={N2Icon} alt="N2" height={45} width={45}/>
          </ListItemAvatar>
          <ListItemText primary="N2" primaryTypographyProps={styles.primaryL1}/>
          {open === 2 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </ListItem>

        <Collapse in={open === 2}>
          <Level level={2}/>
        </Collapse>

        <ListItem button selected={level === "1"} onClick={() => setOpen(open === 1 ? -1 : 1)}>
          <ListItemAvatar>
            <img src={N1Icon} alt="N1" height={45} width={45}/>
          </ListItemAvatar>
          <ListItemText primary="N1" primaryTypographyProps={styles.primaryL1}/>
          {open === 1 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </ListItem>

        <Collapse in={open === 1}>
          <Level level={1}/>
        </Collapse>

        <ListItem button selected={level === "0"} onClick={() => setOpen(open === 0 ? -1 : 0)}>
          <ListItemAvatar>
            <img src={additionIcon} alt="addition" height={45} width={45}/>
          </ListItemAvatar>
          <ListItemText primary="Kiến thức bổ trợ" primaryTypographyProps={styles.primaryL1}/>
          {open === 0 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </ListItem>
      </List>
    </Card>
  );
}

export default AppBarSets;

const styles = {
  item: {
    pl: 6
  },
  primaryL1: {
    fontWeight: "medium",
    fontSize: 20
  },
  primaryL2: {
    fontWeight: "medium",
    fontSize: 17
  }
}
