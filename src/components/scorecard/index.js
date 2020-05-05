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
        setPlayers(players.sort((a, b) => {
            const score = a.score - b.score;
            if (score !== 0) {
                return score;
            }

            return organiserCard.done(a.card) - organiserCard.done(b.card);
        }).reverse());
    }

    useEffect(() => {
        const callback = () => {sortPlayers()}

        organiserCard.game().subscribe('next', callback);
        return () => {
            organiserCard.game().unsubscribe('next', callback);
        }
    });


    const registerScore = () => {
        activePlayer.score++;

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