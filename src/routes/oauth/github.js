'use strict';

const express = require('express');

const githubMW = require('../../middleware/oauth/github-mw.js');
const router = express.Router();

router.get('/github', (req, res, next) => {
  //console.log('in the /github route');
  let githubOAuthUrl = process.env.GITHUB_AUTH_SERVICE;


  let options = {
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GIT_URL + '/github-oauth',
    login: 'admin',
    scope: 'user',
    state: 'random',
    allow_signup: true,
  };
  //console.log('options', options);
  githubOAuthUrl += '?';
  console.log('am here!');

  Object.keys(options).forEach((key, indx) => {
    githubOAuthUrl += key + '=' + encodeURIComponent(options[key]);
    githubOAuthUrl += '&';

    //console.log(githubOAuthUrl)

  });
  console.log(githubOAuthUrl);
  res.status(200).json({ url: githubOAuthUrl });
});
// query urls:
// https://github.com/login/oauth/authorize?client_id=d79b4faed9667d24e532&redirect_uri=localhost:1234/path

router.get('/github-oauth', async (req, res, next) => {
  let data = await githubMW(req);
  res.status(200).json({ name: data.name, email: data.email });

});

module.exports = router;



