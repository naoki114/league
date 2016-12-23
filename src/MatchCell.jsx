import React from 'react';
import Immutable from 'immutable';

export default class MatchCell extends React.PureComponent{

	static get propTypes() {
		return {
			matchResultId: React.PropTypes.string.isRequired,
			matchResult: React.PropTypes.instanceOf(Immutable.Map).isRequired,
			leftPlayerId: React.PropTypes.string.isRequired,
			rightPlayerId: React.PropTypes.string.isRequired,
			onClickMatchCell: React.PropTypes.func.isRequired,
		};
	}

	render(){
		const {
			matchResultId,
			matchResult,
			leftPlayerId,
			rightPlayerId,
			onClickMatchCell
		} = this.props;
		const leftPlayerPoint = matchResult.getIn([leftPlayerId, 'point']);
		const rightPlayerPoint = matchResult.getIn([rightPlayerId, 'point']);
		const resultString = [leftPlayerPoint, rightPlayerPoint].join('-');
		return (
			<div
				className="matchCell cell"
				key={rightPlayerId}
				onClick={() => {
					onClickMatchCell(matchResultId);
				}}
			>
				{resultString}
			</div>  
		);
	}
}