// make it possible to let node import svelte file directly without any bundler
require('svelte/register');
const path = require('path');
const express = require('express');
const app = express();
// I don't know why standard app engine env doesn't support gzip...
const compression = require('compression');
const { readable } = require('svelte/store');
const { createTranslation, createLocale } = require('../stores/locale');
const AppComponent = require('../App.svelte').default;
const getData = require('./getData');
const { ja, tw, en } = require('../i18n');
const devRoute = require('./dev');
const botUAReg = require('./botUA');

app.disable('x-powered-by');

if (process.env.NODE_ENV === 'production') {
  app.use(compression({ level: 6 }));
}

app.use(express.static('public', { index: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV !== 'production') {
  app.use('/api', devRoute);
}

app.get('/', async (req, res, next) => {
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

    const ua = req.get('User-Agent');
    if (ua) {
      if (botUAReg.test(ua)) {
        res.render('bot', { lang: acceptLang || 'zh-TW', head });
        return;
      }
    }

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
