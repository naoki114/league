import React from 'react';
import Immutable from 'immutable';

import MatchRow from './MatchRow.jsx';

export default class MatchTable extends React.PureComponent {

	static get propTypes(){
		return {
			players: React.PropTypes.instanceOf(Immutable.Map).isRequired,
			matchResults: React.PropTypes.instanceOf(Immutable.Map).isRequired,
			tmpPlayerName: React.PropTypes.string,
			onClickAddPlayerButton: React.PropTypes.func.isRequired,
			onChangeTmpPlayerName: React.PropTypes.func.isRequired,
		};
	}
	


	renderButtonGroup(tmpPlayerName) {
		const onClickAddPlayerButton = this.props.onClickAddPlayerButton;
		const onChangeTmpPlayerName = this.props.onChangeTmpPlayerName;
		return (
			<div className="buttonGroup">
				<button
					className="addPlayerButton"
					onClick={onClickAddPlayerButton}
				>
					参加者追加
				</button>
				<input
					className="playerNameField"
					type="text"
					value={tmpPlayerName}
					onChange={(e)=> {onChangeTmpPlayerName(e.target.value)}}
				/>
			</div>
		)
	}

	renderHeaderRow(players){
		const playerIdList = players.get('idList');
		const playerMap =  players.get('byId');
		// 行を生成
		return (
			<div className="headerRow">
				<div className="cell emptyCell" />
				{
					playerIdList.map((playerId) => {
						return (
							<div className="HeaderPlayerName cell" key={playerId}>
								{playerMap.getIn([playerId, 'name'])}
							</div>
						);
					})
				}
			</div>
		);
	}

	renderRows(players, matchResults){

		const playerIdList = players.get('idList');
		const playerMap =  players.get('byId');
		const matchResultMap = matchResults.get('byId');
		// 行を生成
		return playerIdList.map((playerId) => {
			return (
				<MatchRow 
					playerId={playerId}
					playerIdList={playerIdList}
					playerMap={playerMap}
					matchResultMap={matchResultMap}
					key={playerId}
				/>
			);
		})
	}

	render() {
		const {
			matchResults,
			players,
			tmpPlayerName
		} = this.props;
		
		return (
			<div className="matchTable">
				{this.renderButtonGroup(tmpPlayerName)}
				{this.renderHeaderRow(players)}
				{this.renderRows(players, matchResults)}			
			</div>
		);
	}
}