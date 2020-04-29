import { writable } from 'svelte/store';

export function getUserLanguage(language, languages) {
  const availableLang = ['zh-TW', 'zh', 'en', 'ja', 'jp', 'en-US', 'en-UK'];
  if (availableLang.includes(language)) {
    return language;
  } else if (languages.length) {
    return availableLang.includes(languages[0]) ? languages[0] : 'en';
  }

  return 'en';
}
