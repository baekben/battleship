import Gameboard from '../Gameboard';
import Ship from '../Ship';

describe('Gameboard', () => {
	describe('Create board', () => {
		const gboard = Gameboard();
		test('empty board', () => {
			const current = gboard.getBoard().every((spot) => spot === null);
			expect(current).toBe(false);
		});
	});

	describe('Add Ship to Board horizontally', () => {
		const gboard = Gameboard();
		const ship = Ship('Cruiser'); //length = 3
		gboard.placeShip(ship, 0, 0);

		test('ship placed at index: 0', () => {
			const spot = gboard.board[0][0];
			expect(spot).toEqual({ ship, index: 0 });
		});
		test('ship placed at index: 1', () => {
			const spot = gboard.board[0][1];
			expect(spot).toEqual({ ship, index: 1 });
		});
		test('ship placed at index: 2', () => {
			const spot = gboard.board[0][2];
			expect(spot).toEqual({ ship, index: 2 });
		});
	});

	describe('Place ship vertically', () => {
		const gboard = Gameboard();
		const ship = Ship('Submarine'); //length = 3
		ship.changeDirection();
		gboard.placeShip(ship, 3, 2);

		test('place ship at starter coord w/ index: 0', () => {
			const actual = gboard.getBoard()[3][2];
			expect(actual).toEqual({ ship, index: 0 });
		});
		test('place ship at coord w/ index : 1', () => {
			const actual = gboard.getBoard()[4][2];
			expect(actual).toEqual({ ship, index: 1 });
		});
		test('placed ship at final coord w/index: 2', () => {
			const actual = gboard.getBoard()[5][2];
			expect(actual).toEqual({ ship, index: 2 });
		});
	});

	describe("Ship can't be placed out of bounds", () => {
		const gboard = Gameboard();
		const carrier = Ship('Carrier'); //length is 5

		test('ship place out of bounds horizontally', () => {
			gboard.placeShip(carrier, 7, 7);
			const actual = gboard.getBoard()[7][7];
			expect(actual).toEqual(0);
		});
		test('ship placed out of bounds vertically', () => {
			carrier.changeDirection();
			gboard.placeShip(carrier, 7, 7);
			const actual = gboard.getBoard()[7][7];
			expect(actual).toEqual(0);
		});
	});

	describe('Ship unable to be placed if there a existing ship', () => {
		const gboard = Gameboard();
		const carrier = Ship('Carrier');
		const battleship = Ship('Battleship');

		test('Ships collide', () => {
			gboard.placeShip(carrier, 3, 0);
			gboard.placeShip(battleship, 3, 0);
			const actual = gboard.getBoard()[3][0];
			expect(actual).toEqual({ ship: carrier, index: 0 });
		});
		test('Ships collide at one place', () => {
			battleship.changeDirection();
			gboard.placeShip(battleship, 0, 2);
			const actual = gboard.getBoard()[0][2];
			expect(actual).toEqual(0);
		});
	});

	describe('All ships placed', () => {
		const gboard = Gameboard();
		const carrier = Ship('Carrier');
		const battleship = Ship('Battleship');
		const cruiser = Ship('Cruiser');
		const submarine = Ship('Submarine');
		const destroyer = Ship('Destroyer');

		test('no ships placed', () => {
			const actual = gboard.allShipsPlaced();
			expect(actual).toBe(false);
		});
		test('some ships placed', () => {
			gboard.placeShip(carrier, 0, 0);
			gboard.placeShip(battleship, 1, 0);
			const actual = gboard.allShipsPlaced();
			expect(actual).toBe(false);
		});
		test('Placed all ships', () => {
			gboard.placeShip(cruiser, 2, 0);
			gboard.placeShip(submarine, 3, 0);
			gboard.placeShip(destroyer, 4, 0);
			const actual = gboard.allShipsPlaced();
			expect(actual).toBe(true);
		});
	});

	describe('receive attack', () => {
		const gboard = Gameboard();
		const carrier = Ship('Carrier');
		const battleship = Ship('Battleship');
		gboard.placeShip(carrier, 2, 0); //[0,2],[1,2],[2,2],[3,2],[4,2]
		battleship.changeDirection();
		gboard.placeShip(battleship, 3, 2);
		gboard.recieveAttack(0, 0);

		test('attack a carrier at index 0', () => {
			gboard.recieveAttack(2, 0);
			const actual = carrier.getLives();
			expect(actual).toEqual(['hit', 0, 0, 0, 0]);
		});

		test('attack carrier at index 4', () => {
			gboard.recieveAttack(2, 4);
			const actual = carrier.getLives();
			expect(actual).toEqual(['hit', 0, 0, 0, 'hit']);
		});

		test('fire missed', () => {
			const actual = gboard.getBoard()[0][0];
			expect(actual).toEqual('miss');
		});

		test('fire shot at (0,2)', () => {
			const actual = gboard.getBoard()[2][0];
			expect(actual).toEqual('hit');
		});

		test('fire shot at (4,2)', () => {
			const actual = gboard.getBoard()[2][4];
			expect(actual).toEqual('hit');
		});
	});

	describe('All ships sunk', () => {
		const gameboard = Gameboard();
		const submarine = Ship('Submarine');
		const destroyer = Ship('Destroyer');
		gameboard.placeShip(submarine, 2, 0);
		destroyer.changeDirection();
		gameboard.placeShip(destroyer, 3, 2);

		test('No ship is sunk', () => {
			const actual = gameboard.allShipsPlaced();
			expect(actual).toEqual(false);
		});

		test('1 ship sinks', () => {
			gameboard.recieveAttack(2, 0);
			gameboard.recieveAttack(2, 1);
			gameboard.recieveAttack(2, 2);
			const actual = gameboard.allShipsPlaced();
			expect(actual).toEqual(false);
		});

		test('Fleet sunk', () => {
			gameboard.recieveAttack(3, 2);
			gameboard.recieveAttack(4, 2);
			const actual = gameboard.allShipsSunk();
			expect(actual).toEqual(true);
		});
	});
});
