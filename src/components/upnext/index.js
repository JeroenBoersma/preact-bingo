import {h, Fragment} from 'preact';
import { useState } from 'preact/hooks';

const Updater = ({memory}) => {

    const [number, setNumber] = useState();
    const updateNumber = () => setNumber(memory.next());

    return (
        <Fragment>
            <h1 onClick={updateNumber}>Current {number}</h1>
            <button onClick={updateNumber}>Next</button>
            <Stats stats={memory.stats()} />
            <History history={memory.history} />
        </Fragment>
    )
};

const Stats = ({stats}) => (
    <Fragment>
        <h2>Stats</h2>
        <div>
            Remaining: {stats.remaining} ({stats.todo}%)<br />
            Done: {stats.progress} ({stats.done}%)
        </div>

    </Fragment>
)


const History = ({history}) => (
    <Fragment>
        <h2>History</h2>
        <ol>
            {history.map(record => <li>{record}</li>)}
        </ol>
    </Fragment>
);


const UpNext = ({card}) => {

    const memory = card.game();

    return (
        <div>
            <Updater memory={memory} />
        </div>
    );
}

export default UpNext;