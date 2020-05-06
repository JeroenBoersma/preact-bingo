import { useState } from 'preact/hooks';

const AutoUpdater = ({ callback }) => {

    const maxTime = 4, timeout = 1000;
    const [timeleft, setTimeleft] = useState(maxTime);

    let timerState;

    const toggleTimer = () => {
        if (timerState) {
            clearTimeout(timerState);

            timerState = null;
            return;
        }

        timerState = setInterval(() => updateTimeleft(), timeout);
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