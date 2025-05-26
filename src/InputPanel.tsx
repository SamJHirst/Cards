import { 
    Button,
    Typography,
} from '@mui/material';

interface InputPanelProps {
    gameOver: boolean;
    makeGuess: (guess: 'HIGHER' | 'LOWER') => void;
}

function InputPanel({ gameOver, makeGuess }: InputPanelProps) {
    return (
        <>
            <Typography
                align="center"
                style={{
                    marginBottom: '24px !important',
                    marginTop: '8px !important',
                }}
                variant="h4"
            >
                Inputs
            </Typography>
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    gap: '8px',
                }}
            >
                <Button
                    disabled={gameOver}
                    onClick={() => makeGuess('HIGHER')}
                    style={{
                        margin: '5px !important',
                        width: '100%',
                    }}
                    variant="contained"
                >
                    Higher
                </Button>
                <Button
                    disabled={gameOver}
                    onClick={() => makeGuess('LOWER')}
                    style={{
                        margin: '5px !important',
                        width: '100%',
                    }}
                    variant="contained"
                >
                    Lower
                </Button>
            </div>
        </>
    )
}

export default InputPanel;
