/* actions */

module.exports = {
 
  ADD_USER: 'ADD_USER',
  
  DOWNVOTE: 'DOWNVOTE',

  add_user: function(place, user) {
    return {
      type: this.ADD_USER,
      place,
      user
    }
  },

  downvote: function() {
    return {
      type: this.DOWNVOTE
    }
  }
  
}
