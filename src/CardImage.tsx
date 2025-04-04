import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    card: {
        margin: 10,
    },
});

export interface PlayingCard {
    suit: string;
    run: string;
    value: number;
    path: string;
    visible: boolean;
}

interface CardImageProps {
    card: PlayingCard;
    index: number;
    colour: string;
}

function CardImage(props: CardImageProps) {
    const { card, index, colour } = props;
    
    const classes = useStyles();

    return (
        card.visible 
        ? <img src={card.path} alt={`${card.run} of ${card.suit}`} className={classes.card} key={index} />
        : <img src={`/img/backs/${colour}.svg`} alt="Back of card" className={classes.card} key={index} />
    )
}

export default CardImage;