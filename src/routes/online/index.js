import { generate } from "project-name-generator";
import { route } from "preact-router";
import { useState } from "preact/hooks";

import peer from '../../lib/webrtc';

const OnlineHostRoute = ({game}) => {

    const [isHost, setIsHost] = useState(false);

    if (! game) {
        game = generate().dashed;
        route(`/online/${game}`);
        return;
    }

    const shareUrl = window.location.toString();

    return (
        <div>
            <h1>Host a game online!</h1>
            <p>Share this link <strong><a href={shareUrl}>{shareUrl}</a></strong> with your friend</p>
            <a href={"/online"}>Generate new game</a>

            <button disabled={isHost} onClick={() => setIsHost(() => true)}>I'll host this game</button>
        </div>
    );
};

export default OnlineHostRoute;