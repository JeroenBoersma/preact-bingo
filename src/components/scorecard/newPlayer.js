import { useState, useRef } from "preact/hooks";
import UniqueGenerator from "../../lib/board";
import { generate } from 'project-name-generator';

const NewPlayer = ({addPlayer}) => {

    const [name, setName] = useState(generate().spaced);
    const inputRef = useRef();

    const submit = (e) => {
        e.preventDefault();

        if ("" === name) {
            return;
        }

        addPlayer({name, card: UniqueGenerator.randomize()})
        setName(generate().spaced);

        inputRef.current.focus();
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input ref={inputRef} value={name} onFocus={(e) => e.target.select()} onInput={(f) => setName(f.target.value)} placeholder="Name" />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default NewPlayer;