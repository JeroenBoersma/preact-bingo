import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';

const Field = (props) => {

    const [checked, setChecked] = useState(!!props.checked || props.number.isCalled);
    const changeChecked = () => setChecked(!checked || props.number.isCalled);

    // Overwite function to monitor behavior
    props.number.called = ((origCalled) => () => {origCalled(); setChecked(true);})(props.number.called)

    useEffect(() => {
        setChecked(props.number.isCalled);
    }, [props.number, props.checked, props.number.isCalled]);

    return (
        <div onClick={changeChecked} className={`bingo-card-field ${checked ? 'bg-success' : ''}`}>
            {props.number.number}
        </div>
    );
}


export default Field;