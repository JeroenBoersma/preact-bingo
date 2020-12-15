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
export default new UniqueGenerator(
    [
        1,
        2,
        3,
        'Hari',
        5,
        6,
        'Sibbel',
        8,
        9,
        10,
        'Geertje',
        12,
        13,
        14,
        15,
        16,
        'Richard',
        18,
        19,
        20,
        21,
        'Veronique',
        23,
        24,
        25,
        26,
        27,
        'Arno',
        29,
        30,
        31,
        32,
        'Corine',
        34,
        35,
        36,
        37,
        38,
        'Ton',
        40,
        41,
        'Dieuwertje',
        43,
        44,
        45,
        'Carla',
        47,
        48,
        49,
        50,
        'Tor-Ivar',
        52,
        53,
        54,
        55,
        56,
        'Sander',
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        'Gert-Jean',
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        'Eszter',
        74,
        75
      ]
);
