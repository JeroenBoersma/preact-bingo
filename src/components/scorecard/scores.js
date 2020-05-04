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

export default Scores;