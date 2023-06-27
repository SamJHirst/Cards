import { 
    Card, 
    CardContent,
    Grid
} from '@mui/material';

interface PanelProps {
    children: JSX.Element;
}

function Panel(props: PanelProps) {
    const { children } = props;

    return (
        <Grid item xs={4}>
            <Card>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Panel;