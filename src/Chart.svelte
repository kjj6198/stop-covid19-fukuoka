<script>
  import { getContext } from 'svelte';
  let store = getContext('store');
</script>

<p>{JSON.stringify($store.summary[0])}</p>

