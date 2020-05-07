import { useState, useRef, useEffect } from "preact/hooks";
import UniqueGenerator from "../../lib/board";
import { generate } from 'project-name-generator';

const NewPlayer = ({addPlayer}) => {

    const [name, setName] = useState(generate().spaced);
    const [randomCard, setRandomCard] = useState(UniqueGenerator.randomize());
    const [focussed, setFocussed] = useState(0);

    const inputRef = useRef();

    const submit = (e) => {
        e.preventDefault();

        if ("" === name) {
            return;
        }

        addPlayer({name, card: randomCard});

        setFocussed(() => 2);
        setName(() => generate().spaced);
        setRandomCard(() => UniqueGenerator.randomize());
    }

    const hasFocus = (focussed) => {
        setFocussed(() => 1);
        focussed && inputRef.current.select();
    };

    useEffect(() => {
        if (2 !== focussed) {
            return;
        }
        setFocussed(() => 1);

        inputRef.current.focus();
        inputRef.current.select();
    }, [focussed, name]);

    return (
        <div>
            <form onSubmit={submit}>
                <label>
                    Name
                    <input ref={inputRef} value={name} onFocus={() => hasFocus(true)} onInput={(f) => setName(f.target.value)} placeholder="Name" />
                </label>
                <button type="submit">Add</button>
                <br />
                <label>
                    Card ID *
                    <input value={randomCard} onFocus={(e) => e.target.select()} onInput={(f) => setRandomCard(f.target.value)} placeholder="Card ID" />
                </label>
            </form>
        </div>
    );
}

export default NewPlayer;