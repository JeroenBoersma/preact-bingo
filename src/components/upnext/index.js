import { useState } from 'preact/hooks';
import { Stats } from './stats';
import AutoUpdater from './autoUpdater';
import History from './history';

const UpNext = ({card}) => {

    const memory = card.game();

    const [number, setNumber] = useState();

    const updateNumber = () => setNumber(memory.next());

    return (
        <div class="game-stats">
            <Stats stats={memory.stats()} />
            <h1>Called <strong>{number}</strong></h1>
            <button onClick={updateNumber}>Next</button>
            <AutoUpdater callback={updateNumber} />
            <History history={memory.history} />
        </div>
    );
}

export default UpNext;