import gameRender from './GameRender';

//Drag function for dragging and dropping ships within the board
//Parameters: player who is dragging and the board of the player
const Drag = (player, board) => {
	let selectedShip;
	let shipIndex;
	let group = []; //holds the data of the boat being dragged

	//Grab index of ship
	const getShipIndex = (e) => {
		shipIndex = Number(e.target.dataset.index);
	};

	//Dragging begins
	//e.target is the selected ship being dragged
	const dragBegin = (e) => {
		selectedShip = e.target;
		let item = e.target.dataset.ship;

		//collect all cells that have ships
		//marked by being occupied
		let grabship = document.querySelectorAll('.occupied');
		for (let ship of grabship) {
			//checking each ship from all that are grabbed
			let child = ship.querySelector('.ship');
			//if the selected ship's name is in the element
			//of the cell, then copy it into the group
			if (child.classList.contains(`${item}`)) {
				group.push(child); //grab the ship that is going to be dragged.
			}
		}
		//The starting location for the selected ship
		//is set to 0 on the array to note the spot will now be
		//empty due to being dragged
		group.forEach((part) => {
			let x1 = part.dataset.x;
			let y1 = part.dataset.y;
			board.getBoard()[y1][x1] = 0;
		});
	};

	//Drop function
	//Parameter: e will be the selected/clicked element by the player
	const dragDrop = (e) => {
		const cell = e.target;
		//calls the ship from the player's fleet
		const p1Ship = player.getFleet()[selectedShip.dataset.ship];
		const isHorizontal = p1Ship.getDirection() === 'horizontal';

		//Sets new coordinates of the ship from the original location
		const y = Number(cell.dataset.y) - (isHorizontal ? 0 : shipIndex);
		const x = Number(cell.dataset.x) - (isHorizontal ? shipIndex : 0);

		//outcome after placing ship at new location
		const outcome = board.placeShip(p1Ship, y, x);

		if (outcome) {
			//if outcome is valid rerender grid
			gameRender.onScreenGrid(document.querySelector('.p1Grid'), board, player.getUser());
			gameRender.setShipIndexes(player.getFleet());
			//reinitiate event listeners
			addDragDropEventListeners();
			gameRender.rotateEvent(player);
			console.log(board.getBoard());
			if (board.allShipsPlaced()) {
				document.querySelector('.start').className = 'start';
			}
		}
	};

	const dragOver = (e) => e.preventDefault();
	const dragEnter = (e) => e.preventDefault();
	const dragLeave = () => {
		console.log('drag leave');
	};
	const dragEnd = () => {
		console.log('drag end');
	};

	const addDragDropEventListeners = () => {
		const ships = document.querySelectorAll('.ship');
		const cells = document.querySelector('.p1Grid').childNodes;

		for (const ship of ships) {
			ship.setAttribute('draggable', true);
			ship.addEventListener('mousedown', getShipIndex);
			ship.addEventListener('dragstart', dragBegin);
			ship.addEventListener('dragend', dragEnd);
		}
		for (const cell of cells) {
			cell.addEventListener('dragover', dragOver);
			cell.addEventListener('dragenter', dragEnter);
			cell.addEventListener('dragleave', dragLeave);
			cell.addEventListener('drop', dragDrop);
		}
	};
	return { addDragDropEventListeners };
};

export default Drag;
