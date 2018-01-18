const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/style_PlaceCard');
const {Grid, Col, Row, ButtonToolbar, Button, PanelGroup, Panel} = require('react-bootstrap');


/* the PlaceCard react component that shows a place to which you can go */
class PlaceCard extends React.Component {
  constructor(props) {
    super(props);
   // variables for Main class
    this.state = {
      activeKey: "1",
      places: null
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClickToGo = this.handleClickToGo.bind(this);
    this.handleClickToUnGo = this.handleClickToUnGo.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }
  /**************************************************/
  /**********         Handlers         **************/
  /**************************************************/
  handleSelect(activeKey) {
		this.setState({ activeKey });
	}
  /**************************************************/
  handleClickToGo(name, nickname) {
    console.log("GO");
    console.log("NAME/PLACE : "+name);
    console.log("NICKNAME : "+nickname);
		this.props.add_user(name, nickname);
    this.componentWillMount();
    this.forceUpdate();
	}
  /**************************************************/
  handleClickToUnGo(name, nickname) {
    console.log("UNGO");
    console.log("NAME/PLACE : "+name);
    console.log("NICKNAME : "+nickname);
		this.props.delete_user(name, nickname);
    this.componentWillMount();
    this.forceUpdate();
	}
  /**************************************************/
  componentWillReceiveProps(nextprops) {
    this.componentWillMount();
    this.forceUpdate();
  }
  /**************************************************/
  // set the Place state
  /**************************************************/
  componentWillMount() {
    // console.log("Will mount");
    let that = this;
    const {arrayOfPlaces, add_user, nickname, state} = this.props;
    const {activeBtn} = this.state;
    let btn = null;
     let places = arrayOfPlaces.map( (el, index) => {
       let obj = {place: el.name, user: nickname};
       // check if current user going to a place
       let pos = state.arr.map(function(e) {return e.place == obj.place && e.user == obj.user}).indexOf(true);
       // array of users of the current place
       /***/
       let place_users_to_loop = state.arr.map(function(e){if(e.place == obj.place) return e});
       let place_users = [];
       //console.log(place_users);
       for(let i = 0; i < place_users_to_loop.length; i++) {
         if(place_users_to_loop[i] !== undefined) place_users.push(place_users_to_loop[i]["user"]);
       }
       if(place_users.length == 0) place_users.push("No one is going now. Be the first!");
       //console.log(place_users);
       /***/
       if(pos > -1) {
         //console.log(obj);
         //console.log(pos);
           btn = <button className="going-btn" onClick={nickname.length > 0 ? () => that.handleClickToUnGo(el.name, nickname)  : () => alert("Please, log in firstly")}>You are going!</button>;
         // console.log(activeBtn);
         return (
         <Panel eventKey={el.id} key={"key"+el.id}>
                    <Panel.Heading>
                      <Panel.Title> 
                          <a className="a" target="_blank" href={el.url}>
                            <img src={el.image_url} className="img"></img>
                          </a>
                          <div className="panel-text">{el.name}
                            {btn}    
                          </div>
                      </Panel.Title>
                      <Panel.Toggle>going btn with label</Panel.Toggle>
                    </Panel.Heading>
                    <Panel.Collapse>
                      <Panel.Body>
                        {place_users}
                      </Panel.Body>
                    </Panel.Collapse>
               </Panel>
         );
       }
       else {
         btn = <button className="going-btn" onClick={nickname.length > 0 ? () => that.handleClickToGo(el.name, nickname)  : () => alert("Please, log in firstly")}>You are not going!</button>;
         return (
         <Panel eventKey={el.id} key={"key"+el.id}>
                    <Panel.Heading>
                      <Panel.Title> 
                          <a className="a" target="_blank" href={el.url}>
                            <img src={el.image_url} className="img"></img>
                          </a>
                          <div className="panel-text">{el.name}
                            {btn}    
                          </div>
                      </Panel.Title>
                      <Panel.Toggle>going btn with label</Panel.Toggle>
                    </Panel.Heading>
                    <Panel.Collapse>
                      <Panel.Body>
                        {place_users}
                      </Panel.Body>
                    </Panel.Collapse>
               </Panel>
         );
       }  
    });
    //console.log(places);
    this.setState({
      ["places"]: places
    });
  }
  
render() {
  // console.log("render!");
    return (
      <div className="PlaceCardContainer">
           <PanelGroup
            accordion
            id="accordion-controlled-example"
            activeKey={this.state.activeKey}
            onSelect={this.handleSelect}>
                {this.state.places}
          </PanelGroup>
      </div>
      );
}
};

module.exports = PlaceCard;