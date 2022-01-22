import React from 'react';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    panelHeader: {
        marginTop: '8px !important',
        marginBottom: '8px !important',
    },
    stat: {
        padding: '1px !important',
    },
});

interface StatsPanelProps {
    score: number;
    higherChance: number;
    lowerChance: number;
    sameChance: number;
    deckSize: number;
}

function StatsPanel(props: StatsPanelProps) {
    const { score, higherChance, lowerChance, sameChance, deckSize } = props;
    
    const classes = useStyles();

    return (
        <>
            <Typography variant="h4" align="center" className={classes.panelHeader}>Scores & Stats</Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell className={classes.stat}><strong>Current Score:</strong></TableCell>
                        <TableCell className={classes.stat}>{score}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.stat}><strong>Chance Next Card is Higher:</strong></TableCell>
                        <TableCell className={classes.stat}>{higherChance}/{deckSize}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.stat}><strong>Chance Next Card is Lower:</strong></TableCell>
                        <TableCell className={classes.stat}>{lowerChance}/{deckSize}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.stat}><strong>Chance Next Card is Same:</strong></TableCell>
                        <TableCell className={classes.stat}>{sameChance}/{deckSize}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default StatsPanel;