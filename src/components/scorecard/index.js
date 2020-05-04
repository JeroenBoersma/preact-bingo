import { useState } from "preact/hooks";
import Card from "../card";
import Scores from "./scores";
import NewPlayer from "./newPlayer";

const ScoreCard = ({card: organiserCard}) => {

    const [players, setScores] = useState([]);
    const [activeCard, setActiveCard] = useState(null);

    const addPlayer = ({name, card}) => setScores((currentPlayers) => [...currentPlayers, {name, card, cardId: card.toString()}]);
    const removePlayer = (playerToDelete) => {
        setScores((currentPlayers) => currentPlayers.filter((player) => player !== playerToDelete));
    }

    const loadCard = (player) => setActiveCard(player.card);

    return (
        <div>
            <h1>Scorecard</h1>
            <Scores players={players} removePlayer={removePlayer} loadCard={loadCard} />
            <NewPlayer addPlayer={addPlayer} />
            {activeCard ? <Card card={activeCard} /> : ''}
        </div>
    );
}

export default ScoreCard;