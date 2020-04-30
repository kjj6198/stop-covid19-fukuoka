<script>
  import ExternalLink from './ExternalLink.svelte';
  import { getContext } from 'svelte';
  const t = getContext('t');
</script>

<style>
  ul {
    list-style: none;
    padding-left: 0;
  }

  ul > li:not(:last-child) {
    margin-bottom: 20px;
  }

  svg {
    width: 1em;
    height: 1em;
  }
</style>

<div class="notice">
  <h3>
    <svg
      viewBox="0 0 80 80"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd">
        <g
          id="exclamationmark.circle.fill"
          transform="translate(-1410.000000, -621.000000)"
          fill="#000000"
          fill-rule="nonzero">
          <g id="Symbols" transform="translate(498.000000, 618.000000)">
            <g id="Regular-S" transform="translate(911.580000, 3.000000)">
              <path
                d="M40.2402,79.15039 C61.7734,79.15039 79.6934,61.2793
                79.6934,39.7461 C79.6934,18.2129 61.7246,0.3418 40.1914,0.3418
                C18.707,0.3418 0.83594,18.2129 0.83594,39.7461 C0.83594,61.2793
                18.7559,79.15039 40.2402,79.15039 Z M40.1914,45.166
                C37.9453,45.166 36.7246,43.9453 36.627,41.6504 L36.041,23.3398
                C35.9434,21.0449 37.75,19.3848 40.1426,19.3848 C42.5352,19.3848
                44.4395,21.0938 44.3418,23.3887 L43.707,41.6504 C43.6094,43.9941
                42.3887,45.166 40.1914,45.166 Z M40.1914,59.9121
                C37.8477,59.9121 35.6016,58.0566 35.6016,55.4688
                C35.6016,52.8809 37.7988,51.0254 40.1914,51.0254 C42.584,51.0254
                44.8301,52.832 44.8301,55.4688 C44.8301,58.1055 42.5352,59.9121
                40.1914,59.9121 Z"
                id="Shape" />
            </g>
          </g>
        </g>
      </g>
    </svg>
    {$t('link.title')}
  </h3>
  <ul>
    <li>
      <ExternalLink
        href="https://www.pref.fukuoka.lg.jp/contents/covid19emergency-details.html"
        title={$t('link.policy')} />
    </li>
    <li>
      <ExternalLink
        href="https://www.pref.fukuoka.lg.jp/contents/covid-19-portal.html#b1-4"
        title={$t('link.portal')} />
    </li>
    <li>
      <ExternalLink
        href="https://stopcovid19.metro.tokyo.lg.jp/"
        title={$t('link.tokyo')} />
    </li>
    <li>
      <ExternalLink
        href="https://fukuoka.stopcovid19.jp/"
        title={$t('link.fukuoka')} />
    </li>
  </ul>
  <hr />
</div>
