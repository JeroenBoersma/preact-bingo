import {h} from 'preact';
import { Updater } from './updater';

const UpNext = ({card}) => {

    const memory = card.game();

    return (
        <div class="game-stats">
            <Updater memory={memory} />
        </div>
    );
}

export default UpNext;