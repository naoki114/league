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
            onChangePlayerPoint: React.PropTypes.func.isRequired,
        };
    }

    renderCell(resultString, leftPlayerId, rightPlayerId, isDoneBattle){
        const matchResultString = isDoneBattle ? resultString : '未対戦';
        return (
            <div className="innerMatchCell"
                onClick={() => {
                    this.props.onClickInputButton(leftPlayerId, rightPlayerId);
                }}
            >
                <div className="result">{matchResultString}</div>
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
                                this.props.onChangePlayerPoint(
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
                                this.props.onChangePlayerPoint(
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
        const isDoneBattle = matchResult.get('isDoneBattle');
        const resultString = [leftPlayerPoint, rightPlayerPoint].join('-');
        const isOpenEditor =
            (editingLeftPlayerId === leftPlayerId)
            && (editingRightPlayerId === rightPlayerId);
        return (
            <td
                className="matchCell cell"
                key={rightPlayerId}
            >
                {this.renderCell(resultString, leftPlayerId, rightPlayerId, isDoneBattle)}
                {this.renderEditor(
                    isOpenEditor,
                    matchResultId,
                    leftPlayerId,
                    leftPlayerPoint,
                    rightPlayerId,
                    rightPlayerPoint
                )}
            </td>
        );
    }
}
