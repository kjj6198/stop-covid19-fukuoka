const { writable, derived } = require('svelte/store');

function createLocale(locale) {
  return writable(locale);
}

function createTranslation(localeStore) {
  return derived(localeStore, ($locale) => {
    return function translationFn(key, ...interpolations) {
      const parts = key.split('.');

      const string = parts.reduce((acc, key) => {
        return acc[key];
      }, $locale);
      if (interpolations.length) {
        return string.replace(/\{(\d+)\}/g, function matchFn(match, group) {
          const num = parseInt(group, 10);
          return interpolations[num];
        });
      }

      return string;
    };
  });
}

module.exports = {
  createLocale,
  createTranslation,
};
