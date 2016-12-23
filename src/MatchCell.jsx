import React from 'react';
import Immutable from 'immutable';

export default class MatchCell extends React.PureComponent{

	static get propTypes() {
		return {
			matchResultId: React.PropTypes.string.isRequired,
			matchResult: React.PropTypes.instanceOf(Immutable.Map).isRequired,
			leftPlayerId: React.PropTypes.string.isRequired,
			rightPlayerId: React.PropTypes.string.isRequired,
			isOpenEditor: React.PropTypes.bool.isRequired,
			onClickMatchCell: React.PropTypes.func.isRequired,
			onMouseLeaveMatchCell: React.PropTypes.func.isRequired,
		};
	}

	renderEditor(isOepnEditor){
		if(isOepnEditor){
			return (
				<div className="matchEditor">
				</div>
			);
		}
		return null;
	}

	render(){
		const {
			matchResultId,
			matchResult,
			leftPlayerId,
			rightPlayerId,
			isOpenEditor,
			onClickMatchCell,
			onMouseLeaveMatchCell
		} = this.props;
		const leftPlayerPoint = matchResult.getIn([leftPlayerId, 'point']);
		const rightPlayerPoint = matchResult.getIn([rightPlayerId, 'point']);
		const resultString = [leftPlayerPoint, rightPlayerPoint].join('-');
		return (
			<div
				className="matchCell cell"
				key={rightPlayerId}
				onClick={() => {
					onClickMatchCell();
				}}
				onMouseLeave={() => {
					onMouseLeaveMatchCell();
				}}
			>
				{resultString}
				{this.renderEditor(isOpenEditor)}
			</div> 
		);
	}
}