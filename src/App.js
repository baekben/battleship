import React from 'react';
import Game from './Game';
import './App.css';

const App = () => {
	const clickHandle = () => {
		Game().resetGame();
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
