import gameboard from './Gameboard';

test('Place ship(s) at coordinate', () => {
	const testBoard = gameboard();
	testBoard.placeShip(6);
	const expected = [0, 0, 0, 0, 0, 0];
	expect(testBoard.ships).toBe(expected);
});
