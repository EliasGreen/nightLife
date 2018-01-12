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
    return (
      <div className="PlaceCardContainer">
           <PanelGroup
            accordion
            id="accordion-controlled-example"
            activeKey={this.state.activeKey}
            onSelect={this.handleSelect}>
                <Panel eventKey="1">
                    <Panel.Heading>
                      <Panel.Title> <a className="a" target="_blank" href="https://www.yelp.com/biz/marine-corps-recruit-depot-san-diego-san-diego?adjust_creative=i-RvClzJyuA3s2tNR1b4YA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=i-RvClzJyuA3s2tNR1b4YA"><img src="https://s3-media2.fl.yelpcdn.com/bphoto/W6zef4xkLlac1AenWzEzdA/o.jpg" className="img"></img></a><div className="panel-text">Name go</div></Panel.Title>
                      <Panel.Toggle>going btn with label</Panel.Toggle>
                    </Panel.Heading>
                    <Panel.Collapse>
                      <Panel.Body>
                        users!
                        list
                      </Panel.Body>
                    </Panel.Collapse>
               </Panel>
                <Panel eventKey="2">
                    <Panel.Heading>
                      <Panel.Title>img + name + going btn with label</Panel.Title>
                      <Panel.Toggle>going btn with label</Panel.Toggle>
                    </Panel.Heading>
                    <Panel.Collapse>
                      <Panel.Body>
                        users!
                      </Panel.Body>
                    </Panel.Collapse>
               </Panel>
             <Panel eventKey="3">
                    <Panel.Heading>
                      <Panel.Title> FIRST img + name + going btn with label</Panel.Title>
                      <Panel.Toggle>going btn with label</Panel.Toggle>
                    </Panel.Heading>
                    <Panel.Collapse>
                      <Panel.Body>
                        users!
                        list
                      </Panel.Body>
                    </Panel.Collapse>
               </Panel>
             <Panel eventKey="4">
                    <Panel.Heading>
                      <Panel.Title> FIRST img + name + going btn with label</Panel.Title>
                      <Panel.Toggle>going btn with label</Panel.Toggle>
                    </Panel.Heading>
                    <Panel.Collapse>
                      <Panel.Body>
                        users!
                        list
                      </Panel.Body>
                    </Panel.Collapse>
               </Panel>
             <Panel eventKey="5">
                    <Panel.Heading>
                      <Panel.Title> FIRST img + name + going btn with label</Panel.Title>
                      <Panel.Toggle>going btn with label</Panel.Toggle>
                    </Panel.Heading>
                    <Panel.Collapse>
                      <Panel.Body>
                        users!
                        list
                      </Panel.Body>
                    </Panel.Collapse>
               </Panel>
             <Panel eventKey="6">
                    <Panel.Heading>
                      <Panel.Title> FIRST img + name + going btn with label</Panel.Title>
                      <Panel.Toggle>going btn with label</Panel.Toggle>
                    </Panel.Heading>
                    <Panel.Collapse>
                      <Panel.Body>
                        users!
                        list
                      </Panel.Body>
                    </Panel.Collapse>
               </Panel>
          </PanelGroup>
      </div>
      );
}
};

module.exports = PlaceCard;