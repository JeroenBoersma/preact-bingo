import { Fragment } from 'preact';

export const Stats = ({ stats }) => (<Fragment>
    <div class="bar bar-sm">
        <div class="bar-item" role="progressbar" style={`width: ${stats.done}%;`} aria-valuenow={stats.done} aria-valuemin="0" aria-valuemax="100" />
    </div>
</Fragment>);
