import Gameboard from './Gameboard';
import Player from './Player';
import Drag from './Drag';
import GameRender from './GameRender';

//Game function to go through the game play
//Parameter: needs to recieve 'single' or 'double' for game type
//single: verse computer
//double: verse another player
const Game = (type) => {
	const playerOne = Player('user');
	let playerTwo;
	if (type === 'single') {
		playerTwo = Player('computer');
	} else {
		playerTwo = Player('user');
	}

	//Global variables
	//Creates boards for both players
	const playerOneBoard = Gameboard();
	const playerTwoBoard = Gameboard();

	//Fleets of each player are stored
	const fleet1 = playerOne.getFleet();
	const fleet2 = playerTwo.getFleet();

	//calls the drag feature file
	//Parameters: player, player's board
	const drag = Drag(playerOne, playerOneBoard);

	let set = false; //variable to hide or show Start button
	let p1 = document.querySelector('.p1Grid');
	let p2 = document.querySelector('.p2Grid');
	let start = document.querySelector('.start');
	let randomize = document.querySelector('.randomize');

	//auto set the ships in each player's array board
	const setGame = () => {
		playerOneBoard.autoSetShips(fleet1);
		playerTwoBoard.autoSetShips(fleet2);
		renderGrids();
	};

	//When clicking on the opposite player's board, and attack is
	//initiated
	const fireAttack = (e) => {
		const area = e.target;
		if (area.classList.contains('grid-cell')) {
			const y = area.dataset.y;
			const x = area.dataset.x;

			const cell = playerTwoBoard.getBoard()[y][x];
			console.log(cell);
			if (cell !== 'miss' && cell !== 'hit') {
				playerOne.attack(y, x, playerTwoBoard);
				//After player one attacks player two attacks back
				playerTwo.autoAttack(playerOneBoard);
			}

			renderGrids();

			if (playerOneBoard.allShipsSunk() || playerTwoBoard.allShipsSunk()) {
				let winner = '';
				if (playerOneBoard.allShipsSunk()) {
					winner = 'Computer Wins';
				} else if (playerTwoBoard.allShipsSunk()) {
					winner = 'You Win';
				}
				document.querySelector('.p2Grid').removeEventListener('click', fireAttack);
				console.log(winner);
				document.querySelector('.status').classList.toggle('hide');
			}
		}
	};

	//Grids are visually rendered on browser from the player's array board
	const renderGrids = () => {
		GameRender.onScreenGrid(p1, playerOneBoard, playerOne.getUser());
		GameRender.onScreenGrid(p2, playerTwoBoard, playerTwo.getUser());
	};

	//Shows both boards and the game offically begins here
	const showComputerBoard = () => {
		randomize.className = 'randomize';
		p2.classList.toggle('hide');
		if (set === false) {
			setGame();
			set = true;
			start.className = 'start hide';
		}
		GameRender.setShipIndexes(fleet1);
		drag.addDragDropEventListeners();
		GameRender.rotateEvent(playerOne);
		console.log('showComputerBoard');
	};

	//randomizes the ships on player one's board
	const randomShip = () => {
		playerOneBoard.reset();
		playerOneBoard.autoSetShips(fleet1);
		renderGrids(); //render board with all pieces
	};

	//Event listeners for:
	// Attacking, starting the game, randomizing ships, and play again
	const createEventListeners = () => {
		p2.addEventListener('click', fireAttack);
		start.addEventListener('click', showComputerBoard);
		randomize.addEventListener('click', randomShip);
		let playAgainBtn = document.querySelector('.playAgain');
		playAgainBtn.addEventListener('click', playAgain);
	};

	//The browser loads empty boards onto screen
	//Event listeners are called
	const startGame = () => {
		renderGrids(); //set empty boards
		createEventListeners();
	};

	const resetGame = () => {
		playerOne.resetShips();
		playerTwo.resetShips();
		playerOneBoard.reset();
		playerTwoBoard.reset();
		set = false;
		start.className = 'start';
		p2.classList.toggle('hide');
	};

	const playAgain = () => {
		resetGame();
		setGame();
		startGame();
	};

	return { setGame, resetGame, startGame, renderGrids, playAgain };
};

export default Game;
