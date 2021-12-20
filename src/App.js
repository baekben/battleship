import React from 'react';
import Game from './Game';
import './App.css';

const App = () => {
	const clickHandle = () => {
		console.log('Game begin');
		let type = 'single';
		let game = Game(type);
		game.startGame();
	};

	return (
		<div className="App">
			<header className="App-header">
				<p>Hello</p>
				<button id="set" onClick={clickHandle}>
					Start
				</button>
				<div className="container">
					<div className="gameboard p1">
						<div className="p1Grid"></div>
					</div>
					<div className="gameboard p2">
						<div className="p2Grid"></div>
					</div>
				</div>
			</header>
		</div>
	);
};

export default App;
