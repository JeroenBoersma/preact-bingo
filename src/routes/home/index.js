import { h } from 'preact';

const Home = () => (
	<div>
		<h1>BINGO!</h1>
		<div>
			Play Bingo online
		</div>
		<div>
			<ul>
				<li><a href="/card">Open random card</a></li>
				<li><hr />Organiser</li>
				<li>
					<ul>
						<li><a href="/organiser">Board with your own balls</a></li>
						<li><a href="/organiser/balls">Board with digital balls</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
);

export default Home;
