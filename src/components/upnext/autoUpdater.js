import { Component } from 'preact';

export class AutoUpdater extends Component {
    timerState;
    callback;
    maxTime = 4;
    timeout = 1000;
    constructor() {
        super();
        this.state = { timeleft: this.maxTime };
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
    render({ callback }) {
        this.callback = callback;
        return (<button onClick={() => this.toggleTimer()}>Auto {this.state.timeleft}</button>);
    }
}
