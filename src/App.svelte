<script>
  import { onMount } from 'svelte';
  import { countAccumulated, formatNumber } from './utils';
  import Provider from './Provider.svelte';
  import Chart from './Chart.svelte';
  import Navbar from './Navbar.svelte';
  import ChartContainer from './ChartContainer.svelte';
  import TopSummaryStat from './TopSummaryStat.svelte';
  import Table from './Table/Table.svelte';
  import ExternalLink from './ExternalLink.svelte';
  import Tab from './Tab.svelte';
  import { createDetail } from './config';

  export let store;
  export let locale;
  export let t;
  let currentTab;

  let accumulated = {};

  let isMobile = false;
  onMount(() => {
    isMobile = matchMedia(`(max-width: 680px)`).matches;
  });

  const handleResize = () => {
    isMobile = matchMedia(`(max-width: 680px)`).matches;
  };
</script>

<style>
  .github-logo {
    width: 40px;
  }
  .twitter-logo {
    width: 50px;
  }

  .footer-text {
    text-align: center;
  }
  .footer-logos {
    text-align: center;
  }

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
    /* firefox */
    max-width: 100%;
    grid-area: main;
  }
  footer {
    grid-area: footer;
    font-size: 13px;
  }

  @media (max-width: 680px) {
    .container {
      display: block;
      width: 95%;
      max-width: 100%;
      font-size: 13px;
    }

    h1 {
      font-size: 18px;
    }

    h1 > img {
      width: 30px;
    }

    nav {
      margin-bottom: 20px;
    }

    .github-logo {
      width: 25px;
    }
    .twitter-logo {
      width: 30px;
    }
  }
</style>

<svelte:head>
  <title>({$store.summary.total}) {$t('title')}</title>
  <meta property="og:url" content="https://fukuokacovid.info" />
  <meta
    property="description"
    content={$t('meta.description', $store.summary.total)} />
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:creator" content="@kalanyei" />
  <meta
    property="og:description"
    content={$t('meta.description', $store.summary.total)} />
  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content={`(${$store.summary.total}) ${$t('title')}`} />
  <meta
    property="og:image"
    content="https://fukuokacovid.info/images/cover.jpg" />
  <meta
    property="og:title"
    content={`(${$store.summary.total}) ${$t('title')}`} />
</svelte:head>

<svelte:window on:resize={handleResize} />

<Provider {store} {locale} {t}>
  <div class="container">
    <nav>
      <h3>{$t('title')}</h3>
      <Navbar />
    </nav>
    <main>
      <h1>
        <img alt="covid-19" src="/favicon.png" />
        {$t('title')}
      </h1>

      <p>
        {$t('common.notice')}
        <ExternalLink
          href="https://www.pref.fukuoka.lg.jp/contents/covid19emergency-details.html"
          title={$t('common.official')} />
      </p>

      <TopSummaryStat />

      <ChartContainer title={$t('title')}>
        <div slot="content">
          <div class="wrapper">
            <Tab
              tabs={[$t('infection.countByDay'), $t('infection.accumulated')]}
              let:current={currentTab}>
              {#if currentTab === $t('infection.countByDay')}
                <Chart
                  tooltipFormat={(d) => `${d}人`}
                  xTicks={[...new Set($store.patients.data.map((d, i) => d.publishedAt))].map(
                    (p, i) => (isMobile ? (i % 5 === 0 ? p : '') : p)
                  )}
                  xTickFormat={(d) => d.replace('2020/', '')}
                  data={$store.patients.data}
                  groupByKey="publishedAt" />
              {:else if currentTab === $t('infection.accumulated')}
                <Chart
                  xTicks={[...new Set($store.patients.data.map((d) => d.publishedAt))].map(
                    (p, i) => (isMobile ? (i % 5 === 0 ? p : '') : p)
                  )}
                  tooltipFormat={(d) => `${d}${$t('people')}`}
                  xTickFormat={(d) => d.replace('2020/', '')}
                  yTicks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900]}
                  yAccessor={(d) => +d.total}
                  data={countAccumulated($store.patients.data)}>
                  <div slot="tooltip" let:data={accumulated}>
                    <h5>{accumulated.publishedAt}</h5>
                    <p>
                      {$t('common.total')}：{accumulated.total} (+{accumulated.total - accumulated.lastTime}){$t('common.people')}
                    </p>
                  </div>
                </Chart>
              {/if}
            </Tab>
          </div>
        </div>
        <div slot="footer">
          <ExternalLink
            title={$t('data.patients')}
            href="https://ckan.open-governmentdata.org/dataset/401000_pref_fukuoka_covid19_patients" />
        </div>
      </ChartContainer>

      <ChartContainer title={$t('infectionDetail.title')}>
        <div slot="content" style={`height: 500px; overflow-y: auto`}>
          <!-- since data becomes larger and larger, you might want to add paging...  -->
          <Table
            data={$store.patients.data}
            config={createDetail($t)}
            title={$t('infectionDetail.title')}>
            <div slot="caption">
              <ExternalLink
                title={$t('link.checkDetail')}
                href="https://www.pref.fukuoka.lg.jp/contents/covid19-hassei.html#0428" />
            </div>
          </Table>
        </div>
      </ChartContainer>

      <ChartContainer title={$t('exam.title')}>
        <div slot="content">
          <Chart
            overflow
            tooltipFormat={(d) => `${formatNumber(+d.case)}${$t('common.case')}`}
            yAccessor={(d) => +d.case}
            xTicks={[...new Set($store.exam.data.map((d) => d.publishedAt))]}
            xTickFormat={(d) => d.replace('2020/', '')}
            yTicks={[0, 100, 200, 300, 400, 500, 600, 700]}
            barWidth={9}
            data={$store.exam.data} />
        </div>
        <div slot="footer">
          <ExternalLink
            title={$t('data.exam')}
            href="https://ckan.open-governmentdata.org/dataset/401000_pref_fukuoka_covid19_exam/resource/aab43191-40d0-4a6a-9724-a9030a596009" />
        </div>
      </ChartContainer>

      <ChartContainer title={$t('askCenter.title')}>
        <div slot="content">
          <Chart
            overflow
            yAccessor={(d) => +d.case}
            tooltipFormat={(d) => `${formatNumber(+d.case)}${$t('common.case')}`}
            xTicks={[...new Set($store.askCenter.data.map((d) => d.publishedAt))]}
            xTickFormat={(d) => d.replace('2020/', '')}
            yTicks={[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]}
            barWidth={9}
            data={$store.askCenter.data} />
        </div>
        <div slot="footer">
          <ExternalLink
            title={$t('data.askCenter')}
            href="https://ckan.open-governmentdata.org/dataset/401000_pref_fukuoka_covid19_kikokusyasessyokusya" />
        </div>
      </ChartContainer>

    </main>
    <footer>
      <div class="footer-logos">
        <ExternalLink href="https://github.com/kjj6198/stop-covid19-fukuoka">
          <img class="github-logo" alt="github-logo" src="/images/github.png" />
        </ExternalLink>
        <ExternalLink href="https://twitter.com/kalanyei">
          <img
            class="twitter-logo"
            alt="twitter-logo"
            src="/images/twitter.png" />
        </ExternalLink>
      </div>
      <div class="footer-text">
        {@html $t('common.footer')}
        <p>
          favicon / coronavirus icon is made by
          <a
            href="https://www.flaticon.com/authors/smashicons"
            title="Smashicons">
            Smashicons
          </a>
          from
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </p>
        <p>
          Cover Icon made by
          <a
            href="https://www.freeicons.io/corona-virus-precautions-3/wear-face-mask-icon-39341">
            Shabna Ashraf
          </a>
          from
          <a href="https://www.freeicons.io">www.freeicons.io</a>
        </p>
      </div>
    </footer>
  </div>
</Provider>
