function Ship(type, coords) {
	var lives = Array(type).fill(0);
	const hit = (x, y) => {
		coords.map((coord) => {
			if (coord.pt.x === x && coord.pt.y === y) {
				lives[coords.indexOf(coord)] = 1;
				coord.isHit = true;
			}
			return coord;
		});
	};
	const isSunk = () => lives.every((live) => live === 1);

	return { type, isSunk, hit, lives, coords };
}

export default Ship;
