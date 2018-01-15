/* reducers */

const { ADD_USER, DOWNVOTE } = require('./actions');

function reducers(state = [], action) {
  switch (action.type) {
    case ADD_USER: 
      return Object.assign({}, state, {
        place: action.place,
        users: action.user
      });
    case DOWNVOTE:
      let ret = Object.assign({}, state, {
        voteScore: ( state.voteScore ) ? state.voteScore - 1 : -1,
        voteCount: ( state.voteCount ) ? state.voteCount + 1 : 1
      });
       return ret;
    default:
      return state;
  }
}

module.exports = reducers