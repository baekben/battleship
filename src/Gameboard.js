import React, { useState } from 'react';
import Ship from './Ship';
function Gameboard() {
	const [ships, setShips] = useState([]);
	const placeShip = (coor) => {
		const ship = Ship(coor);
		setShips((current) => {
			return [...current, ship];
		});
	};
	const recieveAttack = (ship, mark) => {
		ship.hit(mark);
		setShips([...ships]);
	};
	return { placeShip, recieveAttack, ships };
}

export default Gameboard;
