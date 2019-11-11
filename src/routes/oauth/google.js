'use strict';

const express = require('express');

const googleMW = require('../../middleware/oauth/google-mw.js');
const router = express.Router();
/**
 * @route GET /google
 * This route then we reach the route endpoint
 * @param {object}   req   The request object. Even though this is a post, we don't actually need any body data, all the sign in data should be in req.headers.authorization
 * @param {object}   res   The response object
 * @param {Function} next  We don't use it in here, but this is our method for going to the next middleware or error middleware in the request-response chain
 * @security basicAuth
 * @returns {object} 200 - An object with a key-value token, which represents our generated JSON Web Token
 */
// TODO: Swagger Comment
router.get('/google', (req, res, next) => {
  let googleOAuthURL = process.env.GOOGLE_AUTH_SERVICE;
  let options = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.HOME_URL + '/google-oauth',
    scope: 'email openid profile',
    prompt: 'consent',
    response_type: 'code'
  };

  // TODO: Comment
  googleOAuthURL += '?';
  // google authorization server url variable 
  // TODO: Comment
  Object.keys(options).forEach((key, indx) => {
    googleOAuthURL += key + '=' + encodeURIComponent(options[key]);
    googleOAuthURL += '&';
  });

  // TODO: Comment
  res.status(200).json({ url: googleOAuthURL });
});

// TODO: Swagger Comment
router.get('/google-oauth', async (req, res, next) => {
  let data = await googleMW(req);

  // TODO: Comment
  res.status(200).json({ name: data.name, email: data.email });

  // TODO: README Question:
  // Now that we have some data about the user, how would we go about
  // adding this user to our database?
  // What data should we save?
  // What data is missing?
  // What considerations about storing this data do we need to take?
});

module.exports = router;
