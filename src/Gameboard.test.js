import Gameboard from './Gameboard';
import Ship from './Ship';
// import Player from './Player';

describe('Create board', () => {
	const gboard = Gameboard();
	test('empty board', () => {
		const current = gboard.getBoard().every((spot) => spot === null);
		expect(current).toBe(false);
	});
});

describe('Add Ship to Board horizontally', () => {
	const gboard = Gameboard();
	const ship = Ship('Cruiser');
	gboard.placeShip(ship, 0, 0);

	test('ship placed at index: 0', () => {
		const spot = gboard.board[0][0];
		expect(spot).toEqual({ ship, index: 0 });
		// expect(gboard.board[0]).toEqual({
		// 	pt: { x: 0, y: 0 },
		// 	type: 3,
		// 	atk: false,
		// 	status: null,
		// });
	});
	test('ship placed at index: 1', () => {
		const spot = gboard.board[1][0];
		expect(spot).toEqual({ ship, index: 1 });
	});
	test('ship placed at index: 2', () => {
		const spot = gboard.board[2][0];
		expect(spot).toEqual({ ship, index: 2 });
	});
});

// test('Ship recieves an attack', () => {
// 	gboard.placeShip(3, [
// 		{ pt: { x: 0, y: 0 }, isHit: false },
// 		{ pt: { x: 0, y: 1 }, isHit: false },
// 		{ pt: { x: 0, y: 2 }, isHit: false },
// 	]);
// 	gboard.recieveAttack(0, 0);
// 	expect(gboard.board[0].atk).toBe(true);
// });

// test('Board is attacked but ship is not hit', () => {
// 	gboard.setBoard();
// 	gboard.placeShip(4, [
// 		{ pt: { x: 0, y: 0 }, isHit: false },
// 		{ pt: { x: 0, y: 1 }, isHit: false },
// 		{ pt: { x: 0, y: 2 }, isHit: false },
// 		{ pt: { x: 0, y: 3 }, isHit: false },
// 	]);
// 	gboard.recieveAttack(5, 6);
// 	expect(gboard.board[56].atk).toBe(true);
// 	expect(gboard.board[56].status).toBe('miss');
// });

// test('Notify all ships have sunk', () => {
// 	gboard.setBoard();
// 	gboard.placeShip(2, [
// 		{ pt: { x: 1, y: 1 }, isHit: false },
// 		{ pt: { x: 1, y: 2 }, isHit: false },
// 	]);
// 	gboard.placeShip(3, [
// 		{ pt: { x: 3, y: 4 }, isHit: false },
// 		{ pt: { x: 4, y: 4 }, isHit: false },
// 		{ pt: { x: 5, y: 4 }, isHit: false },
// 	]);

// 	gboard.recieveAttack(1, 1);
// 	gboard.recieveAttack(1, 2);
// 	gboard.recieveAttack(3, 4);
// 	gboard.recieveAttack(4, 4);
// 	gboard.recieveAttack(5, 4);

// 	expect(gboard.board[11].atk).toBe(true);
// 	expect(gboard.board[12].atk).toBe(true);
// 	expect(gboard.board[34].atk).toBe(true);
// 	expect(gboard.board[44].atk).toBe(true);
// 	expect(gboard.board[54].atk).toBe(true);

// 	expect(gboard.ships[4].isSunk()).toBe(true);
// 	expect(gboard.board[12].status).toBe('sunk');
// 	expect(gboard.board[54].status).toBe('sunk');
// });
