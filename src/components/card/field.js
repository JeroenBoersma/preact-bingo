import {useState, useEffect} from 'preact/hooks';

const Field = ({number}) => {

    const colors = [""];
    const [checked, setChecked] = useState(number.isCalled);
    const changeChecked = () => number.called(!number.isCalled);

    // Overwite function to monitor behavior
    number.called = (origCalled => called => {origCalled(called); setChecked(number.isCalled);})(number.called);

    useEffect(() => {
        setChecked(number.isCalled);
    }, [number, number.called]);

    return (
        <div onClick={changeChecked} className={`${colors[Math.floor(Math.random() * colors.length)]} ${checked ? 'active' : ''}`}>
            {number.visual}
        </div>
    );
}


export default Field;