import {h} from 'preact';
import Card from '../../components/card';
import UniqueGenerator from '../../lib/board';
import UpNext from '../../components/upnext';

const OrganiserRoute = ({balls}) => {

    const cards = [UniqueGenerator.organiser()];

    return (
        <div>
            <h1>Organiser</h1>
            {cards.map(card => <div><Card card={card} />{balls ? <UpNext card={card} /> : '' }</div>)}
            {/* <a href={"/organiser"}>New Round</a> */}
            <a href={"/"}>Home</a>
        </div>
        )
};

export default OrganiserRoute;