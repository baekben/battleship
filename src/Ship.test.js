import Ship from './Ship';

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
});
