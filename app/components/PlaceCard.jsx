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
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(activeKey) {
		this.setState({ activeKey });
	}
  
render() {
    const {arrayOfPlaces} = this.props;
    let places = arrayOfPlaces.map( (el) => {
       return (
         <Panel eventKey={el.id} key={"key"+el.id}>
                    <Panel.Heading>
                      <Panel.Title> <a className="a" target="_blank" href={el.url}><img src={el.image_url} className="img"></img></a><div className="panel-text">{el.name}<button className="going-btn">You are not going</button></div></Panel.Title>
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
    });
    return (
      <div className="PlaceCardContainer">
           <PanelGroup
            accordion
            id="accordion-controlled-example"
            activeKey={this.state.activeKey}
            onSelect={this.handleSelect}>
                {places}
          </PanelGroup>
      </div>
      );
}
};

module.exports = PlaceCard;