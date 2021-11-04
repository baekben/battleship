import React from 'react';
import Game from './Game';

const App = () => {
	const clickHandle = () => {
		console.log('clicked');
		Game();
		Game().setGame();
	};

	return (
		<div className="App">
			<header className="App-header">
				<p>Hello</p>
				<button id="set" onClick={clickHandle}>
					Set Board
				</button>
			</header>
		</div>
	);
};

export default App;
