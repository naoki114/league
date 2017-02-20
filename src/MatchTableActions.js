import matchTableActionTypes from './matchTableActionTypes.js';

export default class MatchTableActions {

    static loadTmpState(){
        return {
            type: matchTableActionTypes.LOAD_TMP_STATE,
        };
    }

    static addPlayer(){
        return {
            type: matchTableActionTypes.ADD_PLAYER,
        };
    }

    /**
     * プレイヤーを削除する
     * @param {string} playerId プレイヤーのId
     */
    static deletePlayer(playerId) {
        return {
            type: matchTableActionTypes.DELETE_PLAYER,
            playerId
        };
    }

    static changeTmpPlayerName(playerName){
        return{
            type: matchTableActionTypes.CHANGE_TMP_PLAYER_NAME,
            playerName,
        };
    }

    /**
     * プレイヤーの点数を変更する
     * @param {string} matchResultId 対戦結果Id
     * @param {string} playerId プレイヤーのId
     * @param {string} playerPoint プレイヤーの点数
     */
    static changePlayerPoint(
        matchResultId,
        playerId,
        playerPoint
    ){
        return{
            type: matchTableActionTypes.CHANGE_PLAYER_POINT,
            matchResultId,
            playerId,
            playerPoint,
        };
    }


    static calcTotalResults() {
        return {
            type: matchTableActionTypes.CALC_TOTAL_RESULTS,
        };
    }
    static toggleOpenMenu() {
        return {
            type: matchTableActionTypes.TOGGLE_OPEN_MENU,
        };
    }
}
