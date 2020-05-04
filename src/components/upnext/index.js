import {h, Fragment, Component} from 'preact';
import { useState, useEffect } from 'preact/hooks';


class AutoUpdater extends Component {

    timerState;
    callback;

    maxTime = 4;
    timeout = 1000;

    constructor() {
        super();

        this.state = {timeleft: this.maxTime};
    }

    toggleTimer() {

        if (this.timerState) {
            clearTimeout(this.timerState);
            this.timerState = null;
            this.setTimeleft(this.maxTime);
            return;
        }

        this.timerState = setInterval(() => this.updateTimeleft(), this.timeout);
    }

    setTimeleft(t) {
        this.setState({
            timeleft: t
        });
    }

    updateTimeleft() {

        if (this.state.timeleft < 2) {
            this.setTimeleft(this.maxTime);

            this.callback && this.callback();
            return;
        }

        this.setTimeleft(this.state.timeleft - 1);
    }

    render({callback}) {

        this.callback = callback;

        return (
            <button onClick={() => this.toggleTimer()}>Auto {this.state.timeleft}</button>
        );
    }

}


const Updater = ({memory}) => {

    const [number, setNumber] = useState();
    const updateNumber = () => setNumber(memory.next());

    return (
        <Fragment>
            <Stats stats={memory.stats()} />
            <h1>Called <strong>{number}</strong></h1>
            <button onClick={updateNumber}>Next</button>
            <AutoUpdater callback={updateNumber} />
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