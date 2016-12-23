import { connect } from 'react-redux';
import MatchCell from './MatchCell.jsx';
import MatchCellActions from './MatchCellActions.js';
import matchCellActionTypes from './matchCellActionTypes.js';
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
        isOpenEditor: state.matchCell.get('isOpenEditor'),
    };
}

function mapDispatchToEvents(dispatch) {
    return {
        onClickMatchCell: () => {
            console.log('open');
            dispatch(MatchCellActions.openEditor());
        },
        onMouseLeaveMatchCell: () => {
            console.log('close');
            dispatch(MatchCellActions.closeEditor());
        }
    };
}

const RootContainer = connect(
    mapStateToProps,
    mapDispatchToEvents
)(MatchCell);

export default RootContainer;