import React from 'react';
import dummyMatchResults from './dummyMatchResults';

export default class MatchTable extends React.PureComponent {
	
	/**
	 *　対戦表の行を描画
	　*/
	renderRow(playerId, playerMap, matchResultList){
		const playerName = playerMap.getIn([playerId, 'name']);
		const matchResultIdMap = playerMap.getIn([playerId, 'matchResultIdMap'])
		const matchResult = matchResultList.get
		return (
			<div className="row">
			 	{matchResultIdMap}
			</div>
		);
	}


	render() {
		const matchResults = dummyMatchResults;
		const players = matchResults.get('players');
		const playerMap =  players.get('byId');
		const matchResultList = matchResults.get('matchResults');
		return (
			<div className="matchTable">
				{
					// 行を生成
					players.get('idList').map((playerId) => {
						return renderRow(playerId, playerMap, matchResultList);
					})
				}			
			</div>
		);
	}
}