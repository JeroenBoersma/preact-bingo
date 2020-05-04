//import {UniqueGenerator} from '../index.js'

import Field, { EmptyField } from "./field";

export default class UniqueCard {

    data;
    generator;

    /**
     *
     * @param {Array} data
     * @param {UniqueGenerator} generator
     */
    constructor(data, generator) {
        this.data = data;
        this.generator = generator;
    }

    pretify() {
        return new Array(this.data[0].length)
        .fill(new Array(this.data.length).fill(0))
        .map((row, rowIndex) => row.map((field, columnIndex) =>
            -1 === this.data[columnIndex][rowIndex] ? new EmptyField(this.generator.emptyField) : new Field(
                this.generator.numbers[this.data[columnIndex][rowIndex] + columnIndex * this.generator.maxPerRow],
                this.data[columnIndex][rowIndex] + columnIndex * this.generator.maxPerRow
            )
        ))
    }

    toString = () => this.data.reduce((bArray, column) => column.reduce((bArray, field) => {
        bArray.push(field > -1 ? field.toString(16) : '');
        return bArray;
    }, bArray), []).join('');

    fromString = (string) => {
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
