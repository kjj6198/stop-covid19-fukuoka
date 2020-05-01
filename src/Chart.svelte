<script>
  import { onMount, getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import { elasticIn } from 'svelte/easing';
  import { scaleLinear } from 'd3-scale';
  import { groupBy } from './utils';

  const identity = (d) => d;
  export let xTickFormat = identity;
  export let yAccessor = identity;
  export let tooltipFormat = identity;
  export let yTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45];
  export let xTicks = [];
  export let barWidth = 10;
  export let data = [];
  export let overflow = false;
  export let groupByKey = '';
  export let padding = {
    top: 50,
    bottom: 50,
    left: 45,
    right: 15
  };

  let svg;
  let container;
  let width = 0;
  let height = 0;
  let mounted = false;
  const store = getContext('store');

  onMount(() => {
    // for initial time and SSR
    mounted = true;
  });

  $: groupByResult = groupByKey ? groupBy(data, groupByKey) : null;

  $: xScale = scaleLinear()
    .domain([0, xTicks.length])
    .range([padding.left, overflow ? 2000 : width - padding.right]);

  $: yScale = scaleLinear()
    .domain([
      0,
      Math.max.apply(
        null,
        groupByKey
          ? Object.values(groupByResult).map((d) => d.length || d.total)
          : data.map((d) => (isNaN(+d.case) ? +d.total : +d.case))
      )
    ])
    .range([height - padding.bottom, padding.top]);

  // function resize() {
  //   const containerWidth = container.clientWidth;
  //   width = containerWidth;
  //   height = containerWidth / aspect;
  // }

  // function handleResize() {
  //   resize();
  // }

  // function responsivefy(svg) {
  //   resize();
  // }
  let x;
  let y;
  let showTooltip = false;
  let current;
  function handleMouseMove(point) {
    return function(e) {
      current = point;
      showTooltip = true;
      e.stopPropagation();
      const scrollLeft = container.scrollLeft;
      const box = e.target.getBBox();
      x = box.x - scrollLeft;
      y = box.y;
    };
  }

  function handleMouseLeave() {
    showTooltip = false;
  }
</script>

<style>
  .container {
    overflow-x: auto;
  }

  svg {
    width: 100%;
    height: 350px;
  }

  .tick line {
    stroke: #e2e2e2;
    stroke-dasharray: 2;
  }

  text {
    font-size: 0.8rem !important;
  }

  .wrapper {
    overflow-x: auto;
    position: relative;
  }

  .tooltip {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
    transition: 0.3s ease transform;
    transform-origin: center;
    pointer-events: none;
    user-select: none;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
  }

  .overflow {
    width: 2000px;
  }
</style>

<div class="wrapper">
  <div
    bind:this={container}
    class="chart container"
    class:overflow
    bind:clientWidth={width}
    bind:clientHeight={height}>
    <svg
      in:fade
      bind:this={svg}
      preserveAspectRatio="xMinYMid"
      on:mouseleave={handleMouseLeave}>
      {#if mounted}
        <g class="axis y-axis" transform="translate(0, 0)">
          {#each yTicks as tick}
            <g
              class="tick tick-{tick}"
              transform="translate(0, {yScale(tick)})">
              <line x2="100%" />
              <text y="4">{tick}</text>
            </g>
          {/each}
        </g>
        <g class="axis x-axis">
          {#each xTicks as point, i}
            <g
              class="tick"
              transform="translate({xScale(i)},{height - padding.bottom + 5})">
              <text transform="rotate(90)">{xTickFormat(point, i)}</text>
            </g>
          {/each}
        </g>
        <!-- prevent initial rendering error -->
        {#if height}
          {#if groupByResult}
            <g class="bars">
              {#each Object.keys(groupByResult) as point, i}
                <rect
                  on:mouseenter={handleMouseMove(point)}
                  fill="#005bad"
                  x={xScale(i)}
                  y={yScale(groupByResult[point].length)}
                  width={15}
                  height={height - padding.bottom - yScale(groupByResult[point].length)} />
              {/each}
            </g>
          {:else if data}
            <g class="bars">
              {#each data as point, i}
                <rect
                  on:mouseenter={handleMouseMove(point)}
                  fill="#005bad"
                  x={xScale(i)}
                  y={yScale(yAccessor(point))}
                  width={barWidth}
                  height={height - padding.bottom - yScale(yAccessor(point))} />
              {/each}
            </g>
          {/if}
        {/if}
      {/if}
    </svg>
  </div>
  {#if showTooltip}
    <div
      transition:fade={{ duration: 250 }}
      class="tooltip"
      style={`transform: translate(${Math.round(x - 20)}px, ${Math.round(y) - 50}px)`}>
      <slot name="tooltip" data={current}>
        <!-- TODO: refactor it instead of hard-coded -->
        {#if groupByKey}
          <h5>{current}</h5>
          <span>{tooltipFormat(groupByResult[current].length)}</span>
        {:else}
          <h5>{current.publishedAt}</h5>
          <span>{tooltipFormat(current)}</span>
        {/if}
      </slot>
    </div>
  {/if}

</div>
