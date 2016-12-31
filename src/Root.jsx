import React from 'react';
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
