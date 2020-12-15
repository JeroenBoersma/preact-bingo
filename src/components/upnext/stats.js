import { Fragment } from 'preact';

export const Stats = ({ stats }) => (<Fragment>
    <div className="w-full">
        <div className="shadow w-full bg-gray-100">
            <div class="bg-gray-500 text-xs leading-none py-1 text-center text-white" style={`width: ${stats.done}%;`}>{stats.done}%</div>
        </div>
    </div>
</Fragment>);
