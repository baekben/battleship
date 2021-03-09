const ship = require('./Ship');

test('Ship size', () => {
	expect(ship(2).type).toEqual(2);
});

test('Ship function check', () => {
	expect(ship(2).hit).toBeDefined();
	expect(ship(2).isSunk).toBeDefined();
});

test('Ship hit', () => {
	const patrol = ship(2);
	patrol.hit(0);
	const expected = [1, 0];
	expect(patrol.lives).toEqual(expected);
});

test('Ship sinks', () => {
	const destroyer = ship(3);
	destroyer.hit(1);
	destroyer.hit(2);
	destroyer.hit(0);
	expect(destroyer.isSunk).toBeDefined();
});
