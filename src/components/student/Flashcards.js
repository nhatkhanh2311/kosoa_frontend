import React, {useEffect, useState} from "react";
import ReactCardFlip from "react-card-flip";
import {
  Box, Button, Card, Checkbox, DialogContent, FormControlLabel, Grid, IconButton, Slider, ToggleButton,
  ToggleButtonGroup, Tooltip, Typography
} from "@mui/material";
import {
  ArrowCircleDownOutlined as ArrowCircleDownOutlinedIcon, ArrowCircleLeftOutlined as ArrowCircleLeftOutlinedIcon,
  ArrowCircleRightOutlined as ArrowCircleRightOutlinedIcon, ArrowCircleUpOutlined as ArrowCircleUpOutlinedIcon,
  Keyboard as KeyboardIcon, KeyboardArrowLeft as KeyboardArrowLeftIcon, KeyboardArrowRight as KeyboardArrowRightIcon,
  RestartAlt as RestartAltIcon, Shuffle as ShuffleIcon, Tune as TuneIcon
} from "@mui/icons-material";
import flashCardIcon from "../../assets/icons/flash-card.png";
import logoLime from "../../assets/logo/logo-lime.png";

function Flashcards(props) {
  const [terms, setTerms] = useState([]);
  const [order, setOrder] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [frontTerm, setFrontTerm] = useState(true);
  const [frontPronunciation, setFrontPronunciation] = useState(false);
  const [frontDefinition, setFrontDefinition] = useState(false);
  const [backTerm, setBackTerm] = useState(false);
  const [backPronunciation, setBackPronunciation] = useState(false);
  const [backDefinition, setBackDefinition] = useState(true);

  useEffect(() => {
    let tempTerms = [...props.terms];
    setTerms(tempTerms);
  }, [props.terms]);

  const toLeft = () => {
    setOrder(order - 1);
    setIsFlipped(false);
  }

  const toRight = () => {
    setOrder(order + 1);
    setIsFlipped(false);
  }

  const toCard = (e, value) => {
    setOrder(value - 1);
    setIsFlipped(false);
  }

  const restart = () => {
    setOrder(0);
    setIsFlipped(false);
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
    switch (e.key) {
      case "ArrowLeft": if (order > 0) toLeft(); break;
      case "ArrowRight": if (order < terms.length - 1) toRight(); break;
      case "ArrowUp":
      case "ArrowDown": setIsFlipped(!isFlipped);
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
              <img src={flashCardIcon} alt="Flash Card" height={30}/>
              <Typography fontWeight="bold" fontSize={20} ml={1}>
                Thẻ ghi nhớ
              </Typography>
            </Box>

            <Typography textAlign="center" fontWeight="bold" fontSize={30} mt={10}>
              {props.setName}
            </Typography>

            <Typography textAlign="center" mt={5}>
              Tạo bởi:
            </Typography>

            {props.system && (
              <Box display="flex" justifyContent="center" height={40} mt={1}>
                <img src={logoLime} alt="logo"/>
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
          <Box display="block" mx="auto" width={500}>
            <Box display="flex" justifyContent="center">
              {terms.map((term, index) => index === order && (
                <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                  <Card elevation={6} onClick={() => setIsFlipped(!isFlipped)} sx={styles.card}>
                    <Typography textAlign="center" fontSize={50}>
                      {frontTerm && term.term}
                      {frontTerm && <br/>}
                      {frontPronunciation && term.pronunciation}
                      {frontPronunciation && <br/>}
                      {frontDefinition && term.definition}
                    </Typography>
                  </Card>

                  <Card elevation={6} onClick={() => setIsFlipped(!isFlipped)} sx={styles.card}>
                    <Typography textAlign="center" fontSize={50}>
                      {backTerm && term.term}
                      {backTerm && <br/>}
                      {backPronunciation && term.pronunciation}
                      {backPronunciation && <br/>}
                      {backDefinition && term.definition}
                    </Typography>
                  </Card>
                </ReactCardFlip>
              ))}
            </Box>

            <Box display="flex" justifyContent="center" mt={5}>
              <ToggleButtonGroup value={isFlipped} exclusive
                                 onChange={(e, value) => setIsFlipped(value)}>
                <ToggleButton sx={styles.flipButton} color="success" value={false}>trước</ToggleButton>
                <ToggleButton sx={styles.flipButton} color="success" value={true}>sau</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Grid container mt={5}>
              <Grid item xs={3} display="flex" justifyContent="center">
                <Tooltip title="Thẻ trước">
                  <IconButton disabled={order <= 0} onClick={toLeft}>
                    <KeyboardArrowLeftIcon/>
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                <Typography textAlign="center">
                  {order + 1}/{terms.length}
                </Typography>
              </Grid>

              <Grid item xs={3} display="flex" justifyContent="center">
                <Tooltip title="Thẻ sau">
                  <IconButton disabled={order >= terms.length - 1} onClick={toRight}>
                    <KeyboardArrowRightIcon/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="center">
              <Slider marks size="small" valueLabelDisplay="auto" value={order + 1} min={1} max={terms.length}
                      sx={styles.progress} onChange={toCard}/>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Card elevation={6} sx={styles.bar}>
            <Box mt={3} display="flex" justifyContent="center">
              <TuneIcon/>
              <Typography fontWeight="bold" fontSize={18} ml={1}>
                Tùy chỉnh
              </Typography>
            </Box>

            <Typography mt={3} ml={1}>
              MẶT TRƯỚC
            </Typography>

            <FormControlLabel control={<Checkbox/>} label="Thuật ngữ" checked={frontTerm} sx={styles.check}
                              onChange={() => setFrontTerm(!frontTerm)}/>

            <FormControlLabel control={<Checkbox/>} label="Cách đọc" checked={frontPronunciation} sx={styles.check}
                              onChange={() => setFrontPronunciation(!frontPronunciation)}/>

            <FormControlLabel control={<Checkbox/>} label="Định nghĩa" checked={frontDefinition} sx={styles.check}
                              onChange={() => setFrontDefinition(!frontDefinition)}/>

            <Typography mt={3} ml={1}>
              MẶT SAU
            </Typography>

            <FormControlLabel control={<Checkbox/>} label="Thuật ngữ" checked={backTerm} sx={styles.check}
                              onChange={() => setBackTerm(!backTerm)}/>

            <FormControlLabel control={<Checkbox/>} label="Cách đọc" checked={backPronunciation} sx={styles.check}
                              onChange={() => setBackPronunciation(!backPronunciation)}/>

            <FormControlLabel control={<Checkbox/>} label="Định nghĩa" checked={backDefinition} sx={styles.check}
                              onChange={() => setBackDefinition(!backDefinition)}/>

            <Box mt={3} mb={2} display="flex" justifyContent="center">
              <KeyboardIcon/>
              <Typography fontWeight="bold" fontSize={18} ml={1}>
                Phím tắt
              </Typography>
            </Box>

            <Box ml={1} display="flex">
              <ArrowCircleLeftOutlinedIcon/>
              <Typography ml={1}>
                Thẻ trước
              </Typography>
            </Box>

            <Box ml={1} display="flex">
              <ArrowCircleRightOutlinedIcon/>
              <Typography ml={1}>
                Thẻ sau
              </Typography>
            </Box>

            <Box ml={1} display="flex">
              <ArrowCircleUpOutlinedIcon/>
              <Typography ml={1}>
                Lật thẻ
              </Typography>
            </Box>

            <Box ml={1} display="flex">
              <ArrowCircleDownOutlinedIcon/>
              <Typography ml={1}>
                Lật thẻ
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </DialogContent>
  );
}

export default Flashcards;

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
    height: 400,
    width: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  flipButton: {
    width: 80
  },
  progress: {
    width: 250
  },
  check: {
    ml: 1
  }
}
