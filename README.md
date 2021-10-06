# Project Studio Group 
## Initial Setup and Install

Pull the project. 
Use npm install for packages in the main PSG folder and again for the client folder.
Configure the settings in the config/db.config.json (development) area for your local database connection.
Use node server.js on the main folder to start the application, first time running will invoke the initiateData() function which will preseed the database with a bunch of test data. If this is not wanted just comment out initiateData() - line 51 server.js.
The application will now be running on http://localhost:3001

## Covid Tracing Application

The Senior Health Officer is proposing a new initiative for COVID tracing. After modelling the age and demographics of checkins with the current COVID SAfe system, they have determined that a disproportionate number of seniors are not being compliant with the system. Survey feedback has indicated that seniors 1) do not understand how to access the app, 2) find manual check-in slow and inconsistently available. The new initiative being proposed will roll-out COVID tracing terminals where the general public can checkin, removing the need for the app on a user’s phone and creating a consistent user experience. They will trial this new system in a few select venues before making it available to a larger number of venues where COVID outbreaks have been known to occur.

They have approached your team with creating a solution for the new COVID tracing initiative. They would like you to scope and build a web-based solution that will be accessed from the proposed terminals. The solution should allow a member of the public to log their visit to the venue. The process should be streamlined; ideally, a member of the general public can type a unique identifier in the terminal to log their visit. The terminal must talk to a centralised system that stores the checkins and, in the case of of an outbreak, can generate a report of people that must be contacted. They have asked you to consider security and privacy.


## ACCOUNT SETUP
There is a multistep structure for the account setups to make verification and authentication a smoother process and keep data seperate from the login credentials whilst minimising the code base and complexity. 
The first step is the roles table, this coordinates the authenication a user has over the system.
The second step is the user table, this has a username and a password with a foreign key pointed at a specific role. One user account can only have one role.
The third step are the data tables, depending on what the user signed up as these tables are populated with the rest of their details and linked to them through a foreign key.
The way this works is that whenever a user logins in only the first and second table have to be queried, working out if the user exists and then linking them to their role. Afterwards their information can be connected through the data table and sent back to them. The same for the authenitcation method, checking if it is a user that is trying to access the page and then what role they have, then if they can proceed to the desired page. This eliminates the need for having a different sign-in function and authentication method for every user type.