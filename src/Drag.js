import gameRender from './GameRender';
const Drag = (player, board) => {
	let selectedShip;
	let shipIndex;

	const getShipIndex = (e) => {
		shipIndex = Number(e.target.dataset.index);
	};

	const dragBegin = (e) => {
		selectedShip = e.target;
		console.log(selectedShip);
	};

	const dragDrop = (e) => {
		const cell = e.target;
		const p1Ship = player.getFleet()[selectedShip.dataset.ship];
		const isHorizontal = p1Ship.getDirection() === 'horizontal';
		const y = Number(cell.dataset.y) - (isHorizontal ? 0 : shipIndex);
		const x = Number(cell.dataset.x) - (isHorizontal ? shipIndex : 0);

		const outcome = board.placeShip(p1Ship, y, x);
		if (outcome) {
			gameRender.onScreenGrid(document.querySelector('.p1Grid'), board, player.getUser());
			gameRender.setShipIndexes(player.getFleet());
			addDragDropEventListeners();
			selectedShip.parentElement.removeChild(selectedShip);
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
