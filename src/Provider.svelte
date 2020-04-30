<script>
  import { setContext, onMount } from 'svelte';
  export let locale;
  export let store;
  export let t;

  setContext('store', store);
  setContext('locale', locale);
  setContext('t', t);
</script>

<slot />
