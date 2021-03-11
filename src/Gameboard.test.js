import gameboard from './Gameboard';

let gboard = gameboard();

test('10x10 board set', () => {
	gboard.setBoard();
	expect(gboard.board.length).toBe(100);
});

test('Add ship to board', () => {
	gboard.placeShip(3, [
		{ pt: { x: 0, y: 0 }, isHit: false },
		{ pt: { x: 0, y: 1 }, isHit: false },
		{ pt: { x: 0, y: 2 }, isHit: false },
	]);
	expect(gboard.ships.length).toBe(1);
	expect(gboard.ships[0]).toBeDefined();
	expect(gboard.board[0]).toEqual({
		pt: { x: 0, y: 0 },
		type: 3,
		atk: false,
		status: null,
	});
});

test('Ship recieves an attack', () => {
	gboard.placeShip(3, [
		{ pt: { x: 0, y: 0 }, isHit: false },
		{ pt: { x: 0, y: 1 }, isHit: false },
		{ pt: { x: 0, y: 2 }, isHit: false },
	]);
	gboard.recieveAttack(0, 0);
	expect(gboard.board[0].atk).toBe(true);
});

test('Board is attacked but ship is not hit', () => {
	gboard.placeShip(4, [
		{ pt: { x: 0, y: 0 }, isHit: false },
		{ pt: { x: 0, y: 1 }, isHit: false },
		{ pt: { x: 0, y: 2 }, isHit: false },
		{ pt: { x: 0, y: 3 }, isHit: false },
	]);
	gboard.recieveAttack(5, 6);
	expect(gboard.board[0].atk).toBe(true);
	expect(gboard.board[0].status).toBe('hit');
});
