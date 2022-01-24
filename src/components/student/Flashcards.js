import React, {useEffect, useState} from "react";
import ReactCardFlip from "react-card-flip";
import {
  Box, Button, Card, Checkbox, DialogContent, FormControlLabel, Grid, IconButton, Slider, ToggleButton,
  ToggleButtonGroup, Tooltip, Typography
} from "@mui/material";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon, KeyboardArrowRight as KeyboardArrowRightIcon,
  RestartAlt as RestartAltIcon, Shuffle as ShuffleIcon, Tune as TuneIcon
} from "@mui/icons-material";
import flashCardIcon from "../../assets/icons/flash-card.png";

function Flashcards(props) {
  const [terms, setTerms] = useState([]);
  const [order, setOrder] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
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
    setIsFlipped(false);
    setOrder(0);
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

            <Typography textAlign="center" mt={5} ml={1}>
              Tạo bởi:
            </Typography>

            {props.system && (
              <Typography textAlign="center" fontWeight="bold" fontSize={18} color="green" ml={1}>
                KoSoA
              </Typography>
            )}

            <Box mt={12} display="flex" justifyContent="center">
              <ToggleButton color="success" value="check" selected={isShuffled}
                            sx={styles.barButton} onChange={shuffle}>
                <ShuffleIcon/>
                trộn thẻ
              </ToggleButton>
            </Box>

            <Box mt={1} display="flex" justifyContent="center">
              <ToggleButton color="success" disabled={order === 0} value="check" selected={order !== 0}
                            sx={styles.barButton} onClick={() => setOrder(0)}>
                <RestartAltIcon/>
                bắt đầu lại
              </ToggleButton>
            </Box>
          </Card>
        </Grid>

        {terms.length > 0 && (
          <Grid item xs={8}>
            <Box display="block" mx="auto" height={400} width={500}>
              <Box display="flex" justifyContent="center">
                {terms.map((term, index) => index === order && (
                  <ReactCardFlip isFlipped={isFlipped}>
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
        )}

        <Grid item xs={2}>
          <Card elevation={6} sx={styles.bar}>
            <Box mt={3} display="flex" justifyContent="center">
              <TuneIcon/>
              <Typography fontWeight="bold" fontSize={18} ml={1}>
                Tùy chỉnh
              </Typography>
            </Box>

            <Typography mt={6} ml={1}>
              MẶT TRƯỚC
            </Typography>

            <FormControlLabel control={<Checkbox/>} label="Thuật ngữ" checked={frontTerm} sx={styles.check}
                              onChange={() => setFrontTerm(!frontTerm)}/>

            <FormControlLabel control={<Checkbox/>} label="Cách đọc" checked={frontPronunciation} sx={styles.check}
                              onChange={() => setFrontPronunciation(!frontPronunciation)}/>

            <FormControlLabel control={<Checkbox/>} label="Định nghĩa" checked={frontDefinition} sx={styles.check}
                              onChange={() => setFrontDefinition(!frontDefinition)}/>

            <Typography mt={5} ml={1}>
              MẶT SAU
            </Typography>

            <FormControlLabel control={<Checkbox/>} label="Thuật ngữ" checked={backTerm} sx={styles.check}
                              onChange={() => setBackTerm(!backTerm)}/>

            <FormControlLabel control={<Checkbox/>} label="Cách đọc" checked={backPronunciation} sx={styles.check}
                              onChange={() => setBackPronunciation(!backPronunciation)}/>

            <FormControlLabel control={<Checkbox/>} label="Định nghĩa" checked={backDefinition} sx={styles.check}
                              onChange={() => setBackDefinition(!backDefinition)}/>
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
    height: 600
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
