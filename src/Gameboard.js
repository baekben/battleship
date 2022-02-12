import { randCoords, pieces } from './Pieces';

//Generates the board for a player
const Gameboard = () => {
	let board = Array(10)
		.fill(0)
		.map(() => Array(10).fill(0));
	const getBoard = () => board; //grabs the board when called
	let placedShips = [];
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

	//Sets ship on to the board array
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
	//checks to see if the placement of the ship can be true
	const validCheck = (length, direction, y0, x0) => {
		const cells = [];
		for (let i = 0; i < length; i++) {
			const [y, x] = adjustCoords(y0, x0, i, direction);
			if (y < 10 && x < 10) {
				cells.push(board[y][x]);
			} else {
				//false if the coordinates are outside of the limits of the array
				return false;
			}
		}
		return cells.every((cell) => cell === 0); //0 default for empty cell
	};

	//automatically sets ship in the array of the board
	const autoPlace = (ship) => {
		const [y, x] = randCoords();
		const orient = Math.random() > 0.5;
		if (orient) ship.changeDirection();
		const place = placeShip(ship, y, x);
		if (!place) autoPlace(ship);
	};
	// Goes through each ship in the fleet of the player
	// to be placed automatically in a random location
	const autoSetShips = (fleet) => {
		for (const ship in fleet) {
			autoPlace(fleet[ship]);
		}
	};
	//When a cell is attacked the coordinates are recieved
	//through this function and 'hit' or 'miss' are
	//marked in the array
	const recieveAttack = (y, x) => {
		if (board[y][x] === 0) {
			board[y][x] = 'miss';
		} else if (board[y][x].ship) {
			board[y][x].ship.hit(board[y][x].index);
			board[y][x] = 'hit';
		}
		return board[y][x];
	};
	//checks to see if all ships have been hit and sunken
	const allShipsSunk = () => placedShips.every((ship) => ship.isSunk());

	//Clears board back to default
	const reset = () => {
		board = Array(10)
			.fill(0)
			.map(() => Array(10).fill(0));
		placedShips = [];
	};

	return {
		allShipsPlaced,
		board,
		getBoard,
		placeShip,
		autoSetShips,
		recieveAttack,
		allShipsSunk,
		placedShips,
		autoPlace,
		reset,
	};
};

export default Gameboard;
