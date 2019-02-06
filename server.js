console.log('it is a twitter-node');

var Twit = require('twit');

var T = new Twit({
  consumer_key:         'RKqy2gtvdDrQQoTGqYgro6z32',
  consumer_secret:      'uR8umnGLhO7gKlJ4c861fQPX2HyFwDj8L6yqs7UE5ZAdWRfshy',
  access_token:         '817250584726077441-qrEDkBX7paUtvP4GOMxnXHQ7HatPZli',
  access_token_secret:  'Sn00Ut8ERrk9DXapKYibscANU8BdWVhWwGbTSZuRTxSfK',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

T.get('search/tweets', { q: 'inida', count: 5 }, function(err, data, response) {
  console.log(data.statuses[1].text);
})

