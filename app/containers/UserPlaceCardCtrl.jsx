const { connect } = require('react-redux');
const actions = require('../actions');
const UserPlaceCard = require('../components/UserPlaceCard');
/**************************************************/
/**************************************************/
/*              PlaceCard Controller              */
/**************************************************/
/**************************************************/
const mapStateToProps = function(state) {
  //UserPlaceCard.forceUpdate();
  return {
    state
    //: state.arr
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    add_user: function(place, user) {
      dispatch(actions.add_user(place, user))
    },
    delete_user: function(place, user) {
      dispatch(actions.delete_user(place, user))
    }
  }
}

const UserPlaceCardCtrl = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPlaceCard);

module.exports = UserPlaceCardCtrl;