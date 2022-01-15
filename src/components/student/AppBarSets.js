import React from "react";
import {useHistory} from "react-router-dom";
import secureStorage from "../../stores/secure-storage";
import {Card, ListItem, ListItemText} from "@mui/material";

function AppBarSets() {
  const history = useHistory();

  const toSet = (category) => {
    history.push(`/student/sets/${secureStorage.getItem("level")}/${category}`);
  }

  return (
    <Card>
      {secureStorage.getItem("level") === 6 ? (
        <>
          <ListItem button onClick={() => toSet("hiragana")}>
            <ListItemText primary="Hiragana"/>
          </ListItem>

          <ListItem button onClick={() => toSet("katakana")}>
            <ListItemText primary="Katakana"/>
          </ListItem>

          <ListItem button onClick={() => toSet("character")}>
            <ListItemText primary="Bộ thủ Hán tự"/>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button onClick={() => toSet("kanji")}>
            <ListItemText primary="Hán tự"/>
          </ListItem>

          <ListItem button onClick={() => toSet("vocabulary")}>
            <ListItemText primary="Từ vựng"/>
          </ListItem>

          <ListItem button onClick={() => toSet("grammar")}>
            <ListItemText primary="Ngữ pháp"/>
          </ListItem>
        </>
      )}
    </Card>
  );
}

export default AppBarSets;
