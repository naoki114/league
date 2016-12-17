import { connect } from 'react-redux';
import MatrchTable from './MatchTable.jsx';
//import MatchTableActions from './MatchTableActions.js';
import matchTableActionTypes from './matchTableActionTypes.js';
function mapStateToProps(state) {
    return {
    	players: state.get('players'),
    	matchResults: state.get('matchResults'),
    };
}


function addPlayer(playerName){
	return ({
		type: matchTableActionTypes.ADD_PLAYER,
		playerName,
	});
}
function mapDispatchToEvents(dispatch) {
    return {
    	onClickAddPlayerButton: () => {
    		dispatch(
    			addPlayer('a')
    		);
    	}
    };
}

const RootContainer = connect(
    mapStateToProps,
    mapDispatchToEvents
)(MatrchTable);

export default RootContainer;
