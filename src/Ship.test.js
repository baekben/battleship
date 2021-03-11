import ship from './Ship';

test('Ship size', () => {
	expect(ship(2).type).toEqual(2);
});

test('Ship function check', () => {
	expect(ship(2).hit).toBeDefined();
	expect(ship(2).isSunk).toBeDefined();
});

test('Ship hit', () => {
	const patrol = ship(2, [
		{ pt: { x: 0, y: 0 }, isHit: false },
		{ pt: { x: 0, y: 1 }, isHit: false },
	]);
	patrol.hit(0, 0);
	expect(patrol.coords[0].isHit).toBe(true);
});

test('Ship sinks', () => {
	const destroyer = ship(3, [
		{ pt: { x: 0, y: 0 }, isHit: false },
		{ pt: { x: 0, y: 1 }, isHit: false },
		{ pt: { x: 0, y: 2 }, isHit: false },
	]);
	destroyer.hit(0, 0);
	destroyer.hit(0, 1);
	destroyer.hit(0, 2);
	expect(destroyer.isSunk).toBeDefined();
});
