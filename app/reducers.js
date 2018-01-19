/* reducers */

const { ADD_USER, DELETE_USER } = require('./actions');

const initialUserState = {
    arr: []
}

function reducers(state = initialUserState, action) {
  let obj;
  let xhr;
  let body;
  switch (action.type) {
    case ADD_USER:
      // request
      xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/add-place', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      
      body = 'name=' + encodeURIComponent(action.place) +
          '&user=' + encodeURIComponent(action.user);


      xhr.send(body);

      xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (this.status != 200) {
              alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
              return;
            }
        }
        /**********/
       obj = Object.assign({}, state, state.arr.push({place: action.place, user: action.user}));
       return obj;
    case DELETE_USER:
       // request
      xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/delete-place', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      
      body = 'name=' + encodeURIComponent(action.place) +
          '&user=' + encodeURIComponent(action.user);


      xhr.send(body);

      xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (this.status != 200) {
              alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
              return;
            }
        }
        /**********/
       let pos = state.arr.map(function(e) {return e.place == action.place && e.user == action.user}).indexOf(true);
       state.arr.splice(pos, 1)
       obj = Object.assign({}, state);
       return obj;
    default:
      return state;
  }
}

module.exports = reducers