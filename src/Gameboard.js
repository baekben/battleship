import { randCoords, pieces } from './Pieces';
const Gameboard = () => {
	let board = Array(10)
		.fill(0)
		.map(() => Array(10).fill(0));
	const getBoard = () => board;
	const placedShips = [];
	const allShipsPlaced = () => placedShips.length === pieces.length;

	const adjustCoords = (y0, x0, i, direction) => {
		//boat/ship is horizontal
		let x = x0 + i;
		let y = y0;
		if (direction === 'vertical') {
			x = x0;
			y = y0 + i;
		}
		return [y, x];
	};

	const placeShip = (ship, y0, x0) => {
		const direction = ship.getDirection();
		const valid = validCheck(ship.length, direction, y0, x0);
		if (valid) {
			for (let i = 0; i < ship.length; i++) {
				const [y, x] = adjustCoords(y0, x0, i, direction);
				board[y][x] = { ship, index: i };
			}
			placedShips.push(ship);
			return valid;
		} else {
			return valid;
		}
	};

	const validCheck = (length, direction, y0, x0) => {
		const cells = [];
		for (let i = 0; i < length; i++) {
			const [y, x] = adjustCoords(y0, x0, i, direction);
			if (y < 10 && x < 10) {
				cells.push(board[y][x]);
			} else {
				return false;
			}
		}
		return cells.every((cell) => cell === 0);
	};

	const autoPlace = (ship) => {
		const [y, x] = randCoords();
		const orient = Math.random() > 0.5;
		if (orient) ship.changeDirection();
		const place = placeShip(ship, y, x);
		if (!place) autoPlace(ship);
	};

	const recieveAttack = (y, x) => {
		if (board[y][x] === 0) {
			board[y][x] = 'miss';
		} else if (board[y][x].ship) {
			board[y][x].ship.hit(board[y][x].index);
			board[y][x] = 'hit';
		}
		return board[y][x];
	};

	const allShipsSunk = () => placedShips.every((ship) => ship.isSunk());

	return {
		allShipsPlaced,
		board,
		getBoard,
		placeShip,
		recieveAttack,
		allShipsSunk,
		placedShips,
		autoPlace,
	};
};

export default Gameboard;
