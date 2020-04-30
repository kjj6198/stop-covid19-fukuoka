<script>
  import { getContext } from 'svelte';
  const store = getContext('store');
  const t = getContext('t');
</script>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    background-color: #005bad;
    padding: 16px;
    color: #fff;
    margin-bottom: 20px;
  }

  .stat {
    flex: 1;
    text-align: center;
  }

  .stat > h4 {
    font-size: 20px;
    font-weight: bold;
  }

  .stat:not(:last-child) {
    border-right: 1px solid #fff;
  }

  .number {
    font-size: 3.5rem;
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 100;
  }

  @media (max-width: 680px) {
    .stat > h4 {
      font-size: 16px;
    }

    .number {
      font-size: 1.5rem;
    }
    .container {
      padding: 6px;
    }
  }
</style>

<div class="container">
  <div class="stat">
    <h4>{$t('summary.infection')}</h4>
    <span class="number">{$store.summary.total}</span>
  </div>
  <div class="stat">
    <h4>{$t('summary.hospital')}</h4>
    <span class="number">{$store.summary.inHospitalTotal}</span>
  </div>
  <div class="stat">
    <h4>{$t('summary.death')}</h4>
    <span class="number">{$store.summary.deathTotal}</span>
  </div>
  <div class="stat">
    <h4>{$t('summary.discharged')}</h4>
    <span class="number">{$store.summary.discharged}</span>
  </div>

</div>
