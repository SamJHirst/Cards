import React from 'react';
import {
    FormControl,
    Grid, 
    RadioGroup,
    Typography
  } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ColourRadio from './ColourRadio';

const useStyles = makeStyles({
    panelHeader: {
        marginTop: '8px !important',
        marginBottom: '8px !important',
    },
    optionsWrapper: {
      width: '100%',
    },
    radioWrapper: {
      margin: '-5.5px 0 !important',
    },
});

interface OptionsPanelProps {
    colour: string;
    colourChange: (e: any, value: string) => void;
}

function OptionsPanel(props: OptionsPanelProps) {
    const { colour, colourChange } = props;
    
    const classes = useStyles();

    return (
        <>
            <Typography variant="h4" align="center" className={classes.panelHeader}>Options</Typography>
            <FormControl className={classes.optionsWrapper}>
                <RadioGroup value={colour} onChange={colourChange} className={classes.optionsWrapper}>
                    <Grid container>
                        <ColourRadio colour="Red" />
                        <ColourRadio colour="Yellow" />
                        <ColourRadio colour="Blue" />
                        <ColourRadio colour="Green" />
                        <ColourRadio colour="Purple" />
                        <ColourRadio colour="Grey" />
                    </Grid>
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default OptionsPanel;