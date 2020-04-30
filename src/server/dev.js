const route = require('express').Router();
const path = require('path');
const fs = require('fs');

route.get(/^\/(askCenter|exam|patients|summary)/, (req, res) => {
  const content = fs.readFileSync(
    path.resolve(__dirname, 'mockData', `${req.path.replace('/', '')}.json`),
    { encoding: 'utf-8' }
  );

  res.status(200).json(JSON.parse(content));
});

module.exports = route;
