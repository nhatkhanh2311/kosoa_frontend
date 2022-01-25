import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {
  Avatar, Box, Button, Card, CardContent, CardHeader, CircularProgress, Divider, FormControl, TextField, Typography
} from "@mui/material";
import {Send as SendIcon} from "@mui/icons-material";
import moment from "moment";
import "moment/locale/vi";

function SystemTermComments() {
  const {termId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [disabled, setDisabled]= useState(false);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    setLoading(true);
    axios
      .post("/term/comments/index", {
        id: parseInt(termId)
      })
      .then((res) => {
        setComments(res.data.comments);
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const createComment = (e) => {
    e.preventDefault();
    if (content.trim().length !== 0) {
      setDisabled(true);
      axios
        .post("/term/comments/create", {
          comment: {
            content: content.trim(),
            system_term_id: parseInt(termId)
          }
        })
        .then((res) => {
          setContent("");
          getComments();
          setDisabled(false);
        })
        .catch((err) => {
          sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
          setDisabled(false);
        });
    }
  }

  return (
    <Card elevation={6}>
      <Typography fontWeight="medium" fontSize={18} my={2} ml={2}>
        Bình luận:
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : (
        <>
          {comments.map((comment) => (
            <>
              <Divider/>

              <CardHeader avatar={<Avatar component={Link} to="/" src={comment.avatar} sx={styles.avatar}/>}
                          title={
                            <Typography component={Link} to="/" fontWeight="bold" fontSize={15} sx={styles.title}>
                              {comment.name}
                            </Typography>
                          }
                          subheader={
                            <Typography fontSize={13}>
                              {moment(comment.created_at).locale("vi").fromNow()}
                            </Typography>
                          }
                          sx={styles.header}/>

              <CardContent>
                <Typography fontSize={16}>
                  {comment.content}
                </Typography>
              </CardContent>
            </>
          ))}

          <Divider/>

          <form onSubmit={createComment}>
            <FormControl fullWidth>
              <Box display="flex">
                <Box flexGrow={1} mt={1} mx={2}>
                  <TextField disabled={disabled} placeholder="Bình luận hoặc góp ý" value={content} type="text"
                             variant="standard" fullWidth
                             onChange={(e) => setContent(e.currentTarget.value)}/>
                </Box>

                <Box flexGrow={0} my={1} mr={2}>
                  <Button disabled={disabled} variant="contained" endIcon={<SendIcon/>} type="submit">
                    gửi
                  </Button>
                </Box>
              </Box>
            </FormControl>
          </form>
        </>
      )}
    </Card>
  );
}

export default SystemTermComments;

const styles = {
  header: {
    height: 5,
    mt: 1.5
  },
  title: {
    textDecoration: "none"
  },
  avatar: {
    width: 35,
    height: 35
  }
}
