import React from 'react';
import Immutable from 'immutable';

export default class MatchCell extends React.PureComponent{

	static get propTypes() {
		return {
			matchResultId: React.PropTypes.string.isRequired,
			matchResult: React.PropTypes.instanceOf(Immutable.Map).isRequired,
			leftPlayerId: React.PropTypes.string.isRequired,
			rightPlayerId: React.PropTypes.string.isRequired,
			editingLeftPlayerId: React.PropTypes.string,
			editingRightPlayerId: React.PropTypes.string,
			onClickMatchCell: React.PropTypes.func.isRequired,
			onMouseLeaveMatchCell: React.PropTypes.func.isRequired,
		};
	}
	renderEditButton(leftPlayerId, rightPlayerId){
		return (
			<button
				className="editButton"
				onClick={() => {
					this.props.onClickMatchCell(leftPlayerId, rightPlayerId);
				}}
			>
				入力
			</button>
		)
	}
	renderEditor(isOpenEditor){
		if(isOpenEditor){
			return (
				<div className="matchEditor">
					<div className="inputArea">
						<input
							type={"number"}
							min={0}
							className="pointInput left"
						/>
						-
						<input
							type={"number"}
							min={0}
							className="pointInput right"
						/>
						<button
							className="okButton"
							onClick={() => {this.props.onMouseLeaveMatchCell();}}
						>
							OK
						</button>
					</div>
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
			editingLeftPlayerId,
			editingRightPlayerId,
			onClickMatchCell,
			onMouseLeaveMatchCell
		} = this.props;
		const leftPlayerPoint = matchResult.getIn([leftPlayerId, 'point']);
		const rightPlayerPoint = matchResult.getIn([rightPlayerId, 'point']);
		const resultString = [leftPlayerPoint, rightPlayerPoint].join('-');
		const isOpenEditor =
			(editingLeftPlayerId === leftPlayerId)
			&& (editingRightPlayerId === rightPlayerId);
		console.log(editingLeftPlayerId, editingRightPlayerId, isOpenEditor);
		return (
			<div
				className="matchCell cell"
				key={rightPlayerId}
			>
				{resultString}
				{this.renderEditButton(leftPlayerId, rightPlayerId)}
				{this.renderEditor(isOpenEditor)}
			</div> 
		);
	}
}