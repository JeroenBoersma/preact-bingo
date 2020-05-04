import { useState } from "preact/hooks";
import Card from "../card";
import Scores from "./scores";
import NewPlayer from "./newPlayer";

const RegisterWin = ({card, organiserCard, closeRegistration, registerScore}) => {

    // Update containing fields
    organiserCard.contains(card).map(i => card.field(i).called());

    return (
        <div>
            <button onClick={registerScore}>BINGO!</button>
            <button onClick={closeRegistration}>Close</button>
        </div>
    );
}

const ScoreCard = ({card: organiserCard}) => {

    const [players, setPlayers] = useState([]);
    const [activePlayer, setActivePlayer] = useState(null);

    const addPlayer = ({name, card}) => setPlayers((currentPlayers) => [...currentPlayers, {name, score: 0, card, cardId: card.toString()}]);
    const removePlayer = (playerToDelete) => {
        setPlayers((currentPlayers) => currentPlayers.filter((player) => player !== playerToDelete));
    }

    const openRegistration = (player) => setActivePlayer(player);
    const closeRegistration = () => {setActivePlayer(null)};

    const registerScore = () => {
        activePlayer.score++;

        setPlayers(players.sort((a, b) => a.score - b.score).reverse());

        closeRegistration();
    };

    return (
        <div>
            <h1>Scorecard</h1>
            <Scores players={players} removePlayer={removePlayer} openRegistration={openRegistration} />
            <NewPlayer addPlayer={addPlayer} />
            {activePlayer ? [<Card card={activePlayer.card} />, <RegisterWin card={activePlayer.card} organiserCard={organiserCard} closeRegistration={closeRegistration} registerScore={registerScore} />] : ''}
        </div>
    );
}

export default ScoreCard;