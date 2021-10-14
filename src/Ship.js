import { pieceLength } from './Pieces';
function Ship(type) {
	const id = type;
	const length = pieceLength[type];
	let direction = 'horizontal';

	const getDirection = () => direction;
	const changeDirection = () => {
		direction === 'horizontal' ? (direction = 'vertical') : (direction = 'horizontal');
	};

	var lives = Array(length).fill(0);
	const hit = (i) => (lives[i] = 1);
	const isSunk = () => lives.every((live) => live === 1);

	return { id, length, type, isSunk, hit, getDirection, changeDirection };
}

export default Ship;
