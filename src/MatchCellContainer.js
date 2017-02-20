import { connect } from 'react-redux';
import MatchCell from './MatchCell.jsx';
import MatchCellActions from './MatchCellActions.js';
function mapStateToProps(state, ownProps) {
    const {
        matchResultId,
        matchResult,
        leftPlayerId,
        rightPlayerId,
        onChangePlayerPoint,
    } = ownProps;
    return {
        matchResultId,
        matchResult,
        leftPlayerId,
        rightPlayerId,
        editingLeftPlayerId: state.matchCell.get('editingLeftPlayerId'),
        editingRightPlayerId: state.matchCell.get('editingRightPlayerId'),
        onChangePlayerPoint,
    };
}

function mapDispatchToEvents(dispatch) {
    return {
        onClickInputButton: (leftPlayerId, rightPlayerId) => {
            dispatch(MatchCellActions.openEditor(leftPlayerId, rightPlayerId));
        },
        onClickOkButton: () => {
            dispatch(MatchCellActions.closeEditor());
        }
    };
}

const MatchCellContainer = connect(
    mapStateToProps,
    mapDispatchToEvents
)(MatchCell);

export default MatchCellContainer;
