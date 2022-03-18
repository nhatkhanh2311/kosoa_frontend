import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {
  Avatar, Box, Button, Card, CardContent, CardHeader, CircularProgress, Divider, FormControl, IconButton, Pagination,
  TextField, Typography
} from "@mui/material";
import {
  Send as SendIcon, ThumbDown as ThumbDownIcon, ThumbDownOutlined as ThumbDownOutlinedIcon, ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon
} from "@mui/icons-material";
import moment from "moment";
import "moment/locale/vi";

function SystemTermComments() {
  const {termId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [disabled, setDisabled]= useState(false);
  const [page, setPage] = useState(1);

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

  const getCommentsWithoutLoading = () => {
    axios
      .post("/term/comments/index", {
        id: parseInt(termId)
      })
      .then((res) => {
        setComments(res.data.comments);
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

  const vote = (kind, id) => {
    axios
      .post("/votes/create", {
        kind: kind,
        id: id
      })
      .then((res) => {
        getCommentsWithoutLoading();
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
        setDisabled(false);
      });
  }

  const changeVote = (id) => {
    axios
      .post("/votes/update", {
        id: id
      })
      .then((res) => {
        getCommentsWithoutLoading();
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
        setDisabled(false);
      });
  }

  const cancelVote = (id) => {
    axios
      .post("/votes/destroy", {
        id: id
      })
      .then((res) => {
        getCommentsWithoutLoading();
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
        setDisabled(false);
      });
  }

  const handleVote = (kind, id, index) => {
    if (comments[index].your_vote === null) {
      vote(kind, id);
    }
    else if (comments[index].your_vote === kind) {
      cancelVote(id);
    }
    else {
      changeVote(id);
    }
  }

  const handlePage = (e, value) => {
    setPage(value);
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
          <Box display="flex" justifyContent="center" mb={1}>
            <Pagination color="success" size="small" shape="rounded"
                        count={Math.ceil(comments.length / 5)} page={page} onChange={handlePage}/>
          </Box>

          {comments.slice((page - 1) * 5, page * 5).map((comment, index) => (
            <>
              <Divider/>

              <CardHeader avatar={<Avatar component={Link} to="/" src={comment.avatar} sx={styles.avatar}/>}
                          title={
                            <Typography component={Link} to="/" fontWeight="bold" fontSize={16} sx={styles.title}>
                              {comment.name}
                            </Typography>
                          }
                          subheader={
                            <Typography fontSize={14}>
                              {moment(comment.created_at).locale("vi").fromNow()}
                            </Typography>
                          }
                          sx={styles.header}/>

              <CardContent>
                <Typography fontSize={16} mb={1}>
                  {comment.content}
                </Typography>

                <Box display="flex" alignItems="center">
                  <IconButton color={comment.your_vote ? "success" : "default"} size="small"
                              onClick={() => handleVote(true, comment.id, index)}>
                    {comment.your_vote ? <ThumbUpIcon/> : <ThumbUpOutlinedIcon/>}
                  </IconButton>

                  <Typography fontSize={16} color="green" ml={0.5} mr={2}>
                    {comment.good_votes}
                  </Typography>

                  <IconButton color={comment.your_vote === false ? "error" : "default"} size="small"
                              onClick={() => handleVote(false, comment.id, index)}>
                    {comment.your_vote === false ? <ThumbDownIcon/> : <ThumbDownOutlinedIcon/>}
                  </IconButton>

                  <Typography fontSize={16} color="red" ml={0.5} mr={2}>
                    {comment.bad_votes}
                  </Typography>
                </Box>
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
                  <Button disabled={disabled} variant="contained" color="success" endIcon={<SendIcon/>} type="submit">
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
    width: 38,
    height: 38
  }
}
