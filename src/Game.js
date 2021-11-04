import Gameboard from './Gameboard';
import Player from './Player';

const Game = () => {
	const playerOne = Player('user');
	const playerTwo = Player('Computer');

	const playerOneBoard = Gameboard();
	const playerTwoBoard = Gameboard();

	const fleet1 = playerOne.getFleet();
	const fleet2 = playerTwo.getFleet();

	const setShips = (board, fleet) => {
		for (const ship in fleet) {
			board.autoPlace(fleet[ship]);
		}
		console.log('set Ships');
	};

	const setGame = () => {
		console.log(fleet1);
		setShips(playerOneBoard, fleet1);
		setShips(playerTwoBoard, fleet2);
		console.log(playerOneBoard.getBoard());
	};
	return { setGame, setShips };
};

export default Game;
