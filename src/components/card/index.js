
import {h} from 'preact';
import Field from './field';

const Card = (props) => {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>B</th>
                        <th>I</th>
                        <th>N</th>
                        <th>G</th>
                        <th>O</th>
                    </tr>
                </thead>
                <tbody>
                    {props.card.pretify().map(row =>
                    <tr>
                        {row.map(number => <td><Field number={number} /></td>)}
                    </tr>)}
                </tbody>
            </table>
            {props.showCardLink ?
            <div>
                {/* <a href={`/card/${props.card.toString()}`}> */}
                    {props.card.toString()}
                {/* </a> */}
            </div> : ""}
        </div>
    );
}

export default Card;