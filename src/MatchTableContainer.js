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
        onClickDeletePlayerButton: (playerId) => {
            dispatch(MatchTableActions.deletePlayer(playerId))
        },
        onChangeTmpPlayerName: (playerName) => {
            dispatch(
                MatchTableActions.changeTmpPlayerName(playerName)
            )
        },
        onChangePlayerPoint: (
            matchResultId,
            playerId,
            playerPoint
        ) => {
            dispatch(
                MatchTableActions.changePlayerPoint(
                    matchResultId,
                    playerId,
                    playerPoint
                )
            )
        },
        onClickCalcButton: () => {
            dispatch(MatchTableActions.calcTotalResults())
        },
    };
}

const MatchTableContainer = connect(
    mapStateToProps,
    mapDispatchToEvents
)(MatrchTable);

export default MatchTableContainer;
