
export default class Field {

    visual;
    index;

    relativeIndex;

    #called = false;

    constructor(visual, index = -1, relativeIndex = -1) {
        this.visual = visual;
        this.index = index;

        this.relativeIndex = relativeIndex;
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
