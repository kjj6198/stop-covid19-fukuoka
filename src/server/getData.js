const request = require('request');

const getData = (url, options) => {
  return new Promise((resolve, reject) => {
    request.get(
      process.env.NODE_ENV === 'production'
        ? 'http://fukuokacovid.info/api' + url
        : 'http://localhost:8080/api' + url,
      options,
      function handler(err, response, body) {
        if (err) {
          reject(err);
        } else {
          try {
            resolve(JSON.parse(response.body));
          } catch (err) {
            console.error(`ERROR: ${err.message}`);
            reject(err);
          }
        }
      }
    );
  });
};

module.exports = getData;
