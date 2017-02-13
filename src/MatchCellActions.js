import matchCellActionTypes from './matchCellActionTypes.js';

export default class MatchCellActions {
    static openEditor(leftPlayerId, rightPlayerId) {
        return ({
            type: matchCellActionTypes.OPEN_EDITOR,
            leftPlayerId,
            rightPlayerId
        });
    }
    static closeEditor() {
        return ({
            type: matchCellActionTypes.CLOSE_EDITOR,
        });
    }
}