import gameboard from './Gameboard';

let board = gameboard();

test('Add ship', () => {
	board.placeShip(3);
	let expected = 3;
	expect(board.ships[0].type).toBe(expected);
});
