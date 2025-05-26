import { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';

import CardImage, { PlayingCard } from './CardImage';
import GameOverPanel from './GameOverPanel';
import InputPanel from './InputPanel';
import OptionsPanel from './OptionsPanel';
import Panel from './Panel';
import StatsPanel from './StatsPanel';

const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
const runs = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function App() {
    const [cards, setCards] = useState<PlayingCard[]>([]);
    const [colour, setColour] = useState<string>('red');
    const [score, setScore] = useState<number>(0);
    const [deckSize, setDeckSize] = useState<number>(0);
    const [higherChance, setHigherChance] = useState<number>(0);
    const [lowerChance, setLowerChance] = useState<number>(0);
    const [sameChance, setSameChance] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);

    const containerRef = useRef(null);

    // @ts-ignore
    const colourChange = (e: React.FormEvent<HTMLInputElement>, value: string) => {
        setColour(value);
    }

    const makeGuess = (guess: 'HIGHER' | 'LOWER') => {
        const visibleCards = cards.filter(x => x.visible);
        const latestCard = visibleCards[visibleCards.length - 1];
        const invisibleCards = cards.filter(x => !x.visible);
        const nextCard = invisibleCards[0];
        const nextCardIndex = cards.findIndex(x => x === nextCard);
        cards[nextCardIndex].visible = true;
        setCards(cards);

        if (containerRef.current) {
            const containerDiv = containerRef.current as HTMLDivElement;
            if (nextCardIndex + 1 < cards.length) {
                containerDiv.children[nextCardIndex + 1].scrollIntoView();
            }
        }

        if ((guess === 'HIGHER' && nextCard.value >= latestCard.value) || (guess === 'LOWER' && nextCard.value <= latestCard.value)) {
            updateStats(cards);
            setScore(score + 1);

            if (score === 51 && !gameOver) {
                setGameOver(true);
            }
        } else {
            setGameOver(true);
        }
    }

    const updateStats = (cards: PlayingCard[]) => {
        const visibleCards = cards.filter(x => x.visible);
        const latestCard = visibleCards[visibleCards.length - 1];

        setDeckSize(52 - visibleCards.length);
        setHigherChance(cards.filter(x => !x.visible && x.value > latestCard.value).length);
        setLowerChance(cards.filter(x => !x.visible && x.value < latestCard.value).length);
        setSameChance(cards.filter(x => !x.visible && x.value === latestCard.value).length);
    }

    const newGame = () => {
        setCards([]);
        setScore(0);
        setGameOver(false);

        if (cards.length === 0) {
            const deck: PlayingCard[] = [];
            for (const suit of suits) {
                for (const [value, run] of runs.entries()) {
                    deck.push({
                        suit,
                        run,
                        value,
                        path: `/img/${suit}/${run}.svg`,
                        visible: false
                    });

                    // preload image
                    new Image().src = `/img/${suit}/${run}.svg`;
                }
            }
            const shuffled = deck
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            shuffled[0].visible = true;
            setCards(shuffled);
            updateStats(shuffled);
        }

        if (containerRef.current) {
            const containerDiv = containerRef.current as HTMLDivElement;
            containerDiv.scrollLeft = 0;
        }
    }

    useEffect(newGame, []);

    return (
        <div
            style={{
                backgroundImage: 'url("/img/background.jpg")',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
            }}
        >
            <div
                className="hide-scrollbar"
                ref={containerRef}
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    flexGrow: 1,
                    overflowX: 'scroll',
                    overflowY: 'hidden',
                    whiteSpace: 'nowrap',
                }}
            >
                {
                    cards.map((card, i) => (
                        <CardImage
                            card={card}
                            colour={colour}
                            key={i}
                        />
                    ))
                }
            </div>
            <div
                style={{
                    alignItems: 'stretch',
                    display: 'flex',
                    flexGrow: 0,
                    padding: 10,
                }}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        md={6}
                        lg={4}
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'block',
                            }
                        }}
                    >
                        <Panel
                            children={
                                <StatsPanel
                                    deckSize={deckSize}
                                    higherChance={higherChance}
                                    lowerChance={lowerChance}
                                    sameChance={sameChance}
                                    score={score}
                                />
                            }
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        lg={4}
                    >
                        <Panel
                            children={
                                gameOver
                                    ? (
                                        <GameOverPanel
                                            newGame={newGame}
                                            score={score}
                                        />
                                    )
                                    : (
                                        <InputPanel
                                            makeGuess={makeGuess}
                                        />
                                    )
                            }
                        />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        sx={{
                            display: {
                                xs: 'none',
                                lg: 'block',
                            }
                        }}
                    >
                        <Panel
                            children={
                                <OptionsPanel
                                    colour={colour}
                                    colourChange={colourChange}
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default App;
