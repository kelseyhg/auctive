// require variables for dotenv
require('dotenv').config();

// require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var session = require('express-session');
var readline = require('readline');
var {google} = require('googleapis');
var fs = require('fs');

var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
var TOKEN_PATH = 'token.json';
const SPREADSHEETID = "1mR02MKa3EyMYXl6JSLZcLluepdIsh1rskcbvaTu-4Wo";
global.eventItems = [];
global.eventAttendees = []; 
global.currentEvent = ''; 
global.itemRange = 'Items!A2-F120';
global.attendeeRange = 'Attendees!A2-F80';

// This will run on server start.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Sheets API.
//   authorize(JSON.parse(content), getThings);
// });

// declare app variables
var app = express();

// set and use statements

app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// custom middleware
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

//controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profiles'));
app.use('/event', require('./controllers/events'));
app.use('/item', require('./controllers/items'));
app.use('/donor', require('./controllers/donors'));
app.use('/attendee', require('./controllers/attendees'));
app.use('/sell', require('./controllers/sales'));
app.use('/purchase', require('./controllers/purchases'));
app.use('/makepurchase', require('./controllers/makepurchases'));
app.use('/dessert', require('./controllers/desserts'));

// define routes
app.get('/', function(req, res) {
	fs.readFile('credentials.json', (err, content) => {
	  if (err) {
	  	console.log('ERR 1', err);
	  	res.send(err);
	  }

	  // Authorize a client with credentials, then call the Google Sheets API.
	  authorize(JSON.parse(content), function(auth){
	  	res.render('home');
	  });
	});
});

// GOOGLE SHEETS //

// call send function to add items to google sheets
app.get('/send', function(req, res){
  fs.readFile('credentials.json', (err, content) => {
    if (err) {
      console.log('ERR 2', err);
      res.send(err);
    }
    authorize(JSON.parse(content), function(auth){
      addItems(auth, eventItems, function(msg){
        res.send(msg);
      });
    });
  });
});

// call write function to add attendees to google sheets
app.get('/write', function(req, res){
  fs.readFile('credentials.json', (err, content) => {
    if (err) {
      console.log('ERR 2', err);
      res.send(err);
    }
    authorize(JSON.parse(content), function(auth){
      addAttendees(auth, eventAttendees, function(msg){
        res.send(msg);
      });
    });
  });
});

// authorize user
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

// add items to google sheets
function addItems (auth, values, callback) {
  const sheets = google.sheets({version: 'v4', auth});
  var request = {
    spreadsheetId: SPREADSHEETID,  
    range: "Items!A2:F50",
    valueInputOption: 'USER_ENTERED',  
    insertDataOption: 'OVERWRITE',  
    resource: {
      values: values
    },
    auth: auth,
  };

  sheets.spreadsheets.values.append(request, function(err, response) {
  if (err) {
      return callback(err);
    }

    return callback('SUCCESS');
  });
}

// add attendees to google sheets
  function addAttendees (auth, values, callback) {
  const sheets = google.sheets({version: 'v4', auth});
  var request = {
    spreadsheetId: SPREADSHEETID,  
    range: "Attendees!A2:F60",
    valueInputOption: 'USER_ENTERED',  
    insertDataOption: 'OVERWRITE',  
    resource: {
      values: values
    },
    auth: auth,
  };

  sheets.spreadsheets.values.append(request, function(err, response) {
    if (err) {
      return callback(err);
    }

    return callback('SUCCESS');
  });
}
// END GOOGLE SHEETS STUFF


// listen on port 3000
app.listen(process.env.PORT || 3000, function(){
	console.log("You're listening to the smooth sounds of port 3000 in the morning.");
});

