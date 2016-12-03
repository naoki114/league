import React from 'react';
import Immutable from 'immutable';
import MatchTable from './MatchTable.jsx';

export default class Root extends React.PureComponent {
	static get propTypes () {
		return {
			matchResults: React.PropTypes.instanceOf(Immutable.Map).isRequired,
		}
	}
    componentDidMount() {}

    render(){
    	const matchResults = this.props.matchResults;
        return (
        	<MatchTable matchResults={matchResults} />
        );
    }
}
