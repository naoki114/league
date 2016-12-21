import { connect } from 'react-redux';
import MatrchTable from './MatchTable.jsx';
import MatchTableActions from './MatchTableActions.js';
import matchTableActionTypes from './matchTableActionTypes.js';
function mapStateToProps(state) {
    return {
    	players: state.get('players'),
    	matchResults: state.get('matchResults'),
        tmpPlayername: state.get('tmpPlayerName'),
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

const RootContainer = connect(
    mapStateToProps,
    mapDispatchToEvents
)(MatrchTable);

export default RootContainer;
