export default class Stats {

    game;

    /**
     *
     * @param {Game} game
     */
    constructor(game) {
        this.game = game;
    }

    get progress() {
        return this.game.progress;
    }

    get remaining() {
        return this.game.total - this.game.progress;
    }

    get todo() {
        return Math.round((1 - this.game.progress / this.game.total) * 1000) / 10;
    }

    get total() {
        return this.game.total;
    }

    get done() {
        return Math.round(this.game.progress / this.game.total * 1000) / 10;
    }
}