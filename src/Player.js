import { randCoords, createFleet, pieces } from './Pieces';

const Player = (user) => {
	let fleet = createFleet(pieces);

	const getUser = () => user;
	const getFleet = () => fleet;

	const attack = (y, x, board) => {
		board.recieveAttack(y, x);
	};
	const autoAttack = (opp) => {
		const [y, x] = randCoords();
		const target = opp.board[y + x];
		if (target === 'miss' || target === 'hit') {
			this.autoAttack(opp);
		} else {
			opp.recieveAttack(y, x);
		}
	};
	const resetShips = () => {
		this.ships = createFleet(pieces);
	};

	return { getUser, getFleet, attack, autoAttack, resetShips };
};

export default Player;
