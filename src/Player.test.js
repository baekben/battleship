import Player from './Player';
import Gameboard from './Gameboard';

const player = new Player('User');
const computer = new Player('Computer');
const playerBoard = Gameboard();
const compBoard = Gameboard();

test('User creates player', () => {
	expect(player.name).toBe('User');
});

test('Computer is created', () => {
	expect(computer.name).toBe('Computer');
});

test('Create user board', () => {
	playerBoard.setBoard();
	expect(playerBoard.board.length).toBe(100);
});

test('Create computer board', () => {
	compBoard.setBoard();
	expect(compBoard.board.length).toBe(100);
});

describe('Player attack', () => {
	test('attack computer', () => {
		player.attack(3, 4, compBoard);
		const target = compBoard.board[34].status;
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
