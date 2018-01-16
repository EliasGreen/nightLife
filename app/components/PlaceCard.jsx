const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/style_PlaceCard');
const { Grid, Col, Row, ButtonToolbar, Button, PanelGroup, Panel} = require('react-bootstrap');


/* the PlaceCard react component that shows a place to which you can go */
class PlaceCard extends React.Component {
  constructor(props) {
    super(props);
   // variables for Main class
    this.state = {
      activeKey: "1",
      activeBtn: null,
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
		this.props.add_user(name, nickname);
    this.setState({
          ["activeBtn"]: true 
           });
    this.componentWillMount();
    this.forceUpdate();
	}
  /**************************************************/
  handleClickToUnGo(name, nickname) {
		this.props.delete_user(name, nickname);
    this.setState({
          ["activeBtn"]: false 
           });
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
       let pos = state.arr.map(function(e) {return e.place == obj.place && e.nickname == obj.nickname}).indexOf(true); 
       if(pos > -1) {
           btn = <button className="going-btn" onClick={nickname.length > 0 ? () => that.handleClickToUnGo(el.name, nickname)  : () => alert("Please, log in firstly")}>You are going!</button>;
         that.setState({
          ["activeBtn"]: true 
           });
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
                        users!
                        list
                      </Panel.Body>
                    </Panel.Collapse>
               </Panel>
         );
       }
       else {
         btn = <button className="going-btn" onClick={nickname.length > 0 ? () => that.handleClickToGo(el.name, nickname)  : () => alert("Please, log in firstly")}>You are not going!</button>;
         that.setState({
          ["activeBtn"]: false  
           },
    // after state is set => return panel
          () => {});  
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
                        users!
                        list
                      </Panel.Body>
                    </Panel.Collapse>
               </Panel>
         );
       }  
    });
    console.log(places);
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
             {this.state.activeBtn}
                {this.state.places}
          </PanelGroup>
      </div>
      );
}
};

module.exports = PlaceCard;