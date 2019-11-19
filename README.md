# LAB - 11

## OAuth

### Author: Meron

### Links and Resources
* [submission PR](https://github.com/meron-401n14/lab-11/pull/1)
* [travis](https://www.travis-ci.com/meron-401n14/lab-11)
* [Heroku](https://lab-11app.herokuapp.com/)

#### Documentation
* 

### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - mongodb+srv://meron123:meron123@cfcluster-kexaa.mongodb.net/app?retryWrites=true&w=majority

#### Running the app
* `npm start` or `nodemon index.js`

* TODO: README Question:
  // Now that we have some data about the user, how would we go about
  Ans: this is a basic API and we might only care username and email and we can filter it from the query param that google or github send to us
  // adding this user to our database?
  Ans: we might not want to. A properly authorized web server application can access an API while the user interacts with the application or after the user has left the application.
  though we can manuplate the data that we got as we want 
  // what data should we save?
  Ans :email and name of user  
  // What data is missing? 
  Ans: detail of user 
  // What considerations about storing this data do we need to take?
  Ans:Security
  
#### Tests
* npm test 

#### UML
* ![Google-OAuth](Google-OAuth.jpg)



