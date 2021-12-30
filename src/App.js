import React from 'react';
import Game from './Game';
import './App.css';

const App = () => {
	window.onload = function () {
		if (document.readyState === 'complete') {
			beginGame();
		}
	};

	const beginGame = () => {
		console.log('load'); // only shows player board
		let type = 'single';
		let game = Game(type);
		game.startGame();
	};

	return (
		<div className="App">
			<header className="App-header">
				<p>Battleship</p>
				<button className="start">Start</button>
				<button className="randomize hide">Randomize</button>
			</header>
			<div className="container">
				<div className="gameboard p1">
					<div className="p1Grid"></div>
				</div>
				<div className="gameboard p2">
					<div className="p2Grid hide"></div>
				</div>
			</div>
		</div>
	);
};

export default App;
