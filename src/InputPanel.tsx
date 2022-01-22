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

interface InputPanelProps {
    makeGuess: (guess: string) => void;
    gameOver: boolean;
}

function InputPanel(props: InputPanelProps) {
    const { makeGuess, gameOver } = props;
    
    const classes = useStyles();

    return (
        <>
            <Typography variant="h4" align="center" className={classes.panelHeader}>Inputs</Typography>
            <Button variant="contained" onClick={() => makeGuess("higher")} disabled={gameOver} className={classes.inputButton}>Higher</Button>
            <Button variant="contained" onClick={() => makeGuess("lower")} disabled={gameOver} className={classes.inputButton}>Lower</Button>
        </>
    )
}

export default InputPanel;