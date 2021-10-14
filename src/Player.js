import Gameboard from './Gameboard';
import { randCoords, createFleet, pieces } from './Pieces';

class Player {
	constructor(user) {
		this.name = user;
		this.ships = createFleet(pieces);
		this.board = new Gameboard();
	}
	attack(y, x, board) {
		board.recieveAttack(y, x);
	}
	autoAttack(opp) {
		const [y, x] = randCoords();
		const target = opp.board[y + x];
		if (target === 'miss' || target === 'hit') {
			this.autoAttack(opp);
		} else {
			opp.recieveAttack(y, x);
		}
	}
	resetShips() {
		this.ships = createFleet(pieces);
	}
}

export default Player;
