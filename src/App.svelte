<script>
  import Provider from './Provider.svelte';
  import Chart from './Chart.svelte';
  export let store;
</script>

<style>

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<Provider store={store}>
  <main>
    <Chart />
    <h1>Hello! {$store.name}</h1>

    <p>
      Visit the
      <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
      to learn how to build Svelte apps.sss
    </p>
  </main>
</Provider>