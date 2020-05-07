import { useState, useEffect } from "preact/hooks";
import Card from "../card";
import Scores from "./scores";
import NewPlayer from "./newPlayer";
import RegisterWin from './registerWin';

const ScoreCard = ({card: organiserCard}) => {

    const [players, setPlayers] = useState([]);
    const [activePlayer, setActivePlayer] = useState(null);

    const addPlayer = ({name, card}) => setPlayers((currentPlayers) => [...currentPlayers, {name, score: 0, card, cardId: card.toString()}]);
    const removePlayer = (playerToDelete) => {
        setPlayers((currentPlayers) => currentPlayers.filter((player) => player !== playerToDelete));
    }

    const openRegistration = (player) => setActivePlayer(player);
    const closeRegistration = () => {setActivePlayer(null)};

    const sortPlayers = () => {
        setPlayers(players => players.slice(0).sort((a, b) => {
            const score = b.score - a.score;
            if (score !== 0) {
                return score;
            }

            return organiserCard.done(b.card) - organiserCard.done(a.card);
        }));
    }

    const resetGames = () => {
        closeRegistration();

        players.map(p => p.card.reset());
        sortPlayers();
    }

    useEffect(() => {
        const callback = () => sortPlayers();
        const callback2 = () => resetGames();

        organiserCard.game().subscribe('next', callback);
        organiserCard.game().subscribe('reset', callback2);
        return () => {
            organiserCard.game().unsubscribe('next', callback);
            organiserCard.game().unsubscribe('reset', callback2);
        }
    });

    const registerScore = (score) => {
        activePlayer.score+=score;

        sortPlayers();
        closeRegistration();
    };

    return (
        <div>
            <h1>Scorecard</h1>
            <Scores players={players} organiserCard={organiserCard} removePlayer={removePlayer} openRegistration={openRegistration} />
            <NewPlayer addPlayer={addPlayer} />
            {activePlayer ? [<Card card={activePlayer.card} />, <RegisterWin card={activePlayer.card} organiserCard={organiserCard} closeRegistration={closeRegistration} registerScore={registerScore} />] : ''}
        </div>
    );
}

export default ScoreCard;