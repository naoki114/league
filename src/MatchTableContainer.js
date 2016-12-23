import { connect } from 'react-redux';
import MatrchTable from './MatchTable.jsx';
import MatchTableActions from './MatchTableActions.js';
function mapStateToProps(state) {
    return {
    	players: state.matchTable.get('players'),
    	matchResults: state.matchTable.get('matchResults'),
        tmpPlayername: state.matchTable.get('tmpPlayerName'),
    };
}

function mapDispatchToEvents(dispatch) {
    return {
    	onClickAddPlayerButton: () => {
    		dispatch(
    			MatchTableActions.addPlayer()
    		);
    	},
        onChangeTmpPlayerName: (playerName) => {
            dispatch(
                MatchTableActions.changeTmpPlayerName(playerName)  
            )
        }
    };
}

const MatchTableContainer = connect(
    mapStateToProps,
    mapDispatchToEvents
)(MatrchTable);

export default MatchTableContainer;
