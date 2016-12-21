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

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
    case matchTableActionTypes.ADD_PLAYER: {
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
    		).setIn(
    			['matchResults', 'byId'], oldMatchResults.mergeDeep(newMatchResults)
    		)
    	});
    }
    case matchTableActionTypes.CHANGE_TMP_PLAYER_NAME: {
    	return state.set('tmpPlayerName', action.playerName);
    }
    default:
        return state;
    }
}
