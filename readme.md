# Auctive

This app helps manage live auctions by storing attendee, item donor, and item information, allowing the user to mark items as sold, generating receipts for successful bidders, and exporting event information to Google Sheets.

## User Stories

User is an event coordinator for a nonprofit planning an auction fundraiser
* She wants to be able to track donors, donated items, and attendees
* She wants this information to be easy to access and update during the event
* She wants to efficiently provide attendees with accurate receipts upon checkout
* She wants to be able to export her event data for analysis and to share records

### User Model

| Column Name | SQL Type | Notes |
|-------------|----------|---------------------------------------|
| id | Integer | serial primary key |
| createdAt | Date | automatically-generated |
| updatedAt | Date | automatically-generated |
| orgName  | String | name of org running event|
| userName | String | id for log-in |
| email | String | - |
| password | String | hashed with bcrypt |
| admin | Boolean | admin or regular user |

### Event Model

| Column Name | SQL Type | Notes |
|-------------|----------|--------------------------------------|
| id | Integer | serial primary key |
| createdAt | Date | automatically-generated |
| updatedAt | Date | automatically-generated |
| name  | String | - |
| date | Date | date of event |
| userId | foreign key | id of user who created event |
| email | String | - |
| active | Boolean | whether event is active or over (un-used)|

### Donor Model

| Column Name | SQL Type | Notes |
|-------------|----------|-------------------------------------|
| id | Integer | serial primary key |
| createdAt | Date | automatically-generated |
| updatedAt | Date | automatically-generated |
| name  | String | name of person or company |
| contactName | String | name of contact person at company |
| email | String | - |
| phone | String | - |
| notes | String | - |

### Item Model

| Column Name | SQL Type | Notes |
|-------------|----------|-------------------------------------|
| id | Integer | serial primary key |
| createdAt | Date | automatically-generated |
| updatedAt | Date | automatically-generated |
| number | Integer | id number fo event purposes |
| name  | String | - |
| type | String | item or certificate |
| description | Text | - |
| eventId | foreign key | id of event |
| donorId | foreign key | id of item donor |
| attendeeId | foreign key | id of winning bidder |
| marketPrice | Integer | market value of item |
| soldPrice | Text | amount of winning bid |

### Attendee Model

| Column Name | SQL Type | Notes |
|-------------|----------|-------------------------------------|
| id | Integer | serial primary key |
| createdAt | Date | automatically-generated |
| updatedAt | Date | automatically-generated |
| name  | String | name of person |
| nameSecondary | String | partner/guest with shared bid # |
| bidNumber | Integer | - |
| ticketStatus | String | paid for ticket, unpaid, guest |
| table | Integer | table number assignment |
| phone | String | - |
| email | String | - |
| paid |  Boolean | paid for items won T/F |
| cardPayment | Integer | payment amount by card |
| cashPayment | Numeric | payment amount by cash |

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


## App Walk-through

#### 1. Home page
	* Log in reveals a hidden form
	* Sign up takes user to sign-up page to create account

#### 2. Profile page
	* Allows user to create new event and set destination for data in google sheets
	* User can also navigate to existing events

#### 3. Event show page
	* Divides activities into three phases: pre-event data entry and editing
	* User can click links to one of seven destinations

#### 4. Items page
	* User can click to show new item form, and add a new item
	* View existing items associated with the event, and click to edit or delete
	* Dropdown menu allows users to select a donor already in the system

#### 5. Donor page
	* User can click to show new donor form, and add a new donor
	* View existing donors associated with the event, and click to edit

#### 6. Attendee page
	* User can click to show new attendee form, and add a new attendee
	* View existing attendees associated with the event, and click to edit

#### 7. Sell items
	* Identify items by number and attendees by bid number to assign a winning bidder and bid amount to an item
	* click Set Winner to update values in items table

#### 8. Checkout index
	* Show list of attendees to generate receipt for

#### 9. Checkout show
	* Generate receipt for an attendee showing item purchases and total cost
	* Mark attendee as paid and show amount paid by cash and amount paid by credit card

#### 10. Item Report
	* Generate report showing item name, number, value, bidder number, and amount sold for
	* Click send report to send info to designated google sheet

#### 11. Attendee Report
	* Generate report showing attendee name, bid number, total cost, and paid/unpaid status
	* Click send report to send info to designated google sheet


## Issues:
* Delete routes are needed for items, donors, and events
* There is no edit function for events
* Needs better control over sheets destination: ability to set spreadsheet and edit sheets ranges
* Opening hidden forms currently requires two clicks instead of one, confusing users (and me)
* Needs table for many-to-many items, like drinks and raffle tickets
* Should generate pdf receipts
* Lists of donors/items/attendees should be sorted by number and have a search function
* Logo on receipt page is hard-coded, not changeable
* No way for user to edit info or reset password
* Heroku deployment is unsuccuessful
* Need better success message/redirect after writing to Sheets
* Range variables don't work in Sheets function
* Need error detection when selling items (currently sends false success message if a number is mistyped)
* In items edit, need to add dropdown for donor and for item type

















