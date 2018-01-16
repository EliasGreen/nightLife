// init project
const express = require('express');
const app = express();
// dotenv
require('dotenv').config()
// request API access for YELP
// const Yelp = require('yelp');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.API_KEY);
// body-parser
const bodyParser = require('body-parser');
// cookie-parser
const cookieParser = require('cookie-parser');
// passport
const passport = require('passport');
// bcrypt - hashing passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;
// session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// assert
const assert = require('assert');
//require/import the mongodb native drivers
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// using Node.js `require()`
const mongoose = require('mongoose');
// connection URL
const url = process.env.MONGOLAB_URI;      
// connection
const promise_connection = mongoose.connect(url, {
	useMongoClient: true
});
let db = mongoose.connection;
// if connection is success
promise_connection.then(function(db){
	console.log('Connected to mongodb');
});
/******************************/
// set store
/******************************/
let store = new MongoDBStore(
      {
        uri: url,
        collection: "sessions"
      });
 // Catch errors
    store.on('error', function(error) {
      assert.ifError(error);
      assert.ok(false);
    });
/***********************************/
// set USEs
/***********************************/
app.use( bodyParser.json() );   
app.use(bodyParser.urlencoded({ 
  extended: true
}));
/***/
app.use(cookieParser())
/***/
app.use(session({
  secret: process.env.COOKIE_SECRET,
  cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
      },
  store: store,
  resave: false,
  saveUninitialized: false
  //cookie: { secure: true }
}));
/***/
app.use(passport.initialize());
app.use(passport.session());
/***/
app.use(express.static('public'));
/***********************************/

/******************************/
// mongoDB models and schemas
/******************************/
// if connection is success
promise_connection.then(function(db){
	console.log('Connected to mongodb');
});
// describe the schema
let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
let userSchema = new Schema({
    nickname: String,
    email: String,
    password: String,
    places: [],
    search: String
});
let placeSchema = new Schema({
    name: String,
  // set max and min to prevent from bugs and tricky users the app
    count: { type: Number, min: 0, max: 30 }
});
// get the model
let userModel = mongoose.model('usersforbars', userSchema);
let place = mongoose.model('bars', placeSchema);

/***********************************/

// getting the layout(page) of application
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

/******************************/
//       POST methods
/******************************/
app.post("/sign-up", function(request, response) {
  // check if email is already used
  userModel.find({ email: request.body["email"]}, function (err, document) {
              if(!err) {
                if(document.length == 0) {
                 //hash password
                  bcrypt.hash(request.body["password"], saltRounds, function(err, hash) {
                  // create a user
                      let obj = {nickname: request.body["nickname"], email: request.body["email"], password: hash, places: [], search: ""};
                      let user = new userModel(obj);
                      user.save(function (err) {
                        if (!err) console.log('Success!');
                            // login after registration
                            userModel.find({nickname: request.body["nickname"], email: request.body["email"], password: hash}, function (err, document) {
                              if(!err) {
                                let user_id = document[0]["id"];
                                request.login(user_id, () => {
                                  // send to user main page if error == zero
                                     response.json({"error": 0});
                                });
                              }
                            });
                        });
                    });
                }
                else if(document.length == 1) {
                 response.json({"error": "error"});
                }
            }
        });
});
/***********************************/
app.post("/log-in", function(request, response) {
              userModel.find({ email: request.body["email"]}, function (err, document) {
              if(!err) {
                if(document.length == 0) {
                  response.json({"error": "error0"});
                }
                else if(document.length == 1) {
                bcrypt.compare(request.body["password"], document[0]["password"], function(err, res) {
                if(res === true) {
                let user_id = document[0]["id"];
                request.login(user_id, () => {
                     response.json({"error": 0});
                           });
                        }
                  else if(res === false) {
                    response.json({"error": "error1"});
                  }
                   });
                }
            }
        });
});
/***********************************/
app.post("/log-out", function(request, response) {
          request.logout();
          request.session.destroy(function(err) {
          response.status(200).clearCookie('connect.sid', {path: '/'}).redirect("/");
     })
});
/***********************************/
app.post("/send-data-to-search", function(request, response) {
    // if loged in -> send search_string to user in DB
    let nickname = "";
    if(request.isAuthenticated()) {
      userModel.findOneAndUpdate({"_id": request.session.passport.user}, {search: request.body["search_string"]}, (err, document) => {
             if(err) {
               console.log("ERROR!: ", err);
             }
             nickname = document.nickname;
        });
    }
    // for search
    client.search({
        location: request.body["search_string"]
      }).then(res => {
            response.json({arr: res.jsonBody, nickname: nickname});
          }).catch(e => {
            console.log(e);
    });
});
/***********************************/
app.post("/islogedin", function(request, response) {
  // in addition to check is loged in user also we get user nickname
  if(request.session.hasOwnProperty("passport")) {
   userModel.findById(request.session.passport.user, (err, document) => {
     if(!err) {
       response.json({isLogedIn: request.isAuthenticated(), nickname: document.nickname, search_string: document.search});
     } 
     else {
       console.log("ERROR!: ", err);
     } 
        });
  } 
         
  else {
        response.json({isLogedIn: request.isAuthenticated(), nickname: "0"}); 
    }
});
/******************************/
// user sessions handlers:
/******************************/
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});
// listen for requests
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
