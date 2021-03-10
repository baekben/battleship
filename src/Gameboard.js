import Ship from './Ship';
function Gameboard() {
	const ships = [];
	const placeShip = (coor) => {
		const newShip = Ship(coor);
		ships.push(newShip);
		return 'ship added';
	};
	const recieveAttack = (ship, mark) => {
		ship.hit(mark);
	};
	return { placeShip, recieveAttack, ships };
}

export default Gameboard;
