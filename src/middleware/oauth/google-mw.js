const superagent = require('superagent');

/**
 * this is a request function passing a request
 * by sending(post) string parameter which is built from process environment variable
 * @param {object} request for query to access user infromation
 */

let getUserData = async request => {
  // assign  a variable to access google query code
  let authCode = request.query.code;
  //make request to google by posting end point variables from process environemnt in order to get token
  let googleRes = await superagent
    .post(process.env.GOOGLE_TOKEN_SERVICE)
    .type('form')
    .send({
      code: authCode,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri:'https://lab-11app.herokuapp.com'+ '/google-oauth',
      grant_type: 'authorization_code',
    });

  // grab the actual token and assign to token variable
  let token = googleRes.body.access_token;

  //set header (Bearer based token) that the endpoint required for as authorization and get google API
  let userRes = await superagent
    .get(process.env.GOOGLE_API)
    .set('Authorization', `Bearer ${token}`);

  return userRes.body;
};





module.exports = getUserData;


