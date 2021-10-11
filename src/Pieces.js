//ships
export const pieces = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
export const pieceLength = {
	Carrier: 5,
	Battleship: 4,
	Cruiser: 3,
	Submarine: 3,
	Destroyer: 2,
};

const randNum = (size = 10) => Math.floor(Math.random() * size);

export const randCoords = (size = 10) => [randNum(size), randNum(size)];
