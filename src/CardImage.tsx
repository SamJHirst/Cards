export interface PlayingCard {
    path: string;
    run: string;
    suit: string;
    value: number;
    visible: boolean;
}

interface CardImageProps {
    card: PlayingCard;
    colour: string;
}

function CardImage({ card, colour }: CardImageProps) {  
    if (!card.visible) {
        return (
            <img
                alt="Back of a playing card"
                src={`/img/backs/${colour}.svg`}
                style={{
                    margin: 10,
                    maxWidth: '33vw',
                }}
            />
        )
    }

    return (
        <img
            alt={`${card.run} of ${card.suit} playing card`}
            src={card.path}
            style={{
                margin: 10,
                maxWidth: '33vw',
            }}
        />
    )
}

export default CardImage;
