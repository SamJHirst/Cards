import React from 'react';
import {
    FormControlLabel, 
    Grid, 
    Radio
  } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    radioWrapper: {
      margin: '-5.5px 0 !important',
    },
});

interface ColourRadioProps {
    colour: string;
}

function ColourRadio(props: ColourRadioProps) {
    const { colour } = props;
    
    const classes = useStyles();

    return (
        <Grid item xs={6} className={classes.radioWrapper}>
            <FormControlLabel value={colour.toLowerCase()} control={<Radio />} label={`${colour} Cards`} />
        </Grid>
    )
}

export default ColourRadio;