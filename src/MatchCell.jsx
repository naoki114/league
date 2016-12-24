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
			onClickInputButton: React.PropTypes.func.isRequired,
			onClickOkButton: React.PropTypes.func.isRequired,
			onChangeLeftPlayerPoint: React.PropTypes.func.isRequired,
			onChangeRightPlayerPoint: React.PropTypes.func.isRequired,
		};
	}
	renderEditButton(leftPlayerId, rightPlayerId){
		return (
			<button
				className="editButton"
				onClick={() => {
					this.props.onClickInputButton(leftPlayerId, rightPlayerId);
				}}
			>
				入力
			</button>
		)
	}

	renderCell(resultString, leftPlayerId, rightPlayerId){
		return (
			<div className="innerMatchCell">
				<div className="result">{resultString}	</div>
				{this.renderEditButton(leftPlayerId, rightPlayerId)}
			</div>
		);
	}


	renderEditor(
		isOpenEditor,
		matchResultId,
		leftPlayerId,
		leftPlayerPoint,
		rightPlayerId,
		rightPlayerPoint
	){
		if(isOpenEditor){
			return (
				<div className="matchEditor">
					<div className="inputArea">
						<input
							type={"number"}
							min={0}
							value={leftPlayerPoint}
							className="pointInput left"
							onChange={(e)=>{
								this.props.onChangeLeftPlayerPoint(
									matchResultId,
									leftPlayerId,
									e.target.value
								);
							}}
						/>
						-
						<input
							type={"number"}
							min={0}
							value={rightPlayerPoint}
							className="pointInput right"
							onChange={(e)=>{
								this.props.onChangeRightPlayerPoint(
									matchResultId,
									rightPlayerId,
									e.target.value
								);
							}}
						/>
						<button
							className="okButton"
							onClick={() => {this.props.onClickOkButton();}}
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
		return (
			<div
				className="matchCell cell"
				key={rightPlayerId}
			>
				{this.renderCell(resultString, leftPlayerId, rightPlayerId)}
				{this.renderEditor(
					isOpenEditor,
					matchResultId,
					leftPlayerId,
					leftPlayerPoint,
					rightPlayerId,
					rightPlayerPoint
				)}
			</div> 
		);
	}
}