import Gameboard from './Gameboard';
import Player from './Player';

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

	let set = false;
	let p1 = document.querySelector('.p1Grid');
	let p2 = document.querySelector('.p2Grid');
	let start = document.querySelector('.start');
	let randomize = document.querySelector('.randomize');

	const setShips = (board, fleet) => {
		for (const ship in fleet) {
			board.autoPlace(fleet[ship]);
		}
	};

	const renderCell = (y, x, status) =>
		`<div class="grid-cell cell-${y}=${x} ${status}" data-y='${y}' data-x='${x}'></div>`;

	const setGame = () => {
		setShips(playerOneBoard, fleet1);
		setShips(playerTwoBoard, fleet2);
		renderGrids();
	};

	const updateBoard = (parent) => {
		parent.textContent = '';
	};

	const onScreenGrid = (playerGrid, board, type) => {
		updateBoard(playerGrid);
		const gboard = board.getBoard();
		const length = gboard.length;
		let grid = '';
		for (let i = 0; i < length; i++) {
			for (let j = 0; j < length; j++) {
				let status = gboard[i][j];
				if (status === 0) {
					status = '';
				} else if (status.ship) {
					if (type === 'user') {
						status = status.ship.id;
					} else {
						status = '';
					}
				}
				grid += renderCell(i, j, status);
			}
		}
		playerGrid.insertAdjacentHTML('afterbegin', grid);
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
			}
		}
	};

	const renderGrids = () => {
		onScreenGrid(p1, playerOneBoard, playerOne.getUser());
		onScreenGrid(p2, playerTwoBoard, playerTwo.getUser());
	};

	const showComputerBoard = () => {
		randomize.className = 'randomize';
		p2.classList.toggle('hide');
		if (set === false) {
			setGame();
			set = true;
			start.className = 'start hide';
		}
	};

	const randomShip = () => {
		playerOneBoard.reset();
		setShips(playerOneBoard, fleet1);
		renderGrids();
	};

	const createEventListeners = () => {
		p2.addEventListener('click', fireAttack);
		start.addEventListener('click', showComputerBoard);
		randomize.addEventListener('click', randomShip);
	};

	const startGame = () => {
		renderGrids();
		createEventListeners();
	};

	const resetGame = () => {
		playerOne.resetShips();
		playerTwo.resetShips();
		playerOneBoard.reset();
		playerTwoBoard.reset();
		set = false;
	};

	return { setGame, setShips, resetGame, startGame, onScreenGrid };
};

export default Game;
