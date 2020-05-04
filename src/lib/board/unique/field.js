
export default class Field {

    number;
    index;

    #called = false;

    constructor(number, index = -1) {
        this.number = number;
        this.index = index;
    }

    called = (state = true) => {
        this.#called = !!state;
    }
    get isCalled() {
        return this.#called;
    }
}

export class EmptyField extends Field {

    called = () => false;
    get isCalled() {
        return false;
    }
}
