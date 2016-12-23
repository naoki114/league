import Immutable from 'immutable';
import matchCellActionTypes from './matchCellActionTypes.js';

const initialState = Immutable.fromJS({
	editingLeftPlayerId: null,
    editingRightPlayerId: null,
});

export default function matchCellReducer(state = initialState, action) {
    switch (action.type) {
    	case matchCellActionTypes.OPEN_EDITOR: {
    		return state.withMutations((ctx) => {
                ctx.set('editingLeftPlayerId', action.leftPlayerId)
                .set('editingRightPlayerId', action.rightPlayerId);
            });
    	}
    	case matchCellActionTypes.CLOSE_EDITOR: {
    		return state.withMutations((ctx) => {
                return ctx.set('editingLeftPlayerId', '1')
                .set('editingRightPlayerId', '1');
            });
    	} 
    	default: {
            return state;
        }
   	}
}