import Immutable from 'immutable';
import matchCellActionTypes from './matchCellActionTypes.js';

const initialState = Immutable.fromJS({
	isOpenEditor: false,
});

export default function matchCellReducer(state = initialState, action) {
    switch (action.type) {
    	case matchCellActionTypes.OPEN_EDITOR: {
    		return state.set('isOpenEditor', true);
    	}
    	case matchCellActionTypes.CLOSE_EDITOR: {
    		return state.set('isOpenEditor', false);
    	} 
    	default: {
            return state;
        }
   	}
}