import Player from '../Player';
import Gameboard from '../Gameboard';

const player = new Player('User');
const computer = new Player('Computer');
const playerBoard = Gameboard();
const compBoard = Gameboard();

test('player name', () => {
	expect(player.name).toBe('User');
});

test('computer name', () => {
	expect(computer.name).toBe('Computer');
});

describe('Player attack', () => {
	test('attack computer', () => {
		player.attack(4, 3, compBoard);
		const target = compBoard.getBoard()[4][3];
		expect(target).toBe('miss');
	});
});

describe('Computer Auto Attack', () => {
	test('Computer attack', () => {
		computer.autoAttack(playerBoard);
		const target = playerBoard.board.flat().every((cell) => cell === null);
		expect(target).toBe(false);
	});
});

describe('Reset player ships', () => {
	test('player ships w/ no reset are equal', () => {
		const fleet1 = player.ships;
		const fleet2 = player.ships;

		const test = fleet1 === fleet2;
		expect(test).toBe(true);
	});
	test('player ships after reset are not equal', () => {
		const fleet1 = player.ships;
		player.resetShips();
		const fleet2 = player.ships;
		const test = fleet1 === fleet2;
		expect(test).toBe(false);
	});
});
