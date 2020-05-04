import { useState, useRef } from "preact/hooks";
import UniqueGenerator from "../../lib/board";

const NewPlayer = ({addPlayer}) => {

    const [name, setName] = useState("");
    const inputRef = useRef();

    const submit = (e) => {
        e.preventDefault();

        if ("" === name) {
            return;
        }

        addPlayer({name, card: UniqueGenerator.randomize()})
        setName("");

        inputRef.current.focus();
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input ref={inputRef} value={name} onInput={(f) => setName(f.target.value)} placeholder="Name" />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default NewPlayer;