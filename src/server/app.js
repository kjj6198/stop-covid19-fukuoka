// make it possible to let node import svelte file directly without any bundler
require('svelte/register');
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const getData = require('./getData');
const AppComponent = require('../App.svelte').default;
const { readable } = require('svelte/store');
const { createTranslation, createLocale } = require('../stores/locale');
const { ja, tw, en } = require('../i18n');

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
      summary: summary[0],
      patients,
      askCenter,
      exam,
    };

    const acceptLang = req.acceptsLanguages(['zh-TW', 'ja', 'en-US', 'en-UK']);
    const lang = {
      'zh-TW': tw,
      'zh-CN': tw,
      hant: tw,
      ja: ja,
      en: en,
      'en-UK': en,
      'en-US': en,
    }[acceptLang || 'zh-TW'];

    const localeStore = createLocale(lang);
    const { html, head } = AppComponent.render({
      store: readable({
        ...store,
        patients: {
          ...store.patients,
          data: store.patients.data.slice(0, 10),
        },
      }),
      locale: localeStore,
      t: createTranslation(localeStore),
    });

    res.render(
      'index',
      {
        html,
        lang: acceptLang || 'zh-TW',
        head,
        // for hydrate store
        store,
        locale: {
          tw,
          ja,
          en,
        },
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
