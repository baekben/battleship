import Gameboard from './Gameboard';

class Player {
	constructor(user) {
		this.name = user;
		this.ships = [];
		this.board = new Gameboard();
	}
	attack(x, y, board) {
		let spot = x + y;
		if (board.oppBoard[spot] === 'null') {
			board.recieveAttack(x, y);
		}
	}
	autoAttack(opp) {
		let x = 'random number';
		let y = 'random number';
		this.attack(x, y, opp);
	}
}

export default Player;
