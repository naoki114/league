import { combineReducers } from 'redux';
import matchTableReducer from './matchTableReducer.js';
import matchCellReducer from './matchCellReducer.js';

export default combineReducers({
	matchTable: matchTableReducer,
	matchCell: matchCellReducer
});