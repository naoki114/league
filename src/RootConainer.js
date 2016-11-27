import { connect } from 'react-redux';
import Root from './Root.jsx';

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
