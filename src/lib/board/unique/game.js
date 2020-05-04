import Stats from './stats';

class Game {

    card;
    generator;

    #game = [];

    history = [];
    progress = 0;
    total = 0;

    /**
     *
     * @param {Card} card
     */
    constructor(card) {
        this.card = card;
        this.generator = card.generator;

        this.#generate();
    }

    #generate = () => {

        let numbers = Object.keys(this.generator.numbers);

        for (let a = numbers.length - 1; a >= 0; a--) {
            const rnd = Math.round(Math.random() * a);

            this.#game.push(numbers[rnd]);

            numbers = [...numbers.slice(0, rnd), ...numbers.slice(rnd + 1)];
        }

        this.total = this.#game.length;
    }

    updatePretty(index) {
        this.card.field(index).called();
    }

    next() {

        if (this.progress >= this.total) {
            return '';
        }

        const n = this.#game.shift();

        this.history.unshift(this.generator.numbers[n]);
        this.progress++;

        this.updatePretty(n);

        return this.generator.numbers[n];
    }

    stats = () => new Stats(this);
}

export default Game;
