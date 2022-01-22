import React from 'react';
import { 
    Button,
    Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    panelHeader: {
        marginTop: '8px !important',
        marginBottom: '8px !important',
    },
    inputButton: {
      width: '100%',
      margin: '5px !important',
    },
});

interface GameOverPanelProps {
    score: number;
    newGame: (e: any) => void;
}

function GameOverPanel(props: GameOverPanelProps) {
    const { score, newGame } = props;
    
    const classes = useStyles();

    return (
        <>
            <Typography variant="h4" align="center" className={classes.panelHeader}>{ score === 51 ? "You Win!" : "Game Over" }</Typography>
            <Typography variant="body1" align="center">Score: {score}</Typography>
            <br />
            <Button variant="contained" onClick={newGame} className={classes.inputButton}>New Game</Button>
        </>
    )
}

export default GameOverPanel;