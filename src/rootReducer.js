import Immutable from 'immutable';
import matchTableActionTypes from './matchTableActionTypes.js';

const initialState = Immutable.fromJS({
	players: {	
		maxId: 2,
		idList: [ '0', '1', '2' ],
		byId: {
			0: {
				name: 'テスト１',
				matchResultIdMap: { 1: '1', 2: '2' }
			},
			1: {
				name: 'テスト２',
				matchResultIdMap: { 0: '1', 2: '3' }
			},
			2: {
				name: 'テスト３',
				matchResultIdMap: { 0: '2', 1: '3' }
			}
		},
	},
	matchResults: {
		byId: {
			1: {
				winner: 0,
				0: {
					point: 5,
				},
				1: {
					point: 2,
				}
			},
			2: {
				winner: 2,
				0: {
					point: 4,
				},
				2: {
					point: 5,
				}
			},
			3: {
				winner: 2,
				1: {
					point: 2,
				},
				2: {
					point: 5,
				}
			}
		}
	}
});

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
    case matchTableActionTypes.ADD_PLAYER: {
    	const maxId = state.getIn(['players', 'maxId']);
    	const idList = state.getIn(['players', 'idList']);
    	const newId = maxId + 1;
    	console.log(idList.push(newId));
    	console.log(newId);
    	return state.withMutations((ctx) => {
    		return ctx.setIn(['players','maxId'], newId)
    		.setIn(['players', 'idList'], idList.push(newId.toString))
    		.setIn(
    			['players', 'byId', newId],
    			new Immutable.Map({
    				name: action.playerName,
    				matchResultIdMap: new Immutable.Map(
    					// FIXME: 空の結果を詰めておく
    				)
    			})
    		)}
    	);
    }
    default:
        return state;
    }
}
