import Gameboard from './Gameboard';
import { randCoords } from './Pieces';

class Player {
	constructor(user) {
		this.name = user;
		this.ships = [];
		this.board = new Gameboard();
	}
	attack(x, y, board) {
		board.recieveAttack(x, y);
	}
	autoAttack(opp) {
		const [x, y] = randCoords();
		const target = opp.board[x + y];
		if (target === 'miss' || target === 'hit') {
			this.autoAttack(opp);
		} else {
			opp.recieveAttack(x, y);
		}
	}
}

export default Player;
