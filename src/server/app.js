// make it possible to let node import svelte file directly without any bundler
require('svelte/register');
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const getData = require('./getData');
const AppComponent = require('../App.svelte').default;
const { readable } = require('svelte/store');
app.disable('x-powered-by');

app.use(express.static('public', { index: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
  '/api',
  createProxyMiddleware({
    target:
      process.env.NODE_ENV === 'production'
        ? 'http://fukuokacovid.info/'
        : 'http://localhost:8081/',
    pathRewrite: {
      '/api': '',
    },
    changeOrigin: false,
  })
);

let cacheHTML = null;
app.get('/', async (req, res, next) => {
  if (cacheHTML) {
    res.status(200).send(cacheHTML);
    res.end();
    return;
  }

  try {
    const [summary, patients, askCenter, exam] = await Promise.all([
      getData('/summary'),
      getData('/patients'),
      getData('/askCenter'),
      getData('/exam'),
    ]);

    const store = {
      summary,
      patients,
      askCenter,
      exam,
    };

    const { html, head } = AppComponent.render({
      store: readable(store),
    });

    res.render(
      'index',
      {
        html,
        title: '',
        head,
        // for hydrate store
        store,
      },
      (err, html) => {
        if (err) {
          next(err);
          return;
        }
        if (process.env.NODE_ENV === 'production') {
          cacheHTML = html;
        }

        res.send(html).end();
      }
    );
  } catch (err) {
    res.status(500);
    next(err);
  }
});

app.listen(8080, () => {
  console.log(`now listening on 8080`);
});
