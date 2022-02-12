//GameRender: renders components for the browser by taking the data from the player array.

const GameRender = (() => {
	//Adds rotate function to each cell occupied by a boat
	const rotateEvent = (player) => {
		const ships = document.querySelectorAll('.ship');
		ships.forEach((ship) => {
			//sets double click function for each cell occupied by boat
			ship.addEventListener('dblclick', (e) => {
				//after a cell is double clicked and it is occuiped, rotation starts
				const targetShip = player.getFleet()[e.target.dataset.ship];
				console.log(targetShip);
				targetShip.changeDirection();
				console.log(targetShip.getDirection());
			});
		});
	};

	//renders cells for grid
	const renderCell = (y, x, status) => {
		let cell = `<div class="grid-cell cell-${y}=${x}" data-y=${y} data-x=${x}></div>`;
		//if a boat is in the cell, then additional div is created for the boat.
		if (status !== '') {
			cell = `<div class="grid-cell cell-${y}=${x} occupied" data-y=${y} data-x=${x}><div class="${status}" data-y=${y} data-x=${x}></div></div>`;
		}
		return cell;
	};
	//clears the board before setting the cells
	const updateBoard = (parent) => {
		parent.textContent = '';
	};

	//renders the on screen grid for the (player, their board, type: user or computer)
	const onScreenGrid = (playerGrid, board, type) => {
		updateBoard(playerGrid); //clears board
		const gboard = board.getBoard();
		const length = gboard.length;
		let grid = '';
		for (let i = 0; i < length; i++) {
			for (let j = 0; j < length; j++) {
				let status = gboard[i][j];
				if (status === 0) {
					status = '';
				} else if (status.ship) {
					//if a boat is in the board arry then add the ship's name to the status
					if (type === 'user') {
						status = status.ship.id + ' ship';
					} else {
						status = '';
					}
				}
				//the coordinate for the cell and boat name(if there is one) is added to the grid after rendering the cell
				grid += renderCell(i, j, status);
			}
		}
		playerGrid.insertAdjacentHTML('afterbegin', grid);
	};

	//Grabs all ships and adds the index of the part on the ship as well as the ship's name in data-ship
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
		rotateEvent,
	};
})();

export default GameRender;
