import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
  Avatar, Box, Button, Card, CardHeader, CircularProgress, DialogContent, Grid, LinearProgress, ToggleButton, Typography
} from "@mui/material";
import {
  Close as CloseIcon, Done as DoneIcon, Keyboard as KeyboardIcon, KeyboardArrowLeft as KeyboardArrowLeftIcon,
  Looks3Outlined as Looks3OutlinedIcon, Looks4Outlined as Looks4OutlinedIcon, LooksOneOutlined as LooksOneOutlinedIcon,
  LooksTwoOutlined as LooksTwoOutlinedIcon, RestartAlt as RestartAltIcon, Shuffle as ShuffleIcon,
  SkipNext as SkipNextIcon, SpaceBarOutlined as SpaceBarOutlinedIcon
} from "@mui/icons-material";
import multipleChoiceIcon from "../../assets/icons/multiple-choice.png";
import logoLime from "../../assets/logo/logo-lime.png";

function MultipleChoices(props) {
  const [terms, setTerms] = useState([0, 0, 0, 0]);
  const [order, setOrder] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [numberRight, setNumberRight] = useState(0);
  const [numberWrong, setNumberWrong] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isChosen, setIsChosen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let tempTerms = [...props.terms];
    setTerms(tempTerms);
  }, [props.terms]);

  useEffect(() => {
    randomAnswers();
  }, [order, isShuffled]);

  const start = () => {
    randomAnswers();
    setIsStarted(true);
  }

  const restart = () => {
    setOrder(0);
    setNumberRight(0);
    setNumberWrong(0);
    setIsChosen(false);
    setIsStarted(false);
    setIsEnded(false);
  }

  const nextTerm = () => {
    if (order === terms.length - 1) {
      setIsEnded(true);
    }
    else {
      setOrder(order + 1);
      setIsChosen(false);
    }
  }

  const chooseAnswer = (answer) => {
    if (!isChosen) {
      setChosenAnswer(answer);
      setIsChosen(true);
      if (answers[answer] === order) setNumberRight(numberRight + 1);
      else setNumberWrong(numberWrong + 1);
    }
  }

  const randomAnswers = () => {
    setLoading(true);
    let tempAnswers = [];
    while (tempAnswers.length < 3) {
      let randomNumber = Math.floor(Math.random() * terms.length);
      if (!(tempAnswers.includes(randomNumber) || randomNumber === order)) {
        tempAnswers.push(randomNumber);
      }
    }
    tempAnswers.splice(Math.floor(Math.random() * 4), 0, order);
    setAnswers(tempAnswers);
    setLoading(false);
  }

  const shuffle = () => {
    if (!isShuffled) {
      let tempTerms = [...terms], currentIndex = tempTerms.length, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [tempTerms[currentIndex], tempTerms[randomIndex]] = [tempTerms[randomIndex], tempTerms[currentIndex]];
      }
      setTerms(tempTerms);
    }
    else {
      let tempTerms = [...props.terms];
      setTerms(tempTerms);
    }
    setIsShuffled(!isShuffled);
    restart();
  }

  const handleKeyPress = (e) => {
    console.log(e.key);
    switch (e.key) {
      case "1": if (isStarted && !isEnded) chooseAnswer(0); break;
      case "2": if (isStarted && !isEnded) chooseAnswer(1); break;
      case "3": if (isStarted && !isEnded) chooseAnswer(2); break;
      case "4": if (isStarted && !isEnded) chooseAnswer(3); break;
      case " ":
        if (!isStarted) start();
        else if (isEnded) restart();
        else if (isChosen) nextTerm();
    }
  }

  return (
    <DialogContent sx={styles.content}>
      <Button startIcon={<KeyboardArrowLeftIcon/>} variant="text" color="success"
              onClick={() => props.exit()}>
        quay lại
      </Button>

      <Grid container mt={5}>
        <Grid item xs={2}>
          <Card elevation={6} sx={styles.bar}>
            <Box mt={3} display="flex" justifyContent="center">
              <img src={multipleChoiceIcon} alt="Multiple Choice" height={30}/>
              <Typography fontWeight="bold" fontSize={20} ml={1}>
                Trắc nghiệm
              </Typography>
            </Box>

            <Typography textAlign="center" fontWeight="bold" fontSize={30} mt={10}>
              {props.setName}
            </Typography>

            <Typography textAlign="center" mt={5}>
              Tạo bởi:
            </Typography>

            {props.system ? (
              <Box display="flex" justifyContent="center" height={40} mt={1}>
                <img src={logoLime} alt="logo"/>
              </Box>
            ) : (
              <Box display="flex" justifyContent="center" height={40} mt={1}>
                <CardHeader avatar={<Avatar src={props.author.avatar} component={Link}
                                            to={`/user/${props.author.id}`} target="_blank"/>}
                            title={
                              <Typography sx={styles.title} component={Link}
                                          to={`/user/${props.author.id}`} target="_blank">
                                {props.author.name}
                              </Typography>
                            }/>
              </Box>
            )}

            <Box mt={12} display="flex" justifyContent="center">
              <ToggleButton color="success" value="check" selected={isShuffled}
                            sx={styles.barButton} onChange={shuffle}>
                <ShuffleIcon sx={{mr: 1}}/>
                xáo trộn
              </ToggleButton>
            </Box>

            <Box mt={1} display="flex" justifyContent="center">
              <ToggleButton color="success" disabled={order === 0} value="check"
                            sx={styles.barButton} onClick={restart}>
                <RestartAltIcon sx={{mr: 1}}/>
                bắt đầu lại
              </ToggleButton>
            </Box>

            <Box mt={1} display="flex" justifyContent="center">
              <ToggleButton color="success" value="check" selected={isKeyboardActive}
                            sx={styles.barButton} onKeyDown={handleKeyPress}
                            onFocus={() => setIsKeyboardActive(true)}
                            onBlur={() => setIsKeyboardActive(false)}>
                <KeyboardIcon sx={{mr: 1}}/>
                ấn phím tắt
              </ToggleButton>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={8}>
          {terms.length > 3 && (
            <Box display="block" mx="auto" width={700}>
              {isStarted && !isEnded && (
                <>
                  <Box display="flex" justifyContent="center">
                    <Card elevation={6} sx={styles.card}>
                      <Typography fontSize={20} ml={2} mt={2}>
                        Thuật ngữ:
                      </Typography>

                      <Typography textAlign="center" fontSize={30}>
                        {terms[order].term}
                      </Typography>

                      <Typography fontSize={20} ml={2} mt={5}>
                        Chọn định nghĩa đúng:
                      </Typography>

                      {loading ? (
                        <Box display="flex" justifyContent="center">
                          <CircularProgress color="success"/>
                        </Box>
                      ) : (
                        <Grid container spacing={2} px={1} my={1}>
                          {[0, 1, 2, 3].map((index) => (
                            <Grid item xs={6}>
                              <ToggleButton value={index + 1} selected={isChosen} fullWidth sx={styles.answer}
                                            color={isChosen ? (answers[index] === order ? "success" :
                                              (chosenAnswer === index ? "error" : "standard")) : "standard"}
                                            onClick={() => chooseAnswer(index)}>
                                {isChosen && answers[index] === order && (
                                  <Avatar sx={{bgcolor: "green"}}><DoneIcon/></Avatar>
                                )}
                                {isChosen && answers[index] !== order && chosenAnswer === index && (
                                  <Avatar sx={{bgcolor: "red"}}><CloseIcon/></Avatar>
                                )}
                                {isChosen && answers[index] !== order && chosenAnswer !== index && (
                                  <Avatar>{index + 1}</Avatar>
                                )}
                                {!isChosen && (
                                  <Avatar>{index + 1}</Avatar>
                                )}
                                <Typography fontSize={23} ml={1}>
                                  {terms[answers[index]].definition}
                                </Typography>
                              </ToggleButton>
                            </Grid>
                          ))}
                        </Grid>
                      )}

                      <Box display="flex" justifyContent="right" my={2} mr={1}>
                        <Button disabled={!isChosen} color="success" variant="contained" endIcon={<SkipNextIcon/>}
                                onClick={nextTerm}>
                          tiếp
                        </Button>
                      </Box>
                    </Card>
                  </Box>

                  <Grid container mt={5}>
                    <Grid item xs={3}>
                      <Typography textAlign="center" fontSize={20} color="green">
                        Đúng
                      </Typography>
                    </Grid>

                    <Grid item xs={6}/>

                    <Grid item xs={3}>
                      <Typography textAlign="center" fontSize={20} color="red">
                        Sai
                      </Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography textAlign="center" fontSize={20} color="green">
                        {numberRight}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography textAlign="center" fontSize={20}>
                        {order + 1}/{terms.length}
                      </Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography textAlign="center" fontSize={20} color="red">
                        {numberWrong}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box display="flex" justifyContent="center" mt={1}>
                    <LinearProgress variant="determinate" value={(order + 1) / terms.length * 100} sx={styles.progress}/>
                  </Box>
                </>
              )}

              {isEnded && (
                <Box display="flex" justifyContent="center">
                  <Card elevation={6} sx={styles.card2}>
                    <Typography textAlign="center" fontSize={30}>
                      Kết thúc!
                      <br/>
                      Kết quả: {numberRight}/{terms.length}
                    </Typography>
                  </Card>
                </Box>
              )}

              {!isStarted && (
                <Box display="flex" justifyContent="center">
                  <Card elevation={6} sx={styles.card2}>
                    <Button color="success" variant="contained" size="large" onClick={start}>
                      bắt đầu
                    </Button>
                  </Card>
                </Box>
              )}
            </Box>
          )}
        </Grid>

        <Grid item xs={2}>
          <Card elevation={6} sx={styles.bar}>
            <Box mt={3} mb={2} display="flex" justifyContent="center">
              <KeyboardIcon/>
              <Typography fontWeight="bold" fontSize={18} ml={1}>
                Phím tắt
              </Typography>
            </Box>

            <Box ml={1} display="flex">
              <LooksOneOutlinedIcon/>
              <Typography ml={1}>
                Chọn đáp án 1
              </Typography>
            </Box>

            <Box ml={1} display="flex">
              <LooksTwoOutlinedIcon/>
              <Typography ml={1}>
                Chọn đáp án 2
              </Typography>
            </Box>

            <Box ml={1} display="flex">
              <Looks3OutlinedIcon/>
              <Typography ml={1}>
                Chọn đáp án 3
              </Typography>
            </Box>

            <Box ml={1} display="flex">
              <Looks4OutlinedIcon/>
              <Typography ml={1}>
                Chọn đáp án 4
              </Typography>
            </Box>

            <Box ml={1} display="flex">
              <SpaceBarOutlinedIcon/>
              <Typography ml={1}>
                Tiếp tục
              </Typography>
            </Box>

            <Box ml={1} display="flex">
              <SpaceBarOutlinedIcon/>
              <Typography ml={1}>
                Bắt đầu
              </Typography>
            </Box>

            <Box ml={1} display="flex">
              <SpaceBarOutlinedIcon/>
              <Typography ml={1}>
                Bắt đầu lại
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </DialogContent>
  );
}

export default MultipleChoices;

const styles = {
  content: {
    backgroundColor: "#fcffe6"
  },
  bar: {
    minHeight: 600
  },
  barButton: {
    width: "75%"
  },
  card: {
    width: 700
  },
  card2: {
    width: 700,
    height: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  answer: {
    justifyContent: "flex-start",
    textTransform: "none"
  },
  progress: {
    width: 250
  },
  title: {
    fontWeight: "bold",
    textDecoration: "none"
  }
}
