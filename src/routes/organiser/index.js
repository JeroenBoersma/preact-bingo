import {h} from 'preact';
import Card from '../../components/card';
import UniqueGenerator from '../../lib/board';
import UpNext from '../../components/upnext';
import ScoreCard from '../../components/scorecard';

const OrganiserRoute = ({balls}) => {

    const card = UniqueGenerator.organiser();

    return (
        <div>
            <h1>Organiser Card</h1>
            <div className="flex">
                <Card card={card} />
                {balls ? [<UpNext card={card} />] : '' }
                <ScoreCard card={card} />
            </div>
            {/* <a href={"/organiser"}>New Round</a> */}
            <a href={"/"}>Home</a>
        </div>
        )
};

export default OrganiserRoute;