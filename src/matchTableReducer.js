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
			matchResults[newId].winner =  null;
			matchResults[newId][primaryPlayerId] = {point:0};
			matchResults[newId][playerId] = {point:0};	
		}
	});
	return matchResults;
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

function calcTotalResult(state){
    const players = state.get("players");
    const playerIdList = players.get('idList');
    const playerMap = players.get('byId');
    const matchResultsMap = state.getIn(['matchResults', 'byId']);
    // 勝ち数計算
    const totalResultsMap = playerIdList.map((playerId) => {
        let winCount = 0;
        let winPoint = 0;
        playerIdList.forEach((anotherPlayerId) => {
            if (playerId !== anotherPlayerId) {
                let matchResultId = [playerId, anotherPlayerId].join('-');
                console.log(matchResultId);
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
        return new Immutable.Map({playerId ,winCount, winPoint});
    });
    console.log(totalResultsMap.toJS());
    state.setIn(['totalResults', 'byId', totalResultsMap]);
}

export default function matchTableReducer(state = initialState, action) {
    switch (action.type) {
    case matchTableActionTypes.ADD_PLAYER: {
    	return addPlayer(state,action);
    }
    case matchTableActionTypes.CHANGE_TMP_PLAYER_NAME: {
    	return state.set('tmpPlayerName', action.playerName);
    }
    case matchTableActionTypes.CHANGE_LEFT_PLAYER_POINT: {
        return state.setIn(
            ['matchResults', 'byId', action.matchResultId, action.leftPlayerId, 'point'],
            action.leftPlayerPoint
        );
    }
    case matchTableActionTypes.CHANGE_RIGHT_PLAYER_POINT: {
        return state.setIn(
            ['matchResults', 'byId', action.matchResultId, action.rightPlayerId, 'point'],
            action.rightPlayerPoint
        );
    }
    case matchTableActionTypes.CALC_TOTAL_RESULTS: {
        return calcTotalResult(state);
    }
    default:
        return state;
    }
}
