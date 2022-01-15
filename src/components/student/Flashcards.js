import React, {useState} from "react";
import {Box, Card, DialogContent, Grid, IconButton, Typography} from "@mui/material";
import ReactCardFlip from "react-card-flip";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon, KeyboardArrowRight as KeyboardArrowRightIcon
} from "@mui/icons-material";

function Flashcards(props) {
  const [order, setOrder] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const toLeft = () => {
    setOrder(order - 1);
    setIsFlipped(false);
  }

  const toRight = () => {
    setOrder(order + 1);
    setIsFlipped(false);
  }

  return (
    <DialogContent>
      <Box display="block" mx="auto" mt={10} height={400} width={500}>
        <ReactCardFlip isFlipped={isFlipped}>
          <Card onClick={() => setIsFlipped(!isFlipped)} sx={styles.card}>
            <Typography textAlign="center" fontSize={50}>
              {props.terms[order].term}
            </Typography>
          </Card>

          <Card onClick={() => setIsFlipped(!isFlipped)} sx={styles.card}>
            <Typography textAlign="center" fontSize={50}>
              {props.terms[order].definition}
            </Typography>
          </Card>
        </ReactCardFlip>

        <Grid container mt={10}>
          <Grid item xs={3}>
            <IconButton disabled={order <= 0} onClick={toLeft}>
              <KeyboardArrowLeftIcon/>
            </IconButton>
          </Grid>

          <Grid item xs={6}>
            <Typography textAlign="center">
              {order + 1}/{props.terms.length}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <IconButton disabled={order >= props.terms.length - 1} onClick={toRight}>
              <KeyboardArrowRightIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </DialogContent>
  );
}

export default Flashcards;

const styles = {
  card: {
    height: 400,
    width: 600,
    backgroundColor: "#fcffe6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}
