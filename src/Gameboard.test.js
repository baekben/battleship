import gameboard from './Gameboard';

let board = gameboard();

test('Add ship', () => {
	board.placeShip(3);
	let expected = 3;
	expect(board.ships[0].type).toBe(expected);
});

test('Recieve an attack', () => {
	board.placeShip(3);
	let curShip = board.ships[0];
	board.recieveAttack(curShip, 0);
	const expected = [1, 0, 0];
	expect(board.ships[0].lives).toEqual(expected);
});
