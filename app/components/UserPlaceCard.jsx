const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/style_UserPlaceCard');
const { Grid, Col, Row, ButtonToolbar, Button, PanelGroup, Panel} = require('react-bootstrap');


/* the UserPlaceCard react component that shows user places */
class UserPlaceCard extends React.Component {
  constructor(props) {
    super(props);
   // variables for Main class
    this.state = {
      main_state: this.props.state.arr,
      nickname: this.props.nickname,
      activeKey: "1",
      places: null
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClickToUnGo = this.handleClickToUnGo.bind(this);
  }
  /**************************************************/
  /**********         Handlers         **************/
  /**************************************************/
  handleSelect(activeKey) {
		this.setState({ activeKey });
	}
  /**************************************************/
  handleClickToUnGo(name, nickname) {
		this.props.delete_user(name, nickname);
	}
  /**************************************************/
   componentWillReceiveProps(nextprops) {
    this.setState({
          ["main_state"]: nextprops.state.arr
           });
  }

    render() {
      // deconstructing
      const {main_state, nickname} = this.state
      const that = this;
      // prepare data for rendering:
      // if user havs no chosen places => set special "warning"
      let places;
      if(main_state.length == 0) {
         places = <Panel eventKey={"zero"} key={"key"+"zero"}>
                      <Panel.Heading>
                        <Panel.Title> 
                            <a className="a-user" target="_blank">
                              You have not any chosen places
                            </a>
                            <div className="panel-text-user">
                              <button className="going-btn-user">lets search to choose one!</button>    
                            </div>
                        </Panel.Title>
                      </Panel.Heading>
                 </Panel>;
      }
      else {
        let user_places = [];
        for(let i = 0; i < main_state.length; i++) {
          if(main_state[i]["user"] == nickname) user_places.push(main_state[i]["place"]);
        }
        if(user_places.length == 0) {
          places = <Panel eventKey={"zero"} key={"key"+"zero"}>
                      <Panel.Heading>
                        <Panel.Title> 
                            <a className="a-user" target="_blank">
                              You have not any chosen places
                            </a>
                            <div className="panel-text-user">
                              <button className="going-btn-user">lets search to choose one!</button>    
                            </div>
                        </Panel.Title>
                      </Panel.Heading>
                 </Panel>;
        }
        else {
              places = user_places.map((e, index) => {
                // get other users who is going to this place too
                let other_users = [];
                for(let i = 0; i < main_state.length; i++) {
                   if(main_state[i]["place"] == e && main_state[i]["user"] != nickname) other_users.push(main_state[i]["user"]);
                }
                if(other_users.length == 0) other_users = ["Now only you is going to this place"];
                return (
                   <Panel eventKey={index} key={"key"+index}>
                            <Panel.Heading>
                              <Panel.Title> 
                                  <a className="a-user" target="_blank">
                                    {e}
                                  </a>
                                <div className="panel-text-user">
                                  <button className="going-btn-user" onClick={() => that.handleClickToUnGo(e, nickname)}>Cancel</button>    
                                </div>
                            </Panel.Title>
                            <Panel.Toggle className="a-toggle-user">Also are going</Panel.Toggle>
                          </Panel.Heading>
                          <Panel.Collapse>
                            <Panel.Body>
                              {other_users.map((e) => <div>{e}</div>)}
                            </Panel.Body>
                          </Panel.Collapse>
                     </Panel>
                 );
             });
        }
      }
        return (
           <div className="UserPlaceCardContainer">
               <PanelGroup
                accordion
                id="accordion-controlled"
                activeKey={this.state.activeKey}
                onSelect={this.handleSelect}>
                    {places}
               </PanelGroup>
           </div> 
          );
    }
};

module.exports = UserPlaceCard;