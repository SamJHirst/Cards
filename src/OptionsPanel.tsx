import {
    FormControl,
    Grid, 
    RadioGroup,
    Typography,
  } from '@mui/material';

import ColourRadio from './ColourRadio';

interface OptionsPanelProps {
    colour: string;
    colourChange: (e: any, value: string) => void;
}

function OptionsPanel({ colour, colourChange }: OptionsPanelProps) {
    return (
        <>
            <Typography
                align="center"
                style={{
                    marginBottom: '8px !important',
                    marginTop: '8px !important',
                }}
                variant="h4"
            >
                Options
            </Typography>
            <FormControl
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <RadioGroup
                    onChange={colourChange}
                    style={{
                        margin: '-5.5px 0 !important',
                    }}
                    value={colour}
                >
                    <Grid
                        container
                    >
                        <ColourRadio
                            colour="Red"
                        />
                        <ColourRadio
                            colour="Yellow"
                        />
                        <ColourRadio
                            colour="Blue"
                        />
                        <ColourRadio
                            colour="Green"
                        />
                        <ColourRadio
                            colour="Purple"
                        />
                        <ColourRadio
                            colour="Black"
                        />
                    </Grid>
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default OptionsPanel;
