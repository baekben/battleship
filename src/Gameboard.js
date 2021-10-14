import { pieces } from './Pieces';
function Gameboard() {
	let board = Array(10)
		.fill(null)
		.map(() => Array(10).fill(null));
	const getBoard = () => board;
	// const setBoard = () => {
	// 	if (board.length === 0) {
	// 		for (let i = 0; i < 10; i++) {
	// 			for (let j = 0; j < 10; j++) {
	// 				board.push({
	// 					pt: { x: i, y: j },
	// 					type: null,
	// 					atk: false,
	// 					status: null,
	// 				});
	// 			}
	// 		}
	// 	}
	// };
	const ships = [];
	const allShipsPlaced = () => ships.length === pieces.length;

	const adjustCoords = (y0, x0, i, direction) => {
		//boat/ship is horizontal
		let x = x0 + i;
		let y = y0;
		if (direction === 'vertical') {
			x = x0;
			y = y0 + i;
		}
		return [x, y];
	};

	const placeShip = (ship, y0, x0) => {
		const direction = ship.getDirection();
		const valid = validCheck(ship.length, direction, y0, x0);
		if (valid) {
			for (let i = 0; i < ship.length; i++) {
				const [y, x] = adjustCoords(y0, x0, i, direction);
				board[y][x] = { ship, index: i };
			}
			ships.push(ship);
			return valid;
		} else {
			return valid;
		}
	};

	const validCheck = (length, direction, y0, x0) => {
		const cells = [];
		for (let i = 0; i < length; i++) {
			const [y, x] = adjustCoords(y0, x0, i, direction);
			if (x < 10 && x < 10) {
				cells.push(board[y][x]);
			} else {
				return false;
			}
		}
		return cells.every((cell) => cell === null);
	};
	const recieveAttack = (y, x) => {
		if (board[y][x] === null) {
			board[y][x] = 'miss';
		} else if (board[y][x].ship) {
			board[y][x].ship.hit(board[y][x].index);
			board[y][x] = 'hit';
		}
		return board[y][x];
	};
	return { allShipsPlaced, board, getBoard, placeShip, recieveAttack, ships };
}

export default Gameboard;
