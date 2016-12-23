import React from 'react';
import Immutable from 'immutable';
import MatchCellContainer from './MatchCellContainer.js';

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
			onChangeLeftPlayerPoint: React.PropTypes.func.isRequired,
			onChangeRightPlayerPoint: React.PropTypes.func.isRequired,
		};
	}
	
	/**
	 * 対戦表のセルを描画
	 * @param matchResult 対戦成績
	 * @param leftPlayerId 左側に表示するポイントのプレイヤーId
	 * @param rightPlayerId 右側に表示するポイントのプレイヤーId
	 */
	renderCell (matchResultId, matchResult, leftPlayerId, rightPlayerId) {
		const onChangeLeftPlayerPoint = this.props.onChangeLeftPlayerPoint;
		const onChangeRightPlayerPoint = this.props.onChangeRightPlayerPoint;
		return (
			<MatchCellContainer
				matchResultId={matchResultId}
				matchResult={matchResult}
				leftPlayerId={leftPlayerId}
				rightPlayerId={rightPlayerId}
				onChangeLeftPlayerPoint={onChangeLeftPlayerPoint}
				onChangeRightPlayerPoint={onChangeRightPlayerPoint}
			/>
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
				 			return this.renderCell(matchResultId, matchResult, playerId, innerPlayerId);
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