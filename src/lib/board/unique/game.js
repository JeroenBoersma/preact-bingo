import Stats from './stats';

class Game {

    card;
    generator;

    #game = [];

    history = [];
    progress = 0;
    total = 0;

    subscribers = {};

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

    trigger(eventName, ...value) {
        if (undefined === this.subscribers[eventName]) {
            return;
        }
        this.subscribers[eventName].reduce((value, fn) => fn(...value), value);
    }

    subscribe(eventName, callback) {
        this.subscribers[eventName] = this.subscribers[eventName] || [];
        this.subscribers[eventName].push(callback);
    }

    unsubscribe(eventName, callback) {
        if (undefined === this.subscribers[eventName]) {
            return;
        }
        this.subscribers[eventName] = this.subscribers[eventName].filter(fn => fn !== callback);
    }

    next() {

        if (this.progress >= this.total) {
            return '';
        }

        const n = this.#game.shift();

        this.history.unshift(this.generator.numbers[n]);
        this.progress++;

        this.updatePretty(n);

        this.trigger('next', n);

        return this.generator.numbers[n];
    }

    reset() {
        this.#game = [];
        this.history = [];

        this.progress = 0;

        this.#generate();

        this.card.reset();

        this.trigger("reset", null);
    }

    stats = () => new Stats(this);
}

export default Game;
