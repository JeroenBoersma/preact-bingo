import { useState, useEffect } from 'preact/hooks';
import { Stats } from './stats';
import AutoUpdater from './autoUpdater';
import History from './history';
import { render } from 'preact';


const PopUpLastNumber = ({game}) => {

    const [number, setNumber] = useState();

    const fancyNumber = (index) => {
        setNumber(game.generator.numbers[index]);
    };

    const resetNumber = () => {
        setNumber('-');
    };

    useEffect(() => {
        game.subscribe('reset', resetNumber);
        game.subscribe('next', fancyNumber);
        return () => {
            game.unsubscribe('reset', resetNumber);
            game.unsubscribe('next', fancyNumber);
        }
    });

    return (
        <h1 style="text-align: center;">
            {number}
        </h1>
    );
};

let newwin;

const UpNext = ({card}) => {

    const game = card.game();

    const [number, setNumber] = useState();

    const updateNumber = () => setNumber(game.next());
    const newGame = () => {
        game.reset();
        setNumber();
    }

    const popup = () => {
        if (newwin && newwin.closed === false) {
            console.log('test');
            return;
        }

        newwin = window.open('about:blank', 'lastnumber', 'location=false,width=100,height=100', true);
        newwin.document.write('<div id="app"></div>');
        render(<PopUpLastNumber game={game} />, newwin.document.getElementById('app'));
    };

    return (
        <div>
            <Stats stats={game.stats()} />
            <h1 onClick={popup}>Called <strong>{number}</strong></h1>
            <button onClick={updateNumber}>Next</button>
            <button onClick={newGame}>New game</button>
            <AutoUpdater callback={updateNumber} />
            <History history={game.history} />
        </div>
    );
}

export default UpNext;