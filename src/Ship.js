function Ship(type) {
	const lives = Array(type).fill(0);
	const hit = (mark) => {
		lives[mark] = 1;
	};
	const isSunk = () => lives.every((live) => live === 1);

	return { type, isSunk, hit, lives };
}

export default Ship;
