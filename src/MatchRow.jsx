import React from 'react';
import Immutable from 'immutable';

/**
 *　対戦表の行を描画
　*/
export default class MatchRow extends React.PureComponent{
	
	static get propTypes(){
		return {
			playerId: React.PropTypes.string.isRequired,
			playerIdList: React.PropTypes.instanceOf(Immutable.List).isRequired,
			playerMap: React.PropTypes.instanceOf(Immutable.Map).isRequired,
			matchResultMap: React.PropTypes.instanceOf(Immutable.Map).isRequired,
		}
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

	
	render() {

		const {
			playerId,
			playerIdList,
			playerMap,
			matchResultMap
		} = this.props;

		const playerName = playerMap.getIn([playerId, 'name']);
		return (
			<div className="row" key={playerId}>
				<div className="playerName cell">
						{playerName}
				</div>
			 	{
			 		playerIdList.map((innerPlayerId) => {
			 			if(innerPlayerId !== playerId) {
			 				let matchResultId = [playerId, innerPlayerId].join('-');
				 			let matchResult = matchResultMap.get(matchResultId);
				 			if(matchResult === undefined) {
				 				matchResultId = [innerPlayerId, playerId].join('-');
				 				matchResult = matchResultMap.get(matchResultId);
				 			}
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
}