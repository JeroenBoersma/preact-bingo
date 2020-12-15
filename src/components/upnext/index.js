import { useState } from 'preact/hooks';
import { Stats } from './stats';
import AutoUpdater from './autoUpdater';
import History from './history';

const UpNext = ({card}) => {

    const game = card.game();

    const [number, setNumber] = useState();

    const updateNumber = () => setNumber(game.next());
    const newGame = () => {
        game.reset();
        setNumber();
    }

    return (
        <div>
            <Stats stats={game.stats()} />
            <h1>Called <strong>{number}</strong></h1>
            <button onClick={updateNumber}>Next</button>
            <button onClick={newGame}>New game</button>
            <AutoUpdater callback={updateNumber} />
            <History history={game.history} />
        </div>
    );
}

export default UpNext;