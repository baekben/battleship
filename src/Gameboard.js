import Ship from './Ship';
function Gameboard() {
	const ships = [];
	const board = [];
	const setBoard = () => {
		if (board.length === 0) {
			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 10; j++) {
					board.push({
						pt: { x: i, y: j },
						type: null,
						atk: false,
						status: null,
					});
				}
			}
		}
	};
	const placeShip = (type, coords) => {
		const newShip = Ship(type, coords);
		ships.push(newShip);
		newShip.coords.map((coord) => {
			let x = coord.pt.x;
			let y = coord.pt.y;
			let tempCoord = board.findIndex((coord) => coord.pt.x === x && coord.pt.y === y);
			board[tempCoord].type = newShip.type;
			return coord;
		});
		return 'ship added';
	};
	const recieveAttack = (x, y) => {
		let attack = '';
		board.forEach((coord) => {
			if (coord.pt.x === x && coord.pt.y === y) {
				coord.atk = true;
				if (coord.type === null) {
					attack = coord.status = 'miss';
				} else {
					attack = coord.status = 'hit';
					ships.forEach((ship) => {
						if (ship.type === coord.type) {
							ship.hit(x, y);
							if (ship.isSunk()) {
								attack = coord.status = 'sunk';
							}
						}
					});
				}
			}
		});
		return attack;
	};
	return { board, setBoard, placeShip, recieveAttack, ships };
}

export default Gameboard;
