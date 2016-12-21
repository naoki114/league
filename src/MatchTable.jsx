import React from 'react';
import Immutable from 'immutable';

import MatchRow from './MatchRow.jsx';

export default class MatchTable extends React.PureComponent {

	static get propTypes(){
		return {
			players: React.PropTypes.instanceOf(Immutable.Map).isRequired,
			matchResults: React.PropTypes.instanceOf(Immutable.Map).isRequired,
			onClickAddPlayerButton: React.PropTypes.func.isRequired,
		};
	}
	


	renderButtonGroup() {
		const onClickAddPlayerButton = this.props.onClickAddPlayerButton;
		return (
			<div className="buttonGroup">
				<button
					className="addPlayerButton"
					onClick={() => {
						onClickAddPlayerButton()
					}}
				>
					参加者追加
				</button>
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
		const matchResults = this.props.matchResults;
		const players = this.props.players;
		
		return (
			<div className="matchTable">
				{this.renderButtonGroup()}
				{this.renderHeaderRow(players)}
				{this.renderRows(players, matchResults)}			
			</div>
		);
	}
}