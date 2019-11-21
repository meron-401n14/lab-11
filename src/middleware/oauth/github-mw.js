const superagent = require('superagent');


/**
 * this is a request function inorder to get user token from web
 * by sending(post) string parameter which is built from process environment variable
 * @param {object} request for query to access user infromation
 */
let getUserDatag = async request => {
  // assign  a variable to access github query code
  let authCode = request.query.code;

  //make request to google by posting end point variables from process environemnt in order to get token
  let githubRes = await superagent
    .post(process.env.GITHUB_TOKEN_SERVICE)
    .type('form')
    .send({
      code: authCode,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      redirect_uri: `${process.env.GIT_URL}/github-oauth`,
      grant_type: 'authorization_code',
    });

  // grab the actual token and assign to token variable
  let token = githubRes.body.access_token;

  //set header (Bearer based token) that the endpoint required for as authorization and get github API
  githubRes = await superagent
    .get(process.env.GITHUB_API)
    .set('Authorization', `Bearer ${token}`);

  // user data which we get from github end point using token
  let userData = githubRes.body;
  return userData;
};

module.exports = getUserDatag;
