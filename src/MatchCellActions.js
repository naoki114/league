import matchCellActionTypes from './matchCellActionTypes.js';

export default class MatchCellActions {
	static openEditor() {
		return ({
			type: matchCellActionTypes.OPEN_EDITOR,
		});
	}
	static closeEditor() {
		return ({
			type: matchCellActionTypes.CLOSE_EDITOR,
		});
	}
}