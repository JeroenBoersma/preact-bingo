import UniqueCard from './card';
import Game from './game';

export default class OrganizerCard extends UniqueCard {

    #game;

    constructor(data, generator) {
        super(data, generator);

        this.#game = new Game(this);
    }

    pretify() {

        const pretty = super.pretify();

        this.#game.linkPretty(pretty);

        return pretty;
    }

    game = () => this.#game;
}
