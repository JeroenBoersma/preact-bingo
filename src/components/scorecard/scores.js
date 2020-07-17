const Scores = ({players, removePlayer, openRegistration, organiserCard}) => (
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
                <td onClick={() => openRegistration(player)}>
                    {player.name}
                </td>
                <td>{player.score}</td>
                <td>
                    <a href={`/card/${player.cardId}`} class="card-id">{player.cardId}</a>
                </td>
                <td onCLick={() => removePlayer(player)}>X</td>
            </tr>)}
        </tbody>
    </table>
)

export default Scores;
