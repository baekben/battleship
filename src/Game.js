import Gameboard from './Gameboard';
import Player from './Player';
import { pieces } from './Pieces';

const Game = () => {
	const playerOne = Player('user');
	const playerTwo = Player('Computer');

	const playerOneBoard = Gameboard();
	const playerTwoBoard = Gameboard();

	const fleet1 = playerOne.getFleet();
	const fleet2 = playerTwo.getFleet();

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
		onScreenGrid('.p1Grid', playerOneBoard);
		onScreenGrid('.p2Grid', playerTwoBoard);
	};

	const onScreenGrid = (playerGrid, board) => {
		document.querySelector(playerGrid).innerHTML = '';
		let parent = document.querySelector(playerGrid);
		const gboard = board.getBoard();
		const length = gboard.length;
		let grid = '';
		for (let i = 0; i < length; i++) {
			for (let j = 0; j < length; j++) {
				let status = gboard[i][j];
				if (status === 0) {
					status = '';
				} else if (status.ship) {
					if (pieces.includes(status.ship.type)) {
						status = status.ship.id;
					} else {
						status = '';
					}
				}
				grid += renderCell(i, j, status);
			}
		}
		parent.insertAdjacentHTML('afterbegin', grid);
	};

	const resetGame = () => {
		playerOne.resetShips();
		playerTwo.resetShips();
		playerOneBoard.reset();
		playerTwoBoard.reset();
	};

	return { setGame, setShips, resetGame, onScreenGrid };
};

export default Game;
