import { 
    Card, 
    CardContent
} from '@mui/material';

interface PanelProps {
    children: JSX.Element;
}

function Panel(props: PanelProps) {
    const { children } = props;

    return (
        <Card style={{
            height: '100%',
        }}>
            <CardContent style={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100% - 40px)',
            }}>
                {children}
            </CardContent>
        </Card>
    )
}

export default Panel;