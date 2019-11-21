const superagent = require('superagent');


/**
 * request require authenticated user
 * @param {object} request
*/
let getUserDatag = async request => {
  //  query param helps to get our access token
  let authCode = request.query.code;

  /**
 *creating post request and grab data from github
 * we sending all the content of the body
 */
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

  // grab the actual token
  let access_token = githubRes.body.access_token;

  // get request github API
  // set header / which github looking for
  githubRes = await superagent
    .get(process.env.GITHUB_API)
    .set('Authorization', `Bearer ${access_token}`);

  /**
   * @return {object}
   * this is basic API and have user data
   */
  let userData = githubRes.body;
  return userData;
};

module.exports = getUserDatag;
