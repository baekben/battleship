import React from 'react';
import Game from './Game';
import './App.css';

const App = () => {
	const beginGame = () => {
		console.log('Game begin');
		let type = 'single';
		let game = Game(type);
		game.startGame();
	};

	return (
		<div className="App">
			<header className="App-header">
				<p>Battleship</p>
				<button id="set" onClick={beginGame}>
					Start
				</button>
			</header>
			<div className="container">
				<div className="gameboard p1">
					<div className="p1Grid"></div>
				</div>
				<div className="gameboard p2">
					<div className="p2Grid"></div>
				</div>
			</div>
		</div>
	);
};

export default App;
