import matchTableActionTypes from './matchTableActionTypes.js';

export default class MatchTableActions {
	static addPlayer(playerName){
		return ({
			type: matchTableActionTypes.ADD_PLAYER,
			playerName,
		});
	}
}