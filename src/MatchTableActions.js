import matchTableActionTypes from './matchTableActionTypes.js';

export default class MatchTableActions {
	static addPlayer(){
		return ({
			type: matchTableActionTypes.ADD_PLAYER,
		});
	}

	static changeTmpPlayerName(playerName){
		return({
			type: matchTableActionTypes.CHANGE_TMP_PLAYER_NAME,
			playerName,
		});
	}
}