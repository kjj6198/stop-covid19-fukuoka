<script>
  import { setContext, onMount } from 'svelte';
  export let store;
  
  setContext('store', store);
</script>

<slot>
</slot>