import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';

interface StatsPanelProps {
    score: number;
    higherChance: number;
    lowerChance: number;
    sameChance: number;
    deckSize: number;
}

function StatsPanel({
    deckSize,
    higherChance,
    lowerChance,
    sameChance,
    score,
}: StatsPanelProps) {
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
                Scores & Stats
            </Typography>
            <TableContainer
                style={{
                    display: 'flex',
                    flex: 1,
                }}
            >
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                style={{
                                    padding: '1px !important',
                                }}
                            >
                                <strong>Current Score:</strong>
                            </TableCell>
                            <TableCell
                                style={{
                                    padding: '1px !important',
                                }}
                            >
                                {score}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                style={{
                                    padding: '1px !important',
                                }}
                            >
                                <strong>Chance Next Card is Higher:</strong>
                            </TableCell>
                            <TableCell
                                style={{
                                    padding: '1px !important',
                                }}
                            >
                                {higherChance}/{deckSize}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                style={{
                                    padding: '1px !important',
                                }}
                            >
                                <strong>Chance Next Card is Lower:</strong>
                            </TableCell>
                            <TableCell
                                style={{
                                    padding: '1px !important',
                                }}
                            >
                                {lowerChance}/{deckSize}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                style={{
                                    padding: '1px !important',
                                }}
                            >
                                <strong>Chance Next Card is Same:</strong>
                            </TableCell>
                            <TableCell
                                style={{
                                    padding: '1px !important',
                                }}
                            >
                                {sameChance}/{deckSize}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default StatsPanel;
