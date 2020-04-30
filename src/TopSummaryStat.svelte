<script>
  import { getContext } from 'svelte';

  const store = getContext('store');
</script>

<style>
  .container {
    display: flex;
    justify-content: space-between;
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
</style>

<div class="container">
  <div class="stat">
    <h4>感染者合計</h4>
    <span class="number">{$store.summary.total}</span>
  </div>
  <div class="stat">
    <h4>入院者合計</h4>
    <span class="number">{$store.summary.inHospitalTotal}</span>
  </div>
  <div class="stat">
    <h4>累計死亡人數</h4>
    <span class="number">{$store.summary.deathTotal}</span>
  </div>
  <div class="stat">
    <h4>已康復</h4>
    <span class="number">{$store.summary.discharged}</span>
  </div>

</div>
