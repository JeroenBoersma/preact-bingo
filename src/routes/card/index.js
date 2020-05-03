import {h} from 'preact';
import Card from '../../components/card';

import UniqueGenerator from '../../lib/board';

const CardRoute = ({code}) => {

    const cards = new Array();

    if (code) {
        cards.push(UniqueGenerator.initializeCard(code));
    } else {
        cards.push(UniqueGenerator.randomize());
    }

    return (
        <div>
            <h1>Player Card</h1>
            {cards.map(card => <Card card={card} showCardLink={true} />)}
            {/* <a href={"/card"}>New card</a> */}
            <a href={"/"}>Home</a>
        </div>
        )
};

export default CardRoute;