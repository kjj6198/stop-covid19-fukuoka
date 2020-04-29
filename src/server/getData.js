const request = require('request');

const getData = (url, options) => {
  return new Promise((resolve, reject) => {
    request.get(
      process.env.NODE_ENV === 'production'
        ? 'https://fukuokacovid.info' + url
        : 'http://localhost:8080/api' + url,
      options,
      function handler(err, response, body) {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(response.body));
        }
      }
    );
  });
};

module.exports = getData;
