import { Fragment } from 'preact';
import { useState } from 'preact/hooks';
import History from './history';
import { AutoUpdater } from './autoUpdater';
import { Stats } from "./stats";

export const Updater = ({ memory }) => {
    const [number, setNumber] = useState();
    const updateNumber = () => setNumber(memory.next());
    return (<Fragment>
        <Stats stats={memory.stats()} />
        <h1>Called <strong>{number}</strong></h1>
        <button onClick={updateNumber}>Next</button>
        <AutoUpdater callback={updateNumber} />
        <History history={memory.history} />
    </Fragment>);
};
