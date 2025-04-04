import {
    FormControlLabel, 
    Grid, 
    Radio
  } from '@mui/material';

interface ColourRadioProps {
    colour: string;
}

function ColourRadio(props: ColourRadioProps) {
    const { colour } = props;
    
    return (
        <Grid item xs={12} md={6}>
            <FormControlLabel value={colour.toLowerCase()} control={<Radio />} label={`${colour} Cards`} />
        </Grid>
    )
}

export default ColourRadio;