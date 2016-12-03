import React from 'react';
import dummyMatchResults from './dummyMatchResults';

export default class MatchTable extends React.PureComponent {
	
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
			<div className="matchResultCell">
				{resultString}
			</div>  

		);
	}

	/**
	 *　対戦表の行を描画
	　*/
	renderRow(playerId, playerIdList, playerMap, matchResultMap){
		const playerName = playerMap.getIn([playerId, 'name']);
		const matchResultIdMap = playerMap.getIn([playerId, 'matchResultIdMap']);
		return (
			<div className="row">
			 	{
			 		playerIdList.map((innerPlayerId) => {
			 			if(innerPlayerId !== playerId) {
				 			const matchResultId = matchResultIdMap.get(innerPlayerId);
				 			console.log(matchResultIdMap.toJS());
				 			console.log(innerPlayerId);
				 			const matchResult = matchResultMap.get(matchResultId);
				 			return this.renderCell(matchResult, playerId, innerPlayerId);
			 			}
			 			return null;
			 		})
			 	}
			</div>
		);
	}


	render() {
		const matchResults = dummyMatchResults;
		const players = matchResults.get('players');
		const playerIdList = players.get('idList');
		const playerMap =  players.get('byId');
		const matchResultMap = matchResults.getIn(['matchResults', 'byId']);
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