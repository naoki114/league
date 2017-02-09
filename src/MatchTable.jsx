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
			onChangeTmpPlayerName: React.PropTypes.func.isRequired,
			onChangeLeftPlayerPoint: React.PropTypes.func.isRequired,
			onChangeRightPlayerPoint: React.PropTypes.func.isRequired,
			onClickCalcButton: React.PropTypes.func.isRequired,
			onClickOpenButton: React.PropTypes.func.isRequired,
		};
	}

	componentDidMount(){
			this.props.onMountMatchTable();
	}
	renderButtonGroup(tmpPlayerName, openMenu) {
		const onClickAddPlayerButton = this.props.onClickAddPlayerButton;
		const onChangeTmpPlayerName = this.props.onChangeTmpPlayerName;
		const onClickCalcButton = this.props.onClickCalcButton;
		const inputGroupClassName = classNames({
			inputGroup: true,
			open: openMenu,
		});
		const menuButtonText = openMenu ? '閉' : '開';
		return (
			<div className="buttonGroup">
				<button
					className='menuButton'
					onClick={this.props.onClickOpenButton}
				>
					{menuButtonText}
				</button>
				<div className={inputGroupClassName}>
					<input
						className="playerNameField"
						type="text"
						value={tmpPlayerName}
						placeholder="参加者名を入力"
						onChange={(e)=> {onChangeTmpPlayerName(e.target.value)}}
					/>
					<button
						className="addPlayerButton"
						onClick={onClickAddPlayerButton}
					>
						参加者追加
					</button>
					<button
						className="calcButton"
						onClick={() => {
							onClickCalcButton();
						}}
					>
					計算
					</button>
				</div>
			</div>
		)
	}

	renderHeaderRow(players){
		const playerIdList = players.get('idList');
		const playerMap =  players.get('byId');
		// 行を生成
		return (
			<div className="headerRow">
				<div className="cell emptyCell" />
				{
					playerIdList.map((playerId) => {
						return (
							<div className="headerPlayerName cell" key={playerId}>
								{playerMap.getIn([playerId, 'name'])}
							</div>
						);
					})
				}
				<div className="result cell">勝ち数</div>
				<div className="result cell">勝ち点</div>
				<div className="result cell">順位</div>
			</div>
		);
	}

	renderRows(players, matchResults, totalResults){
		const playerIdList = players.get('idList');
		const playerMap =  players.get('byId');
		const matchResultMap = matchResults.get('byId');
		const totalResultMap = totalResults.get('byId');
		const onChangeLeftPlayerPoint = this.props.onChangeLeftPlayerPoint;
		const onChangeRightPlayerPoint = this.props.onChangeRightPlayerPoint;
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
				{this.renderHeaderRow(players)}
				{this.renderRows(
					players,
					matchResults,
					totalResults
				)}
			</div>
		);
	}
}
