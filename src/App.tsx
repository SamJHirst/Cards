import { useState } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import CardImage, { PlayingCard } from './CardImage';
import GameOverPanel from './GameOverPanel';
import InputPanel from './InputPanel';
import OptionsPanel from './OptionsPanel';
import Panel from './Panel';
import StatsPanel from './StatsPanel';

const useStyles = makeStyles({
    root: {
        backgroundImage: 'url("/img/background.jpg")',
        width: '100%',
        height: '100%',
    },
    game: {
        height: 'calc(100% - 200px)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    panels: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        width: 'calc(100% - 20px)',
    },
});

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

    const cardsToDisplay = Math.floor(window.innerWidth / 236) - 1;

    // @ts-ignore
    const colourChange = (e: React.FormEvent<HTMLInputElement>, value: string) => {
        setColour(value);
    }

    const makeGuess = (guess: string) => {
        const visibleCards = cards.filter(x => x.visible);
        const latestCard = visibleCards[visibleCards.length - 1];
        const invisibleCards = cards.filter(x => !x.visible);
        const nextCard = invisibleCards[0];
        const nextCardIndex = cards.findIndex(x => x === nextCard);
        cards[nextCardIndex].visible = true;
        setCards(cards);
        if ((guess === 'higher' && nextCard.value >= latestCard.value) || (guess === 'lower' && nextCard.value <= latestCard.value)) {
            updateStats(cards);
            setScore(score + 1);
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

    // @ts-ignore
    const newGame = (e: React.FormEvent<HTMLButtonElement>) => {
        setCards([]);
        setScore(0);
        setGameOver(false);
    }

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

    if (score === 51 && !gameOver) {
        setGameOver(true);
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.game}>
                {
                    cards.filter(x => x.visible).splice(0 - cardsToDisplay, cardsToDisplay).concat(cards.filter(x => !x.visible)).map((card, i) => (
                        <CardImage
                            card={card}
                            index={i}
                            colour={colour}
                        />
                    ))
                }
            </div>
            <div className={classes.panels}>
                <Grid container spacing={2}>
                    <Panel
                        children={gameOver
                            ?
                            <GameOverPanel
                                score={score}
                                newGame={newGame}
                            />
                            :
                            <StatsPanel
                                score={score}
                                higherChance={higherChance}
                                lowerChance={lowerChance}
                                sameChance={sameChance}
                                deckSize={deckSize}
                            />
                        }
                    />
                    <Panel
                        children={<InputPanel
                            makeGuess={makeGuess}
                            gameOver={gameOver}
                        />}
                    />
                    <Panel
                        children={<OptionsPanel
                            colour={colour}
                            colourChange={colourChange}
                        />}
                    />
                </Grid>
            </div>
        </div>
    );
}

export default App;
