import { useState, useRef } from "preact/hooks";
import UniqueGenerator from "../../lib/board";
import Card from "../card";

const Scores = ({players, removePlayer, loadCard}) => (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Score</th>
                <th title="Card ID">#</th>
                <th />
            </tr>
        </thead>
        <tbody>
            {players.map(player => <tr>
                <td onClick={() => loadCard(player)}>
                    {player.name}
                </td>
                <td>0</td>
                <td>
                    <a href={`/card/${player.cardId}`} class="card-id">{player.cardId}</a>
                </td>
                <td onCLick={() => removePlayer(player)}>X</td>
            </tr>)}
        </tbody>
    </table>
)

const NewPlayer = ({addPlayer}) => {

    const [name, setName] = useState("");
    const inputRef = useRef();

    const submit = (e) => {
        e.preventDefault();

        if ("" === name) {
            return;
        }

        addPlayer({name, card: UniqueGenerator.randomize()})
        setName("");

        inputRef.current.focus();
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input ref={inputRef} value={name} onInput={(f) => setName(f.target.value)} placeholder="Name" />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

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