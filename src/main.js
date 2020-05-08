import App from './App.svelte';
import store from './stores/data';
import { createLocale, createTranslation } from 'svelte-intl2';

// sync $store from window.store
// sync locale from window.locale

// remove content from ssr store
const script = document.querySelector('#ssrStore');
if (script) {
  script.remove();
}

const getTranslation = (defaultLang = 'zh-TW') => {
  const lang = navigator.languages[0] || navigator.language || defaultLang;
  if (lang === 'zh-TW' || lang === 'zh' || lang === 'hant') {
    return window.locale.tw;
  } else if (lang === 'ja') {
    return window.locale.ja;
  }

  return window.locale.en;
};

const localeStore = createLocale(getTranslation());
const t = createTranslation(localeStore);

const app = new App({
  target: document.querySelector('#app'),
  hydrate: true,
  props: {
    store,
    locale: localeStore,
    t,
  },
});

export default app;
