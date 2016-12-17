import 'babel-polyfill';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider,connect } from 'react-redux';
import configureStore from './configureStore.js';
//import RootContainer from './RootContainer.js';
import Root from './Root.jsx';
import rootReducer from './rootReducer.js';
import logo from './logo.svg';

function mapStateToProps(state) {
    return {};
}
function mapDispatchToEvents(dispatch) {
    return {};
}

const RootContainer = connect(
    mapStateToProps,
    mapDispatchToEvents
)(Root);

export default RootContainer;
import './App.scss';


function main() {
    const store = configureStore(rootReducer);

    ReactDOM.render(
        <Provider store={store}>
            <RootContainer />
        </Provider>
        ,document.getElementById('root')
    )
}

(function iif() {
    const loadedStates = ['complete', 'loaded', 'interactive'];

    if (loadedStates.includes(document.readyState) && document.body) {
        main();
    } else {
        window.addEventListener('DOMContentLoaded', main, false);
    }
}());
