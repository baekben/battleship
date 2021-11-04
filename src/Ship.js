import { pieceLength } from './Pieces';
const Ship = (type) => {
	const id = type;
	const length = pieceLength[type];
	let direction = 'horizontal';

	const getDirection = () => direction;
	const changeDirection = () => {
		direction === 'horizontal' ? (direction = 'vertical') : (direction = 'horizontal');
	};

	const lives = Array(length).fill(0);
	const hit = (i) => (lives[i] = 'hit');

	const getLives = () => lives;

	const isSunk = () => lives.every((live) => live === 'hit');

	return { id, length, type, isSunk, hit, getLives, getDirection, changeDirection };
};

export default Ship;
