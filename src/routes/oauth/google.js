'use strict';

const express = require('express');

const googleMW = require('../../middleware/oauth/google-mw.js');
const router = express.Router();
/**
 * @route GET /google
 * This route is build a string getting strings form process env variable and create options from env variable
 * @param {object}   req   The request string variable from environment variable env
 * @param {object}   res   sending query string format
 * @param {Function} next  We don't use it in here, but this is our method for going to the next middleware or error middleware in the request-response chain
 * @security basicAuth
 * @returns {object} 200 - url string query format
 */

router.get('/google', (req, res, next) => {
  let googleOAuthURL = process.env.GOOGLE_AUTH_SERVICE;
  let options = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: 'https://lab-11app.herokuapp.com' + '/google-oauth',
    //+ '/google-oauth',

    scope: 'email openid profile',
    prompt: 'consent',
    response_type: 'code',
  };

  // query string that built using environment variable(google authorization server url variable)
  googleOAuthURL += '?';

  // make them all in to string query format
  Object.keys(options).forEach((key, indx) => {
    googleOAuthURL += key + '=' + encodeURIComponent(options[key]);
    googleOAuthURL += '&';
  });

  // send string query format as a response
  res.status(200).json({ url: googleOAuthURL });
});

/**
 * @route GET /google-oauth  this is the route our client can go after generated URl
 * @param {object}   req   request middleware function
 * @param {object}   res   The response object user data from google
 * @param {Function} next  We don't use it in here, but this is our method for going to the next middleware or error middleware in the request-response chain
 * @security basicAuth
 * @returns {object} 200 - An object with a key-value token, which represents our generated JSON Web Token and data using that token
 */

router.get('/google-oauth', async (req, res, next) => {
  let userData = await googleMW(req);
  // console.log(data);
  //send point res status 200 (success) , data from query param that google send to us
  // that is specific to google
  res.status(200).json({ name: userData.name, email: userData.email });

});

module.exports = router;
