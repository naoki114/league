import { connect } from 'react-redux';
import MatrchTable from './MatchTable.jsx';
import MatchTableActions from './MatchTableActions.js';
function mapStateToProps(state) {
    return {
    	players: state.matchTable.get('players'),
    	matchResults: state.matchTable.get('matchResults'),
      totalResults: state.matchTable.get('totalResults'),
      tmpPlayerName: state.matchTable.get('tmpPlayerName'),
      openMenu: state.matchTable.get('openMenu'),
    };
}

function mapDispatchToEvents(dispatch) {
    return {
      onMountMatchTable: () => {
        dispatch(MatchTableActions.loadTmpState());
      },
    	onClickAddPlayerButton: () => {
    		dispatch(
    			MatchTableActions.addPlayer()
    		);
            dispatch(
                MatchTableActions.changeTmpPlayerName("") 
            )
    	},
        onChangeTmpPlayerName: (playerName) => {
            dispatch(
                MatchTableActions.changeTmpPlayerName(playerName)  
            )
        },
        onChangeLeftPlayerPoint: (
            matchResultId,
            leftPlayerId,
            leftPlayerPoint
        ) => {
            dispatch(
                MatchTableActions.changeLeftPlayerPoint(
                    matchResultId,
                    leftPlayerId,
                    leftPlayerPoint
                )
            )
        },
        onChangeRightPlayerPoint: (
            matchResultId,
            rightPlayerId,
            rightPlayerPoint
        ) => {
            dispatch(
                MatchTableActions.changeRightPlayerPoint(
                    matchResultId,
                    rightPlayerId,
                    rightPlayerPoint
                )
            )
        },
        onClickCalcButton: () => {
            dispatch(MatchTableActions.calcTotalResults())
        }
    };
}

const MatchTableContainer = connect(
    mapStateToProps,
    mapDispatchToEvents
)(MatrchTable);

export default MatchTableContainer;
