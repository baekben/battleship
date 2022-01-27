import Gameboard from './Gameboard';
import Player from './Player';
import Drag from './Drag';
import GameRender from './GameRender';

const Game = (type) => {
	const playerOne = Player('user');
	let playerTwo;
	if (type === 'single') {
		playerTwo = Player('computer');
	} else {
		playerTwo = Player('user');
	}

	const playerOneBoard = Gameboard();
	const playerTwoBoard = Gameboard();

	const fleet1 = playerOne.getFleet();
	const fleet2 = playerTwo.getFleet();

	const drag = Drag(playerOne, playerOneBoard);

	let set = false;
	let p1 = document.querySelector('.p1Grid');
	let p2 = document.querySelector('.p2Grid');
	let start = document.querySelector('.start');
	let randomize = document.querySelector('.randomize');

	const setGame = () => {
		playerOneBoard.autoSetShips(fleet1);
		playerTwoBoard.autoSetShips(fleet2);
		renderGrids();
	};

	const fireAttack = (e) => {
		const area = e.target;
		if (area.classList.contains('grid-cell')) {
			const y = area.dataset.y;
			const x = area.dataset.x;

			const cell = playerTwoBoard.getBoard()[y][x];
			if (cell !== 'miss' && cell !== 'hit') {
				playerOne.attack(y, x, playerTwoBoard);
				playerTwo.autoAttack(playerOneBoard);
			}

			renderGrids();

			if (playerOneBoard.allShipsSunk() || playerTwoBoard.allShipsSunk()) {
				let winner = '';
				if (playerOneBoard.allShipsSunk()) {
					winner = 'Computer Wins';
				} else if (playerTwoBoard.allShipsSunk()) {
					winner = 'You Win';
				}
				document.querySelector('.p2Grid').removeEventListener('click', fireAttack);
				console.log(winner);
				document.querySelector('.status').classList.toggle('hide');
			}
		}
	};

	const renderGrids = () => {
		GameRender.onScreenGrid(p1, playerOneBoard, playerOne.getUser());
		GameRender.onScreenGrid(p2, playerTwoBoard, playerTwo.getUser());
	};

	const showComputerBoard = () => {
		randomize.className = 'randomize';
		p2.classList.toggle('hide');
		if (set === false) {
			setGame();
			set = true;
			start.className = 'start hide';
		}
		GameRender.setShipIndexes(fleet1);
		drag.addDragDropEventListeners();
	};

	const randomShip = () => {
		playerOneBoard.reset();
		playerOneBoard.autoSetShips(fleet1);
		renderGrids(); //render board with all pieces
	};

	const createEventListeners = () => {
		p2.addEventListener('click', fireAttack);
		start.addEventListener('click', showComputerBoard);
		randomize.addEventListener('click', randomShip);
		let playAgainBtn = document.querySelector('.playAgain');
		playAgainBtn.addEventListener('click', playAgain);
	};

	const startGame = () => {
		renderGrids(); //set empty boards

		createEventListeners();
	};

	const resetGame = () => {
		playerOne.resetShips();
		playerTwo.resetShips();
		playerOneBoard.reset();
		playerTwoBoard.reset();
		set = false;
		start.className = 'start';
		p2.classList.toggle('hide');
	};

	const playAgain = () => {
		resetGame();
		setGame();
	};

	return { setGame, resetGame, startGame, renderGrids, playAgain };
};

export default Game;
