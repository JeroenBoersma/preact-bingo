import {Fragment} from 'preact';

const History = ({history}) => (
    <Fragment>
        <h2>Latest</h2>
        <ol class="history">
            {history.map(record => <li>{record}</li>)}
        </ol>
    </Fragment>
);

export default History;
