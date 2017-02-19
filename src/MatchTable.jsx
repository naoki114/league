import React from 'react';
import Immutable from 'immutable';
import classNames from 'classnames';
import MatchRow from './MatchRow.jsx';

export default class MatchTable extends React.PureComponent {

    static get propTypes(){
        return {
            players: React.PropTypes.instanceOf(Immutable.Map).isRequired,
            matchResults: React.PropTypes.instanceOf(Immutable.Map).isRequired,
            totalResults: React.PropTypes.instanceOf(Immutable.Map).isRequired,
            tmpPlayerName: React.PropTypes.string,
            onMountMatchTable: React.PropTypes.func.isRequired,
            onClickAddPlayerButton: React.PropTypes.func.isRequired,
            onClickDeletePlayerButton: React.PropTypes.func.isRequired,
            onChangeTmpPlayerName: React.PropTypes.func.isRequired,
            onChangeLeftPlayerPoint: React.PropTypes.func.isRequired,
            onChangeRightPlayerPoint: React.PropTypes.func.isRequired,
            onClickCalcButton: React.PropTypes.func.isRequired,
        };
    }

    componentDidMount(){
            this.props.onMountMatchTable();
    }
    renderButtonGroup(tmpPlayerName) {
        const onClickAddPlayerButton = this.props.onClickAddPlayerButton;
        const onChangeTmpPlayerName = this.props.onChangeTmpPlayerName;
        const onClickCalcButton = this.props.onClickCalcButton;
        const inputGroupClassName = classNames({
            inputGroup: true,
        });
        return (
            <div className="buttonGroup">
                <div className="innerGroup">
                    <div className={inputGroupClassName}>
                        <input
                            className="playerNameField"
                            type="text"
                            value={tmpPlayerName}
                            placeholder="参加者名を入力"
                            onChange={(e)=> {onChangeTmpPlayerName(e.target.value)}}
                            />
                        <div
                            className="addPlayerButton"
                            onClick={onClickAddPlayerButton}
                            >
                            参加者追加
                        </div>
                        <div
                            className="calcButton"
                            onClick={() => {
                                onClickCalcButton();
                            }}
                            >
                            計算
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderHeaderRow(players){
        const playerIdList = players.get('idList');
        const playerMap =  players.get('byId');
        // 行を生成
        return (
            <thead className="headerRow">
                <tr>
                    <th className="cell emptyCell" />
                    {
                        playerIdList.map((playerId) => {
                            return (
                                <th className="headerPlayerName cell" key={playerId}>
                                    {playerMap.getIn([playerId, 'name'])}
                                </th>
                            );
                        })
                    }
                    <th className="result cell">勝ち数</th>
                    <th className="result cell">勝ち点</th>
                    <th className="result cell">順位</th>
                </tr>
            </thead>
        );
    }

    renderRows(players, matchResults, totalResults){
        const playerIdList = players.get('idList');
        const playerMap =  players.get('byId');
        const matchResultMap = matchResults.get('byId');
        const totalResultMap = totalResults.get('byId');
        const {
            onChangeLeftPlayerPoint,
            onChangeRightPlayerPoint,
            onClickDeletePlayerButton,
        } = this.props;
        // 行を生成
        return playerIdList.map((playerId) => {
            const totalResult = totalResultMap.get(playerId);
            return (
                <MatchRow
                    playerId={playerId}
                    playerIdList={playerIdList}
                    playerMap={playerMap}
                    matchResultMap={matchResultMap}
                    totalResult={totalResult}
                    key={playerId}
                    onClickDeletePlayerButton={onClickDeletePlayerButton}
                    onChangeLeftPlayerPoint={onChangeLeftPlayerPoint}
                    onChangeRightPlayerPoint={onChangeRightPlayerPoint}
                />
            );
        })
    }

    render() {
        const {
            matchResults,
            totalResults,
            players,
            tmpPlayerName,
            openMenu,
        } = this.props;
        return (
            <div className="matchTable">
                {this.renderButtonGroup(tmpPlayerName, openMenu)}
                <table>
                    {this.renderHeaderRow(players)}
                    <tbody>
                        {this.renderRows(
                            players,
                            matchResults,
                            totalResults
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
