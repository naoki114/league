import React from 'react';
import Immutable from 'immutable';

export default class MatchTable extends React.PureComponent {

	static get propTypes(){
		return {
			players: React.PropTypes.instanceOf(Immutable.Map).isRequired,
			matchResults: React.PropTypes.instanceOf(Immutable.Map).isRequired,
		};
	}
	
	/**
	 * 対戦表のセルを描画
	 * @param matchResult 対戦成績
	 * @param leftPlayerId 左側に表示するポイントのプレイヤーId
	 * @param rightPlayerId 右側に表示するポイントのプレイヤーId
	 */
	renderCell (matchResult, leftPlayerId, rightPlayerId) {
		const leftPlayerPoint = matchResult.getIn([leftPlayerId, 'point']);
		const rightPlayerPoint = matchResult.getIn([rightPlayerId, 'point']);
		const resultString = [leftPlayerPoint, rightPlayerPoint].join('-');
		return (
			<div className="matchResultCell cell" key={rightPlayerId}>
				{resultString}
			</div>  

		);
	}

	/**
	 *　対戦表の行を描画
	 * @param playerId 行に対応するplayerId
	 * @param playerIdList プレイヤーのIdList
	 * @param playerMap プレイヤーの実体のMap
     * @param matchResultMap 対戦成績の実体のMap
	　*/
	renderRow(playerId, playerIdList, playerMap, matchResultMap){
		const matchResultIdMap = playerMap.getIn([playerId, 'matchResultIdMap']);
		const playerName = playerMap.getIn([playerId, 'name']);
		return (
			<div className="row" key={playerId}>
				<div className="playerName cell">
						{playerName}
				</div>
			 	{
			 		playerIdList.map((innerPlayerId) => {
			 			if(innerPlayerId !== playerId) {
				 			const matchResultId = matchResultIdMap.get(innerPlayerId);
				 			console.log(matchResultIdMap.toJS());
				 			console.log(innerPlayerId);
				 			const matchResult = matchResultMap.get(matchResultId);
				 			return this.renderCell(matchResult, playerId, innerPlayerId);
			 			}
			 			return (
			 				<div className="emptyCell cell" key={innerPlayerId}/>
			 			)
			 		})
			 	}
			</div>
		);
	}

	renderButtonGroup() {
		const onClickAddPlayerButton = this.props.onClickAddPlayerButton;
		return (
			<div className="buttonGroup">
				<button
					className="addPlayerButton"
					onClick={() => {
						onClickAddPlayerButton()
					}}
				>
					参加者追加
				</button>
			</div>
		)
	}

	render() {
		const matchResults = this.props.matchResults;
		const players = this.props.players;
		const playerIdList = players.get('idList');
		const playerMap =  players.get('byId');
		const matchResultMap = matchResults.get('byId');
		return (
			<div className="matchTable">
				{
					// 行を生成
					playerIdList.map((playerId) => {
						return this.renderRow(playerId, playerIdList, playerMap, matchResultMap);
					})
				}			
			</div>
		);
	}
}