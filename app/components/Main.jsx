
const React = require('react');
const { connect } = require('react-redux');
const Link = require('react-router-dom').Link
const style = require('../styles/style_Main');
const { Grid, Col, Row, ButtonToolbar, Button} = require('react-bootstrap');
const PlaceCardCtrl = require('../containers/PlaceCardCtrl');
const UserPlaceCardCtrl = require('../containers/UserPlaceCardCtrl');


/* the main page for the index route of this app */
class Main extends React.Component {
  constructor(props) {
    super(props);
   // variables for Main class
    this.state = {
      email: "",
      password: "",
      nickname: "",
      userPlacesLabel: <div className="user-places-label">Please, log in to see your chosen places</div>,
      label_sign_up: "Sign UP",
      label_log_in: "Log IN",
      // button-bar
      button_bar: "",
      search_string: "",
      places_bar:  <div>
                       <div className="quote-body"> “It was the kind of bar where everybody knew your name, as long as your name was ‘Motherfucker’.” </div>
                       <div className="quote-author"> ― John Connolly, A Time of Torment </div>
                    </div>
    };
     this.handleClickSignUp = this.handleClickSignUp.bind(this);
     this.handleClickLogIn = this.handleClickLogIn.bind(this);
     this.handleClickLogOut = this.handleClickLogOut.bind(this);
     this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
     this.handleLogInSubmit = this.handleLogInSubmit.bind(this);
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSearchClick = this.handleSearchClick.bind(this);
  }
    /**************************/
    /* Handling InputChange */
    /**************************/
     handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
      });
    } 
  /**************************/
  /* Handling Button Clicks */
  /**************************/
  handleClickSignUp(event) {
     const modal = document.getElementById('myModalSignUp');
        const span = document.getElementsByClassName("closeSignUp")[0];
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
  }
  /**************************/
  handleClickLogIn(event) {
     const modal = document.getElementById('myModalLogIn');
        const span = document.getElementsByClassName("closeLogIn")[0];
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
  }
  /**************************/
  handleClickLogOut(event) {
     const modal = document.getElementById('myModalLogOut');
        const span = document.getElementsByClassName("closeLogOut")[0];
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
  }
  /**************************/
  handleSearchClick(event) {
      // start "loader"
       this.setState({
            ["places_bar"]: <div className="loader"></div>
             }); 
    
      let that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/send-data-to-search', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      
      let body = 'search_string=' + encodeURIComponent(this.state.search_string);


      xhr.send(body);

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        that.setState({
          ["places_bar"]: "loading..."
           });
        that.setState({
          ["places_bar"]: <PlaceCardCtrl arrayOfPlaces={response.arr.businesses} nickname={response.nickname}/>
           });
        }
    event.preventDefault();
  }
  /**************************/
       /* SIGN UP submit */
  /**************************/ 
  handleSignUpSubmit(event) {
    if(this.state.nickname.length > 10) {
      this.setState({
          ["label_sign_up"]: "Nickname length must be less than 11"
           });
    }
    else {
      let that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/sign-up', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      
      let body = 'email=' + encodeURIComponent(this.state.email) +
      '&password=' + encodeURIComponent(this.state.password) +
      '&nickname=' + encodeURIComponent(this.state.nickname);


      xhr.send(body);

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        if(response.error == 0) {
        window.location = "/";
           that.setState({
          ["label_sign_up"]: "Succsess"
           });
        }
        else {
          that.setState({
          ["label_sign_up"]: "This email is already used"
           });
         }
        }
    }
     event.preventDefault();
  }
  /**************************/
       /* LOGIN submit */
  /**************************/ 
  handleLogInSubmit(event) {
      let that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/log-in', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      
      let body = 'email=' + encodeURIComponent(this.state.email) +
      '&password=' + encodeURIComponent(this.state.password);


      xhr.send(body);

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        if(response.error == 0) {
        window.location = "/";
           that.setState({
          ["label_log_in"]: "Succsess"
           });
        }
        else {
          that.setState({
          ["label_log_in"]: "Wrong email and/or password"
           });
         }
        }
      event.preventDefault();
     }
  /**************************/
  /* Check if user loged in */
  /**************************/ 
    componentWillMount() {
    const that = this;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/islogedin', true);

    xhr.send();

    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      if (this.status != 200) {
        alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
        return;
      }
      let isLogedIn = JSON.parse(this.responseText).isLogedIn;
      let nickname = JSON.parse(this.responseText).nickname;      let search_string = JSON.parse(this.responseText).search_string;
      let button_bar;
      let userPlacesLabel;
      if(isLogedIn) {
       button_bar = <ButtonToolbar className="buttonToolbar">
                        <h3 className="user-places" style={{marginBottom: "20px"}}>Hello {nickname}</h3>
                        {/* Show modal for confirmation to log out */}
                        <button className="btn-group-main" onClick={that.handleClickLogOut}>Log /Out/</button>
                    </ButtonToolbar>;
        userPlacesLabel = <UserPlaceCardCtrl nickname={nickname}/>;
      }
      else {
        button_bar = <ButtonToolbar className="buttonToolbar">
                    {/* Show modal for registration new user */}
                    <button className="btn-group-main" onClick={that.handleClickSignUp}>Sign /Up/</button>
                    <div className="line-or">-------- |OR| --------</div>
                    {/* Show modal for login a user */}
                    <button className="btn-group-main" onClick={that.handleClickLogIn}>Login /In/</button>
                  </ButtonToolbar>;
        userPlacesLabel = <div className="user-places-label">Please, log in to see your chosen places</div>;
      }
      that.setState({
          ["button_bar"]: button_bar,
          ["search_string"]: search_string,
          ["userPlacesLabel"]: userPlacesLabel
      });
    }
  }
render() {
    return (
      <Grid className="grid">
      <Row className="show-grid">
        <Col xs={12} md={8} className="coll8md">
          <form className="form-search">
            <input type="text" name="search_string" placeholder="Type location to search..." className="search-input" autoComplete="off" onChange={this.handleInputChange} value={this.state.search_string}/>
            <button className="search-btn" onClick={this.handleSearchClick}><img className="search-icon" src="https://png.icons8.com/metro/50/000000/search.png"/></button>
          </form>
          {this.state.places_bar}
        </Col>
        {/* collumn for ButtonToolBar (sign up, log in, log out) and for User Bars (bars that user want to visit tonight) */}
        <Col xs={6} md={4} className="coll4md">
          {this.state.button_bar}
          <h3 className="user-places">Your chosen places</h3>
          {this.state.userPlacesLabel}
        </Col>
      </Row>
        { /* modal for REGISTRATION */ }
        <div id="myModalSignUp" className="modal">
              <div className="modal-content">
                <span className="closeSignUp">&times;</span>
                   <form method="post" action="/sign-up" name="registration" onSubmit={this.handleSignUpSubmit}> 
                     <h2 className="sign-up-label">{this.state.label_sign_up}</h2>
                     <label className="form-label"><b>NickName</b></label>
                      <input type="text" placeholder="Enter NickName" name="nickname" required  onChange={this.handleInputChange} className="form-components"/>

                      <label className="form-label"><b>Email</b></label>
                      <input type="email" placeholder="Enter Email" name="email" required  onChange={this.handleInputChange} className="form-components"/>

                      <label className="form-label"><b>Password</b></label>
                      <input type="password" placeholder="Enter Password" name="password" required  onChange={this.handleInputChange} className="form-components"/>

                  <div className="clearfix">
                    <button type="submit" className="sign-up-btn form-components">Sign Up</button>
                  </div>
                 </form>
                </div>
            </div>
 
        { /* modal for LOG IN */ }
        <div id="myModalLogIn" className="modal">
                         <div className="modal-content">
                      <span className="closeLogIn">&times;</span>
                         <form method="post" action="/log-in" name="login" onSubmit={this.handleLogInSubmit}> 
                           <h2 className="sign-up-label">{this.state.label_log_in}</h2>

                            <label className="form-label"><b>Email</b></label>
                            <input type="email" placeholder="Enter Email" name="email" required  onChange={this.handleInputChange} className="form-components"/>

                            <label className="form-label"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="password" required  onChange={this.handleInputChange} className="form-components"/>

                        <div className="clearfix">
                          <button type="submit" className="log-in-btn form-components">Log In</button>
                        </div>
                       </form>
                      </div>
          </div>
        { /* modal for LOG OUT */ }
        <div id="myModalLogOut" className="modal">
                   <div className="modal-content">
                      <span className="closeLogOut">&times;</span>
                         <form method="post" action="/log-out" name="logout" onSubmit={this.handleSubmit}> 
                           <h2 className="sign-up-label">Are you sure?</h2>
                        <div className="clearfix">
                          <button type="submit" className="log-in-btn form-components">Log Out</button>
                        </div>
                       </form>
                      </div>

        </div>
    </Grid>
    );
  }
};


module.exports = Main;