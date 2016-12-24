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

	static changeLeftPlayerPoint(
		matchResultId,
		leftPlayerId,
		leftPlayerPoint
	){
		return({
			type: matchTableActionTypes.CHANGE_LEFT_PLAYER_POINT,
			matchResultId,
			leftPlayerId,
			leftPlayerPoint,
		})
	}

	static changeRightPlayerPoint(
		matchResultId,
		rightPlayerId,
		rightPlayerPoint
	){
		return({
			type: matchTableActionTypes.CHANGE_RIGHT_PLAYER_POINT,
			matchResultId,
			rightPlayerId,
			rightPlayerPoint,
		})
	}

	static calcTotalResults() {
		return ({
			type: matchTableActionTypes.CALC_TOTAL_RESULTS,
		})
	}
}