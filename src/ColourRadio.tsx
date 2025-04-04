import {
    FormControlLabel, 
    Grid, 
    Radio,
} from '@mui/material';

interface ColourRadioProps {
    colour: string;
}

function ColourRadio({ colour }: ColourRadioProps) {
    return (
        <Grid
            item
            xs={12}
            md={6}
        >
            <FormControlLabel
                control={<Radio />}
                label={`${colour} Cards`}
                value={colour.toLowerCase()}
            />
        </Grid>
    )
}

export default ColourRadio;
