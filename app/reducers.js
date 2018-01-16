/* reducers */

const { ADD_USER, DELETE_USER } = require('./actions');

const initialUserState = {
    arr: []
}

function reducers(state = initialUserState, action) {
  let obj
  switch (action.type) {
    case ADD_USER:
       obj = Object.assign(state, state.arr.push({place: action.place, user: action.user}));
       return obj;
    case DELETE_USER:
      let pos = state.arr.map(function(e) {return e.place == action.place && e.nickname == action.nickname}).indexOf(true);
      state.arr.splice(pos, 1)
       obj = Object.assign(state);
       return obj;
    default:
      return state;
  }
}

module.exports = reducers