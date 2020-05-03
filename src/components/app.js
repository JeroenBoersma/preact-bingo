import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import Home from '../routes/home';
import CardRoute from '../routes/card';
import OrganiserRoute from '../routes/organiser';


export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<CardRoute path="/card" />
					<CardRoute path="/card/:code" />
					<OrganiserRoute path="/organiser" balls={false} />
					<OrganiserRoute path="/organiser/balls" balls={true} />
				</Router>
			</div>
		);
	}
}
