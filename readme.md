# Auctive

This app helps manage live auctions by storing attendee, item donor, and item information, allowing the user to mark items as sold, generating receipts for successful bidders, and exporting event information to Google Sheets.

## What it includes:

* Sequelize models and migration for user model
* Settings for Postgresql
* Passport and passport local
* Express sessions for logged-in user
* Connect-flash error and success messages on log-in and log-out

### User Model

| Column Name | SQL Type | Notes |
|-------------|----------|-----------------------------------|
| id | Integer | serial primary key |
| createdAt | Date | automatically-generated |
| updatedAt | Date | automatically-generated |
| firstname	| String | - |
| lastname | String | - |
| email | String | usernameField for log-in |
| password | String | hashed with bcrypt |
| dob | Date | - |
| admin | Boolean | admin or regular user |


> NOTE: change these fields in model and migration files BEFORE running sequelize db:migrate

### Routes

| Method | Path | Location | Purpose |
| ------- | ----------------------- | ------------- | ------------------------------------- |
| GET | / | index.js | Home Page |
| GET | /profile | controllers/profile.js | Profile page (authorization req) |
| GET | /auth/login | controllers/auth.js | Log-in form page |
| POST | /auth/login | controllers/auth.js | Log-in submission + profile redirect |
| GET | /auth/signup | controllers/auth.js | Sign-up form page |
| POST | /auth/signup | controllers/auth.js | Sign-up submission + redirect to profile |
| GET | event | controllers/events.js | List of events for current user |
| GET | event/:name | controllers/events.js | Single event main page |
| POST | event | controllers/events.js | Create new event |
| GET | attendee/:id | controllers/attendees.js | Attendees add/list for an event |
| GET | attendee/edit/:id | controllers/attendees.js | Edit page for an attendee |
| POST | attendee/:id | controllers/attendees.js | Create new attendee record |
| PUT | attendee/:id | controllers/attendees.js | Edit attendee record |
| GET | item/:id | controllers/items.js | Items add/list for an event |
| GET | item/edit/:id | controllers/items.js | Edit page for an item |
| POST | item/:id | controllers/items.js | Create new item record|
| PUT | item/:id | controllers/items.js | Edit item record |
| DELETE | item/:id | controllers/items.js | Delete item record |
| GET | donor/:id | controllers/donors.js | Donors add/list for an event |
| GET | donor/edit/:id | controllers/donors.js | Edit page for a donor|
| POST | donor/:id | controllers/donors.js | Create new donor record |
| PUT | donor/:id | controllers/donors.js | Edit donor record |
| GET | sell/:id | controllers/sales.js | Winning bid and bidder form for an item |
| PUT | sell/:id | controllers/sales.js | Record winning bid and bidder for an item |
| GET | sell/receipt/:id | controllers/sales.js | List of attendees with links to checkout |
| GET | sell/show/:id | controllers/sales.js | Receipt for bidder and form to record payment |
| PUT | sell/show/:id | controllers/sales.js | Submit form to record payment |
| GET | event/areport/:id | events/auth.js | Show attendee summary for an event |
| GET | event/ireport/:id | events/auth.js | Show item summary for an event |


## Steps for Use

#### 1. Clone repo, but with a different name

```
git clone <repo_link> <new_project_name>
```
#### 2. Create a new database for your project 
```
createdb <new_db_name>
```
#### 3. Install node modules from `package.json`
```
 npm install
```
#### 4. Customize with project name
* Title in layout.js
* Logo in navbar
* Description/repo link in package.json
* Remove auth boilerplate readme and update readme for new project

#### 5. Open `config.json` and change the following: 
* Change database name to new_db_name from above
* Set username/password for your local environment
* Make sure the flavor of SQL is correct for your project

> NOTE: if changing from Postgres, need different node_modules

#### 6. Edit/check models and migrations for your project needs

For example, remove dob field or admin field; add username field, etc

Delete or add to both migration and model

#### 7. Run the migrations
```
sequelize db:migrate
``` 

#### 8. Add a `.env` file with a SESSION_SECRET key for session implementation

#### 9. Run your server and make sure everything works
If nodemon is installed globally:
```
nodemon
```
Otherwise: 
```
node index.js
```
#### 10. Create a new repository for your new project
* Create a new repository on your personal GitHub account
* Delete the old remote to origin
* Add new repo as the new remote location (can still be called origin)
* git push

```
git remote remove origin
git remote add origin <new_repo_link?
git add .
git commit -m "new project repo"
git push origin master
```

>NOTE: Do NOT make commits from the new project to the auth boilerplate

## Next steps:

Add new models and migrations for your new app. 



















