import React from 'react';
import Immutable from 'immutable';
import MatchTableContainer from './MatchTableContainer.js';

export default class Root extends React.PureComponent {
	static get propTypes () {
		return {};
	}

    render(){
        return (
        	<MatchTableContainer />
        );
    }
}
