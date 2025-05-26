import { 
    Card, 
    CardContent,
} from '@mui/material';

interface PanelProps {
    children: JSX.Element;
}

function Panel({ children }: PanelProps) {
    return (
        <Card
            style={{
                height: '100%',
            }}
        >
            <CardContent
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    height: 'calc(100% - 40px)',
                }}
            >
                {children}
            </CardContent>
        </Card>
    )
}

export default Panel;
