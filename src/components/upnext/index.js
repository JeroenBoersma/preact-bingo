import {h, Fragment} from 'preact';
import { useState } from 'preact/hooks';

const Updater = ({memory}) => {

    const [number, setNumber] = useState();
    const updateNumber = () => setNumber(memory.next());

    return (
        <Fragment>
            <Stats stats={memory.stats()} />
            <h1>Called <strong>{number}</strong></h1>
            <button onClick={updateNumber}>Next</button>
            <History history={memory.history} />
        </Fragment>
    )
};

const Stats = ({stats}) => (
    <Fragment>
        <div class="bar bar-sm">
            <div class="bar-item" role="progressbar" style={`width: ${stats.done}%;`} aria-valuenow={stats.done} aria-valuemin="0" aria-valuemax="100" />
        </div>
    </Fragment>
)


const History = ({history}) => (
    <Fragment>
        <h2>Latest</h2>
        <ol class="history">
            {history.map(record => <li>{record}</li>)}
        </ol>
    </Fragment>
);


const UpNext = ({card}) => {

    const memory = card.game();

    return (
        <div class="game-stats">
            <Updater memory={memory} />
        </div>
    );
}

export default UpNext;