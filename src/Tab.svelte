<script>
  import { createEventDispatcher } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  export let tabs = [];
  export let tabsTitle = '';

  const progress = tweened(0, {
    duration: 250,
    easing: cubicOut
  });

  let borderWidth = 0;
  let currentIndex = 0;

  $: currentTab = tabs[currentIndex];

  const dispatch = createEventDispatcher();

  function switchTab(i) {
    currentIndex = i;
    progress.set(i);
    dispatch('tabClick', { currentTab });
  }

  function handleClick(i) {
    return () => {
      switchTab(i);
    };
  }

  function handleKeydown(e) {
    // left or right key
    if (e.keyCode === 39 || e.keyCode === 37) {
      if (e.keyCode === 39) {
        if (currentIndex === tabs.length - 1) {
          switchTab(0);
        } else {
          switchTab(currentIndex + 1);
        }
      } else {
        if (currentIndex === 0) {
          switchTab(tabs.length - 1);
        } else {
          switchTab(currentIndex - 1);
        }
      }
    }
  }

  function useFocus(node) {
    return {
      update: () => {
        if (node.getAttribute('tabindex') === '0') {
          node.focus();
        }
      }
    };
  }
</script>

<style>
  button {
    border: 0;
    background-color: transparent;
    appearance: none;
    cursor: pointer;
  }
  .tabList {
    position: relative;
    padding-bottom: 10px;
  }
  .bar {
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    background-color: #27cc95;
    height: 3px;
  }
</style>

<div class="tabContainer">
  <div
    on:keydown={handleKeydown}
    class="tabList"
    role="tablist"
    aria-label={tabsTitle}>
    {#each tabs as tab, i (tab)}
      <button
        use:useFocus={currentTab}
        role="tab"
        tabindex={currentTab === tab ? '0' : '-1'}
        aria-selected={currentTab === tab}
        class:active={currentTab === tab}
        bind:clientWidth={borderWidth}
        on:click={handleClick(i)}>
        {tab}
      </button>
    {/each}
    <span
      class="bar"
      style={`width: ${borderWidth}px; transform: translateX(${borderWidth * $progress}px)`} />
  </div>
  <slot current={currentTab} />
</div>
