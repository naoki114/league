import Immutable from 'immutable';
import matchTableActionTypes from './matchTableActionTypes.js';

const initialState = Immutable.fromJS({
	players: {
		maxId: 0,
		idList: [],
		byId: {},
	},
	matchResults: {
		byId: {},
	},
  totalResults: {
      byId: {},
  },
	tmpPlayerName: "",
});

function createEmptyResult(primaryPlayerId, playerIdList){
	let matchResults = {};
	playerIdList.forEach((playerId)=> {
		if(primaryPlayerId !== playerId){
			const newId = primaryPlayerId + '-' + playerId;
			matchResults[newId] = {};
			matchResults[newId][primaryPlayerId] = {point:0};
			matchResults[newId][playerId] = {point:0};
		}
	});
	return Immutable.fromJS(matchResults);
}

function addPlayer(state, action){
    const maxId = state.getIn(['players', 'maxId']);
    const idList = state.getIn(['players', 'idList']);
    const newId = maxId + 1;
    const newMatchResults = createEmptyResult(newId, idList);
    const oldMatchResults = state.getIn(['matchResults','byId']);
    return state.withMutations((ctx) => {
        return ctx.setIn(['players','maxId'], newId)
        .setIn(['players', 'idList'], idList.push(newId.toString()))
        .setIn(
            ['players', 'byId', newId.toString()],
            new Immutable.Map({
                name: state.get('tmpPlayerName')
            })
        )
        .setIn(
            state.set('tmpPlayerName', "")
        )
        .setIn(
            ['matchResults', 'byId'], oldMatchResults.mergeDeep(newMatchResults)
        )
    });
}

function calcTotalResultPoint(state){
    const players = state.get("players");
    const playerIdList = players.get('idList');
    const matchResultsMap = state.getIn(['matchResults', 'byId']);
    return state.withMutations((ctx) => {
        // 勝ち数計算
        playerIdList.forEach((playerId) => {
            let winCount = 0;
            let winPoint = 0;
            playerIdList.forEach((anotherPlayerId) => {
                if (playerId !== anotherPlayerId) {
                    let matchResultId = [playerId, anotherPlayerId].join('-');
                    let matchResult = matchResultsMap.get(matchResultId);
                    if(matchResult === undefined) {
                        matchResultId = [anotherPlayerId, playerId].join('-');
                        matchResult = matchResultsMap.get(matchResultId);
                    }
                    const playerPoint = matchResult.getIn([playerId, 'point']);
                    const anotherPlayerPoint = matchResult.getIn([anotherPlayerId, 'point']);
                    if(playerPoint > anotherPlayerPoint){
                        winCount++;
                    }
                    winPoint += playerPoint;
                    winPoint -= anotherPlayerPoint;
                }
            });
            const totalResult = new Immutable.Map({winCount, winPoint});
            ctx.setIn(['totalResults', 'byId', playerId], totalResult);
        });
    });
}

function loadTmpState(state) {
	state.withMutations((ctx) => {
		if(localStorage.getItem("tmp_players") !== null) {
			ctx.set(
				'players' ,
				Immutable.fromJS(
					JSON.parse(
						localStorage.getItem("tmp_players")
					)
				)
			);
		}
		if(localStorage.getItem("tmp_matchResults") !== null) {
			ctx.set(
				'matchResults' ,
				Immutable.fromJS(
					JSON.parse(
						localStorage.getItem("tmp_matchResults")
					)
				)
			);
		}
		if(localStorage.getItem("tmp_totalResults") !== null) {
			ctx.set(
				'totalResults' ,
				Immutable.fromJS(
					JSON.parse(
						localStorage.getItem("tmp_totalResults")
					)
				)
			);
		}
	});
	return state;
}

export default function matchTableReducer(state = initialState, action) {
    switch (action.type) {
    case matchTableActionTypes.LOAD_TMP_STATE: {
			return loadTmpState(state);
    }
    case matchTableActionTypes.ADD_PLAYER: {
    	return addPlayer(state,action);
    }
    case matchTableActionTypes.CHANGE_TMP_PLAYER_NAME: {
    	return state.set('tmpPlayerName', action.playerName);
    }
    case matchTableActionTypes.CHANGE_LEFT_PLAYER_POINT: {
        return state.setIn(
            ['matchResults', 'byId', action.matchResultId, action.leftPlayerId, 'point'],
            Number(action.leftPlayerPoint)
        );
    }
    case matchTableActionTypes.CHANGE_RIGHT_PLAYER_POINT: {
        return state.setIn(
            ['matchResults', 'byId', action.matchResultId, action.rightPlayerId, 'point'],
            Number(action.rightPlayerPoint)
        );
    }
    case matchTableActionTypes.CALC_TOTAL_RESULTS: {
        return calcTotalResult(state);
    }
    default:
        return state;
    }
}
