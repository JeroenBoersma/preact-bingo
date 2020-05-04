import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';

const Field = ({number}) => {

    const [checked, setChecked] = useState(number.isCalled);
    const changeChecked = () => number.called(!number.isCalled);

    // Overwite function to monitor behavior
    number.called = ((origCalled) => (called) => {origCalled(called); setChecked(number.isCalled);})(number.called)

    useEffect(() => {
        setChecked(number.isCalled);
    }, [number]);

    return (
        <div onClick={changeChecked} className={`bingo-card-field ${checked ? 'bg-success' : ''}`}>
            {number.number}
        </div>
    );
}


export default Field;