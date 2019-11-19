const superagent = require('superagent');

/**
 * this is a request function inorder to get user token
 * @param {object} request for query to access user infromation
 */
let getUserData = async request => {
  //  query param helps to get our access token
  let authCode = request.query.code;

/**
 *creating post request and grab data from google
 * we sending all the content of the body 
 */
  
let googleRes = await superagent
  .post(process.env.GOOGLE_TOKEN_SERVICE)
  .type('form')
  .send({
    code: authCode,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${process.env.HOME_URL}/google-oauth`,
    grant_type: 'authorization_code'
  });

/**
 * param to access token from google responseS
 */
let access_token = googleRes.body.access_token;
 
/**
*google API requires authenticated user
* set token to api instance or api-service call
 */
googleRes = await superagent
  .get(process.env.GOOGLE_API)
  .set('Authorization', `Bearer ${access_token}`);

 /**
   * @return {object}
   * this is basic API and have user data
   */
 let userData = googleRes.body;
 return userData;
};

module.exports = getUserData;


