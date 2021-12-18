import Ship from '../Ship';

describe('Ships set', () => {
	describe('properties', () => {
		const ship = Ship('Submarine');
		test('id', () => {
			expect(ship.id).toBe('Submarine');
		});
		test('length', () => {
			expect(ship.length).toBe(3);
		});
		test('direction', () => {
			expect(ship.getDirection()).toBe('horizontal');
		});
		test('change direction of ship', () => {
			ship.changeDirection();
			expect(ship.getDirection()).toBe('vertical');
		});
	});

	describe('hit test', () => {
		const ship = Ship('Battleship');
		test('no hits', () => {
			expect(ship.getLives()).toEqual([0, 0, 0, 0]);
		});
		test('one hit', () => {
			ship.hit(2);
			expect(ship.getLives()).toEqual([0, 0, 'hit', 0]);
		});
	});

	describe('sink test', () => {
		const ship = Ship('Destroyer');
		test('no sunk', () => {
			expect(ship.isSunk()).toBe(false);
		});
		test('hit but not sunk', () => {
			ship.hit(0);
			expect(ship.isSunk()).toBe(false);
		});
		test('ship sunk', () => {
			ship.hit(1);
			expect(ship.isSunk()).toBe(true);
		});
	});

	
});
