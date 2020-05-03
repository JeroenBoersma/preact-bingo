import {h} from 'preact';
import { useState } from 'preact/hooks';

const Updater = (props) => {
    const memory = props.memory;

    const [number, setNumber] = useState();
    const updateNumber = () => setNumber(memory.next());

    return (
        <div>
            <h1 onClick={updateNumber}>Current {number} ({memory.done()}%)</h1>
            <button onClick={updateNumber}>Next</button>
            <History memory={memory} />
        </div>
    )
};

const History = (props) => (
    <div>
        <h2>History</h2>
        <ol>
            {props.memory.history.map(record => <li>{record}</li>)}
        </ol>
    </div>
);


const UpNext = (props) => {

    const memory = props.card.game();

    return (
        <div>
            <Updater memory={memory} />
        </div>
    );
}

export default UpNext;