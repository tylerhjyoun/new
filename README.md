# Project Features
With the Egg-Timer, users can keep track of other users' events, checking to see if they are in a meeting or not, so they know not to disturb them.
- Create new events, groups, users
- Follow and unfollow users
- View users and groups profile pages
- View ongoing events, past events, and upcoming events for users

# Getting Started
You'll need to install all of the modules

use npm install in all folders with package.json file (mern-egg and backend)

sudo npm install -g nodemon This lets us look into our server in real time, so the page knows to refresh everytime a change is introduced to the code (sudo just gives superuser permission to install this, since it's gonna be installed globally)

# To run the server
cd backend

nodemon server

# To start the frontend
Begin in the git repo

npm start

# Notes about contributions
- Justin Nguyen: He has commits under his account akira13, but also has some commits under jstnn818
- Agrim Gupta: Has commits that were pushed by other members, so his contribution might not be fully represented in the commit-graph

Both have commits that were posted in the past 24 hours, so they may not show as contributors on the Github repo

# Notes about .env
- this code uses the MongoDB to store JSON objects
- once configuring your own database, provide a .env file in the backend directory with the following:
   - ACCESS_TOKEN_SECRET: any hashed token
   - ATLAS_URI: uri from your own database 
