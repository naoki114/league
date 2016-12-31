import matchTableActionTypes from '../matchTableActionTypes.js';

const localStorageMiddleware = store => next => action => {
    const result = next(action);

    switch(action.type) {
    case matchTableActionTypes.CHANGE_RIGHT_PLAYER_POINT:
    case matchTableActionTypes.CHANGE_LEFT_PLAYER_POINT:
    case matchTableActionTypes.CALC_TOTAL_RESULTS:
    case matchTableActionTypes.ADD_PLAYER:
      localStorage.setItem(
          "tmp",
          JSON.stringify(
              store.getState().matchTable.toJSON()
          )
      );
    default:
      return result;
    }
};

export default localStorageMiddleware;
