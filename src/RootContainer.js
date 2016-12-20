import { connect } from 'react-redux';
import MatrchTable from './MatchTable.jsx';
import MatchTableActions from './MatchTableActions.js';
import matchTableActionTypes from './matchTableActionTypes.js';
function mapStateToProps(state) {
    return {
    	players: state.get('players'),
    	matchResults: state.get('matchResults'),
    };
}


function mapDispatchToEvents(dispatch) {
    return {
    	onClickAddPlayerButton: () => {
    		dispatch(
    			MatchTableActions.addPlayer('a')
    		);
    	}
    };
}

const RootContainer = connect(
    mapStateToProps,
    mapDispatchToEvents
)(MatrchTable);

export default RootContainer;
