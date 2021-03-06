const request = require('request');

const getData = (url, options) => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'production') {
      request.get(
        process.env.CDN_URL + url + `.json?now=${Date.now()}`,
        function handler(err, response, body) {
          if (err) {
            reject(err);
          } else {
            const data = JSON.parse(body);
            if (url === '/summary' || url === '/summary-fukuoka') {
              resolve(data);
            } else {
              resolve({
                totalCount: data.length,
                data,
              });
            }
          }
        }
      );
    } else {
      request.get('http://localhost:8080/api' + url, options, function handler(
        err,
        response,
        body
      ) {
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
      });
    }
  });
};

module.exports = getData;
