const GameRender = (() => {
	const renderCell = (y, x, status) => {
		let cell = `<div class="grid-cell cell-${y}=${x}" data-y=${y} data-x=${x}></div>`;
		if (status !== '') {
			cell = `<div class="grid-cell cell-${y}=${x} occupied" data-y=${y} data-x=${x}><div class="${status}" data-y=${y} data-x=${x}></div></div>`;
		}
		return cell;
	};

	const updateBoard = (parent) => {
		parent.textContent = '';
	};

	const onScreenGrid = (playerGrid, board, type) => {
		updateBoard(playerGrid);
		const gboard = board.getBoard();
		const length = gboard.length;
		let grid = '';
		for (let i = 0; i < length; i++) {
			for (let j = 0; j < length; j++) {
				let status = gboard[i][j];
				if (status === 0) {
					status = '';
				} else if (status.ship) {
					if (type === 'user') {
						status = status.ship.id + ' ship';
					} else {
						status = '';
					}
				}
				grid += renderCell(i, j, status);
			}
		}
		playerGrid.insertAdjacentHTML('afterbegin', grid);
	};
	const setShipIndexes = (fleet) => {
		for (const ship in fleet) {
			for (let i = 0; i < fleet[ship].length; i++) {
				let boat = document.querySelectorAll('.' + fleet[ship].id)[i];
				boat.setAttribute('data-index', `${i}`);
				boat.setAttribute('data-ship', `${fleet[ship].id}`);
			}
		}
	};
	return {
		onScreenGrid,
		setShipIndexes,
	};
})();

export default GameRender;
