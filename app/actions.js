/* actions */

module.exports = {
 
  ADD_USER: 'ADD_USER',
  
  DELETE_USER: 'DELETE_USER',

  add_user: function(place, user) {
    return {
      type: this.ADD_USER,
      place,
      user
    }
  },

  delete_user: function(place, user) {
    return {
      type: this.DELETE_USER,
      place,
      user
    }
  }
  
}
