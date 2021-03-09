function Ship(type) {
	const lives = Array(type).fill(0);
	const hit = (mark) => {
		if (lives[mark] === 0) {
			lives[mark] = 1;
		}
	};
	const isSunk = () => {
		return !lives.includes(0);
	};

	return { type, isSunk, hit, lives };
}

module.exports = Ship;
