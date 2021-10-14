import Ship from './Ship';
const pieces = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
const pieceLength = {
	Carrier: 5,
	Battleship: 4,
	Cruiser: 3,
	Submarine: 3,
	Destroyer: 2,
};

const randNum = (size = 10) => Math.floor(Math.random() * size);

const randCoords = (size = 10) => [randNum(size), randNum(size)];

const createFleet = (boats) => {
	const fleet = {};
	boats.forEach((boat) => (fleet[boat] = Ship(boat)));
	return fleet;
};

export { pieces, pieceLength, randCoords, createFleet };
