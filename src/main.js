import App from './App.svelte';
import store from './stores/data';

// sync $store from window.store
// sync locale from window.locale

// remove content from ssr store
const script = document.querySelector('#ssrStore');
if (script) {
  script.remove();
}

const app = new App({
  target: document.querySelector('#app'),
  hydrate: true,
  props: {
    store,
  },
});

export default app;
