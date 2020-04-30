<script>
  import { countAccumulated } from './utils';
  import Provider from './Provider.svelte';
  import Chart from './Chart.svelte';
  import Notice from './Notice.svelte';
  import ChartContainer from './ChartContainer.svelte';
  import TopSummaryStat from './TopSummaryStat.svelte';
  import Table from './Table/Table.svelte';
  import ExternalLink from './ExternalLink.svelte';
  import Tab from './Tab.svelte';
  import { detail } from './config';

  export let store;
  let currentTab;

  let accumulated = {};
</script>

<style>
  .container {
    width: 95%;
    max-width: 1400px;
    margin: auto;
    display: grid;
    margin-top: 20px;
    grid-gap: 30px;
    grid-template-columns: 250px 1fr 1fr;
    grid-auto-rows: minmax(100px, auto);
    grid-template-areas:
      'nav main main'
      'footer footer footer';
  }

  nav {
    grid-area: nav;
  }
  main {
    grid-area: main;
  }
  footer {
    grid-area: footer;
  }
</style>

<Provider {store}>
  <div class="container">
    <nav>
      <h3>福岡市新型冠狀肺炎感染情報</h3>
      <Notice />
    </nav>
    <main>
      <h1>福岡県内での新型コロナウイルス情報サイト</h1>

      <p>
        <strong>This is not official website.</strong>
        Refer to
        <ExternalLink
          href="https://www.pref.fukuoka.lg.jp/contents/covid19emergency-details.html"
          title="offcial website" />
        for more detail.
      </p>

      <TopSummaryStat />

      <ChartContainer title="感染者">
        <div slot="content">
          <div class="wrapper">
            <Tab tabs={['日別', '累計']} let:current={currentTab}>
              {#if currentTab === '日別'}
                <Chart
                  xTicks={[...new Set($store.patients.data.map((d) => d.publishedAt))]}
                  xTickFormat={(d) => d.replace('2020/', '')}
                  data={$store.patients.data}
                  groupByKey="publishedAt" />
              {:else if currentTab === '累計'}
                <Chart
                  xTicks={[...new Set($store.patients.data.map((d) => d.publishedAt))]}
                  xTickFormat={(d) => d.replace('2020/', '')}
                  yTicks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900]}
                  data={countAccumulated($store.patients.data)}>
                  <div slot="tooltip" let:data={accumulated}>
                    <h5>{accumulated.publishedAt}</h5>
                    <p>
                      合計：{accumulated.total} (+{accumulated.total - accumulated.lastTime})
                    </p>
                  </div>
                </Chart>
              {/if}
            </Tab>
          </div>
        </div>
        <div slot="footer">hello</div>
      </ChartContainer>

      <ChartContainer title="感染者詳細">
        <div slot="content" style={`height: 500px; overflow-y: auto`}>
          <!-- since data becomes larger and larger, you might want to add paging...  -->
          <Table
            data={$store.patients.data}
            config={detail}
            title="感染者詳細一覧">
            <div slot="caption">
              <ExternalLink
                title="詳しくは福岡公式サイトへ"
                href="https://www.pref.fukuoka.lg.jp/contents/covid19-hassei.html#0428" />
            </div>
          </Table>
        </div>
      </ChartContainer>

      <ChartContainer title="検査実施数">
        <div slot="content">
          <Chart
            overflow
            xTicks={[...new Set($store.exam.data.map((d) => d.publishedAt))]}
            xTickFormat={(d) => d.replace('2020/', '')}
            yTicks={[0, 100, 200, 300, 400, 500, 600, 700]}
            barWidth={5}
            data={$store.exam.data} />
        </div>
      </ChartContainer>

      <ChartContainer title="相談窓口数">
        <div slot="content">
          <Chart
            overflow
            xTicks={[...new Set($store.askCenter.data.map((d) => d.publishedAt))]}
            xTickFormat={(d) => d.replace('2020/', '')}
            yTicks={[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]}
            barWidth={5}
            data={$store.askCenter.data} />
        </div>
      </ChartContainer>
    </main>
    <footer>
      這個網站是由 Kalan
      製作。如果覺得有幫助的話請分享給更多人知道，有任何問題歡迎到 Twitter
      上或是一起到 Github 修正問題，謝謝！
    </footer>
  </div>
</Provider>
