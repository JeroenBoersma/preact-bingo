import { h } from 'preact';

const Home = () => (
	<div>
		<h1>BINGO!</h1>
		<div>
			Play Bingo online
		</div>
		<ul class="list-none m-5">
			<li><a href="/card">Open random card</a></li>

			<li data-content="Organiser" />
			<li><a href="/organiser">Board with your own balls</a></li>
			<li><a href="/organiser/balls">Board with digital balls</a></li>
		</ul>
	</div>
);

export default Home;
