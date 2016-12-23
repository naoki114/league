import { connect } from 'react-redux';
import MatchCell from './MatchCell.jsx';
import MatchCellActions from './MatchCellActions.js';
function mapStateToProps(state, ownProps) {
    const {
        matchResultId,
        matchResult,
        leftPlayerId,
        rightPlayerId,
    } = ownProps;
    return {
    	matchResultId,
        matchResult,
        leftPlayerId,
        rightPlayerId,
        editingLeftPlayerId: state.matchCell.get('editingLeftPlayerId'),
        editingRightPlayerId: state.matchCell.get('editingRightPlayerId'),
    };
}

function mapDispatchToEvents(dispatch) {
    return {
        onClickMatchCell: (leftPlayerId, rightPlayerId) => {
            dispatch(MatchCellActions.openEditor(leftPlayerId, rightPlayerId));
        },
        onMouseLeaveMatchCell: () => {
            dispatch(MatchCellActions.closeEditor());
        }
    };
}

const MatchCellContainer = connect(
    mapStateToProps,
    mapDispatchToEvents
)(MatchCell);

export default MatchCellContainer;