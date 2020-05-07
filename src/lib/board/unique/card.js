//import {UniqueGenerator} from '../index.js'

import Field, { EmptyField } from "./field";

export default class UniqueCard {

    data;
    generator;

    #pretty;
    #fields;
    #fieldsIndex;

    /**
     *
     * @param {Array} data
     * @param {UniqueGenerator} generator
     */
    constructor(data, generator) {
        this.data = data;
        this.generator = generator;
    }

    init() {
        if (undefined !== this.#pretty) {
            return;
        }

        this.#pretty = new Array(this.data[0].length).fill(new Array(this.data.length).fill(-1))
                .map(r => r.map(() => -1));
        this.#fields = [];
        this.#fieldsIndex = [];

        new Array(this.data.length)
            .fill(new Array(this.data[0].length).fill(0))
            .map((column, columnIndex) => column.map((filler, rowIndex) => {
                const indexed = this.data[columnIndex][rowIndex];
                const field = -1 === indexed ? new EmptyField(this.generator.emptyField) : new Field(
                    this.generator.numbers[indexed + columnIndex * this.generator.maxPerRow],
                    indexed + columnIndex * this.generator.maxPerRow,
                    indexed
                );

                this.#pretty[rowIndex][columnIndex] = field;

                if (-1 !== field.index) {
                    this.#fields.push(field);
                    this.#fieldsIndex.push(+field.index);
                }

                return field;
            }
        ));
    }

    matching(otherCard) {
        const indexA = this.#fields.filter(f => f.isCalled).map(f => f.index);
        return [
            indexA,
            otherCard.fields.map(f => f.index).filter(f => indexA.indexOf(f) > -1)
        ];
    }

    contains(otherCard) {
        const [, indexB] = this.matching(otherCard);
        return indexB;
    }

    done(otherCard) {
        return this.contains(otherCard).length / otherCard.fields.length;
    }

    field(index) {
        const fieldIndex = this.#fieldsIndex.indexOf(+index);
        if (fieldIndex < 0) {
            throw Error('Field not found');
        }

        return this.#fields[fieldIndex];
    }

    get fields() {
        return this.#fields;
    }

    get indexes() {
        return this.#fieldsIndex;
    }

    reset() {
        this.fields.map(f => f.called(false));
    }

    pretify() {
        this.init();
        return this.#pretty;
    }

    toString() {
        this.init();
        return this.#fields.map(f => f.relativeIndex.toString(16)).join('');
    }

    fromString = (string) => {
        // todo implement something to optimize bits
        string = string.split('');
        return new UniqueCard(new Array(this.generator.columns)
            .fill(new Array(this.generator.rows).fill(-1))
            .map((column, columnIndex) => column.map((field, fieldIndex) => {
                if (this.generator.exclude[columnIndex] && true === this.generator.exclude[columnIndex][fieldIndex]) {
                    return -1;
                }
                return parseInt(string.shift(), 16);
            }))
            .map(v => v > this.generator.maxPerRow ? this.generator.maxPerRow : v)
        , this.generator);
    }

}
