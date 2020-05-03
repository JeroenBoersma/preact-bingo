import * as CONSTANTS from './constants';
import UniqueCard from './unique/card';
import OrganizerCard from './unique/organiser';

export class UniqueGenerator
{
    numbers;
    columns;
    rows;

    exclude;
    emptyField;

    maxPerRow;

    constructor(
        numbers = CONSTANTS.NUMBERS,

        columns = CONSTANTS.COLUMNS,
        rows = CONSTANTS.ROWS,

        exclude = CONSTANTS.EXCLUDE,
        emptyField = CONSTANTS.EMTPYFIELD
    ) {
        this.numbers = numbers;

        this.columns = columns;
        this.rows = rows;

        this.exclude = exclude;
        this.emptyField = emptyField;

        this.maxPerRow = Math.floor(numbers.length / columns);
    }

    randomize = () => new UniqueCard(new Array(this.columns)
        .fill(new Array(this.rows).fill(0))
        .map((column, columnIndex) => column.reduce((randomized, field, fieldIndex) => {
            let t = -1, rounds = 10000;

            if ( !(this.exclude[columnIndex] && true === this.exclude[columnIndex][fieldIndex])) {
                while ((t = Math.floor(Math.random() * (this.maxPerRow - fieldIndex))) > -1 && --rounds > 0 && randomized.indexOf(t) > -1);
            }

            randomized.push(t);
            return randomized;
        }, [])), this)

    organiser = () => new OrganizerCard(new Array(this.columns)
        .fill(new Array(this.maxPerRow).fill(0))
        .map(column => column.map((field, fieldIndex) => fieldIndex))
        , this);

    initializeCard = (string) => new UniqueCard([], this).fromString(string)
}

// Export default initialized
export default new UniqueGenerator;
