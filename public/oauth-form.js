'use strict';

/**
 * This function is the starting process for our OAuth request. As a response to a button click, we make a request to a specific endpoint which should return to use a URL for the OAuth service we want to use to sign in. We then just manually redirect to that URL
 * @param  {string} path  The corresponding endpoint defined in our server (src/routes/oauth)
 */
const getOAuth = async path => {
  console.log('hit button!');
  let res = await fetch(path, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  let resData = await res.json();
  console.log('Auth Endpoint:', resData.url);
  window.location.href = resData.url;
};
