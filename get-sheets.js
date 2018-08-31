var readline = require('readline');
var fs = require('fs');

const {authorize, google} = require('./config/config');
 
const spreadsheetId = "1mR02MKa3EyMYXl6JSLZcLluepdIsh1rskcbvaTu-4Wo";


 
const append = (range, values) => {
    fs.readFile('client_secret.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        authorize(JSON.parse(content), (auth) => {
            const sheets = google.sheets({ version: 'v4', auth });
            const valueInputOption = 'USER_ENTERED';
            const resource = {values};
            sheets.spreadsheets.values.append({
                spreadsheetId, range, valueInputOption, resource
            }, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Success!");
                }
            });
        });
    });
}
 
            append(
                "Sheet1!A7",
                [
                    [9, 1010, "gift bag", "item", "so cool", 3, 100]
                ]
            );

module.exports = {
    append
};


