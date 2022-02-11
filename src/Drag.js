import gameRender from './GameRender';
const Drag = (player, board) => {
	let selectedShip;
	let shipIndex;
	let group = [];

	const getShipIndex = (e) => {
		shipIndex = Number(e.target.dataset.index);
		console.log(shipIndex);
	};

	const dragBegin = (e) => {
		selectedShip = e.target;
		let item = e.target.dataset.ship;
		let grabship = document.querySelectorAll('.occupied');
		for (let ship of grabship) {
			let child = ship.querySelector('.ship');
			if (child.classList.contains(`${item}`)) {
				group.push(child); //grab the ship that is going to be dragged. Then I can remove the previous location
			}
		}
		console.log(group);
	};

	const dragDrop = (e) => {
		const cell = e.target;
		const p1Ship = player.getFleet()[selectedShip.dataset.ship];
		console.log(p1Ship);
		const isHorizontal = p1Ship.getDirection() === 'horizontal';
		const y = Number(cell.dataset.y) - (isHorizontal ? 0 : shipIndex);
		const x = Number(cell.dataset.x) - (isHorizontal ? shipIndex : 0);

		//outcome after placing ship
		const outcome = board.placeShip(p1Ship, y, x);
		if (outcome) {
			//want to remove old ship from array and rerender board
			//get old ship: in group
			//get board and set points in array to 0
			//have gameRender run
			group.forEach((part) => {
				let x1 = part.dataset.x;
				let y1 = part.dataset.y;
				board.getBoard()[y1][x1] = 0;
			});
			gameRender.onScreenGrid(document.querySelector('.p1Grid'), board, player.getUser());
			gameRender.setShipIndexes(player.getFleet());
			addDragDropEventListeners();
			console.log(selectedShip.parentElement);
			selectedShip.parentElement.removeChild(selectedShip);
			if (board.allShipsPlaced()) {
				document.querySelector('.start').className = 'start';
			}
		}
		console.log(board.getBoard());
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
