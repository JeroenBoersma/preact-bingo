import { useState, useEffect } from 'preact/hooks';

const AutoUpdater = ({ callback }) => {

    const maxTime = 4, timeout = 1000;
    const [timeleft, setTimeleft] = useState(maxTime);
    const [timerState, setTimerState] = useState(null);

    const toggleTimer = () => {
        if (timerState) {
            clearTimeout(timerState);
            setTimerState(null);

            return;
        }

        setTimeleft(maxTime);
        setTimerState(setInterval(() => updateTimeleft(), timeout));
    }

    const updateTimeleft = () => {
        setTimeleft(timeleft => {

            if (timeleft < 2) {
                callback && callback();
                return maxTime;
            }

            return timeleft -1;
        });
        return;
    }

    return (<button onClick={toggleTimer}>Auto {timeleft}</button>);
}

export default AutoUpdater;