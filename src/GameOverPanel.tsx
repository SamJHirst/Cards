import { 
    Button,
    Typography,
} from '@mui/material';

interface GameOverPanelProps {
    newGame: (e: any) => void;
    score: number;
}

function GameOverPanel({ newGame, score }: GameOverPanelProps) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <Typography
                align="center"
                style={{
                    marginBottom: '8px !important',
                    marginTop: '8px !important',
                }}
                variant="h4"
            >
                { score === 51 ? "You Win!" : "Game Over" }
            </Typography>
            <Typography
                align="center"
                variant="body1"
            >
                Score: {score}
            </Typography>
            <Button
                onClick={newGame}
                style={{
                    margin: '5px !important',
                    width: '100%',
                }}
                variant="contained"
            >
                New Game
            </Button>
        </div>
    )
}

export default GameOverPanel;
