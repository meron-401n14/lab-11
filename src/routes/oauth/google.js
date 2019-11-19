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

router.get('/google', (req, res, next) => {
  let googleOAuthURL = process.env.GOOGLE_AUTH_SERVICE;
  let options = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri:"https://lab-11app.herokuapp.com/google-oauth",
    //+ '/google-oauth',
   
    scope: 'email openid profile',
    prompt: 'consent',
    response_type: 'code'
  };

  /**
   * google authorzation server URl param
   */
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

/**
 * @route GET /google-oauth  this is the route our client can go after generated URl
 * @param {object}   req   request middleware function 
 * @param {object}   res   The response object user data from google
 * @param {Function} next  We don't use it in here, but this is our method for going to the next middleware or error middleware in the request-response chain
 * @security basicAuth
 * @returns {object} 200 - An object with a key-value token, which represents our generated JSON Web Token
 */
 
router.get('/google-oauth', async (req, res, next) => {
  let data = await googleMW(req);

  // end point res status 200 (success) , data from query param that google send to us 
  // that is specific to google 
  res.status(200).json({ name: data.name, email: data.email });

  
});

module.exports = router;
