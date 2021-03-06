import Immutable from 'immutable';
import matchTableActionTypes from './matchTableActionTypes.js';

const initialState = Immutable.fromJS({
    players: {
        maxId: 0,
        idList: [],
        byId: {},
    },
    matchResults: {
        byId: {},
    },
    totalResults: {
        byId: {},
    },
    tmpPlayerName: "",
    openMenu: false,
});

function createEmptyResult(primaryPlayerId, playerIdList){
    let matchResults = {};
    playerIdList.forEach((playerId)=> {
        if(primaryPlayerId !== playerId){
            const newId = primaryPlayerId + '-' + playerId;
            matchResults[newId] = {
                isDoneBattle: false,
            };
            matchResults[newId][primaryPlayerId] = {point:0};
            matchResults[newId][playerId] = {point:0};
        }
    });
    return Immutable.fromJS(matchResults);
}

function addPlayer(state, action){
    const maxId = state.getIn(['players', 'maxId']);
    const idList = state.getIn(['players', 'idList']);
    const newId = maxId + 1;
    const newMatchResults = createEmptyResult(newId, idList);
    const oldMatchResults = state.getIn(['matchResults','byId']);
    return state.withMutations((ctx) => {
        return ctx.setIn(['players','maxId'], newId)
        .setIn(['players', 'idList'], idList.push(newId.toString()))
        .setIn(
            ['players', 'byId', newId.toString()],
            new Immutable.Map({
                name: state.get('tmpPlayerName')
            })
        )
        .setIn(
            state.set('tmpPlayerName', "")
        )
        .setIn(
            ['matchResults', 'byId'], oldMatchResults.mergeDeep(newMatchResults)
        )
    });
}

function deletePlayer(state, playerId) {
    const matchResultById = state.getIn(['matchResults', 'byId']);
    const indexOfPlayerid = state.getIn(['players', 'idList']).indexOf(playerId);
    return state.withMutations((ctx) => {
        ctx.deleteIn(['players', 'byId', playerId])
        .deleteIn(['players', 'idList', indexOfPlayerid])
        .deleteIn(['totalResults', 'byId', playerId]);
        matchResultById.map((matchResult, resultId) => {
            const idList = resultId.split('-');
            if( idList.indexOf(playerId) !== -1 ) {
                ctx.deleteIn(['matchResults', 'byId', resultId]);
            }
            return matchResult;
        });
    });
}

function calcTotalResultPoint(state){
    const players = state.get("players");
    const playerIdList = players.get('idList');
    const matchResultsMap = state.getIn(['matchResults', 'byId']);
    return state.withMutations((ctx) => {
        // 勝ち数計算
        playerIdList.forEach((playerId) => {
            let winCount = 0;
            let loseCount = 0;
            let winPoint = 0;
            let drawCount = 0;
            playerIdList.forEach((anotherPlayerId) => {
                if (playerId !== anotherPlayerId) {
                    let matchResultId = [playerId, anotherPlayerId].join('-');
                    let matchResult = matchResultsMap.get(matchResultId);
                    if(matchResult === undefined) {
                        matchResultId = [anotherPlayerId, playerId].join('-');
                        matchResult = matchResultsMap.get(matchResultId);
                    }
                    if(matchResult.get('isDoneBattle')) {
                        const playerPoint = matchResult.getIn([playerId, 'point']);
                        const anotherPlayerPoint = matchResult.getIn([anotherPlayerId, 'point']);
                        if (playerPoint > anotherPlayerPoint){
                            winCount++;
                        } else if ( playerPoint < anotherPlayerPoint) {
                            loseCount++;
                        } else  if (playerPoint === anotherPlayerPoint){
                            drawCount++;
                        }
                        winPoint += playerPoint;
                        winPoint -= anotherPlayerPoint;
                    }
                }
            });
            const totalResult = new Immutable.Map({winCount, drawCount, loseCount, winPoint, playerId});
            ctx.setIn(['totalResults', 'byId', playerId], totalResult);
        });
    });
}

function calcTotalResultRanking(state) {
    const totalResultsMap = state.getIn(['totalResults', 'byId']);
    const playerPointMap = {};

    // create Map (key=winPoint, value=playerId)
    totalResultsMap.forEach((totalResult) => {
        const playerId = totalResult.get('playerId');
        const winPoint = totalResult.get('winPoint');
        let sameWinPointPlayers = playerPointMap[winPoint];
        if(sameWinPointPlayers === undefined || sameWinPointPlayers === null) {
            playerPointMap[winPoint] = [playerId];
        } else {
            sameWinPointPlayers.push(playerId);
        }

    });
    const ImmutablePlayerPointMap = new Immutable.Map(playerPointMap);

    // sort key of map by winPoint
  let playerPointList = ImmutablePlayerPointMap.keySeq().toArray().sort((a, b) => {
        return Number(a) < Number(b);
    });

    // set rank
    let rankNum = 1;
    return state.withMutations((ctx) => {
        playerPointList.forEach((winPoint) => {
         const samePointPlayers = ImmutablePlayerPointMap.get(winPoint);
         samePointPlayers.forEach((playerId) => {
                 return ctx.setIn(['totalResults', 'byId', playerId, 'rank'], rankNum);
         });
        rankNum ++;
        });
    });

}

function loadTmpState(state) {
    return state.withMutations((ctx) => {
        if(localStorage.getItem("tmp_players") !== null) {
            ctx.set(
                'players' ,
                Immutable.fromJS(
                    JSON.parse(
                        localStorage.getItem("tmp_players")
                    )
                )
            );
        }
        if(localStorage.getItem("tmp_matchResults") !== null) {
            ctx.set(
                'matchResults' ,
                Immutable.fromJS(
                    JSON.parse(
                        localStorage.getItem("tmp_matchResults")
                    )
                )
            );
        }
        if(localStorage.getItem("tmp_totalResults") !== null) {
            ctx.set(
                'totalResults' ,
                Immutable.fromJS(
                    JSON.parse(
                        localStorage.getItem("tmp_totalResults")
                    )
                )
            );
        }
    });
}

export default function matchTableReducer(state = initialState, action) {
    switch (action.type) {
    case matchTableActionTypes.LOAD_TMP_STATE: {
            return loadTmpState(state);
    }
    case matchTableActionTypes.ADD_PLAYER: {
        return addPlayer(state,action);
    }
    case matchTableActionTypes.DELETE_PLAYER: {
        return deletePlayer(state, action.playerId);
    }
    case matchTableActionTypes.CHANGE_TMP_PLAYER_NAME: {
        return state.set('tmpPlayerName', action.playerName);
    }
    case matchTableActionTypes.CHANGE_PLAYER_POINT: {
        return state.withMutations((ctx) => {
            ctx.setIn(
                ['matchResults', 'byId', action.matchResultId, action.playerId, 'point'],
                Number(action.playerPoint)
            ).setIn(
                ['matchResults', 'byId', action.matchResultId, 'isDoneBattle'],
                true
            )
        });

    }
    case matchTableActionTypes.CALC_TOTAL_RESULTS: {
        const resultWithPoint = calcTotalResultPoint(state);
        return calcTotalResultRanking(resultWithPoint);
    }
        case matchTableActionTypes.TOGGLE_OPEN_MENU: {
             const openMenu = state.get('openMenu');
             return state.set('openMenu', !openMenu);
        }
    default:
        return state;
    }
}
