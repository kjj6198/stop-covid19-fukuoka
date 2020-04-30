<script>
  export let title;
</script>

<style>
  .title {
    font-size: 24px;
    padding-left: 8px;
    border-left: 5px solid #4f4f4f;
  }

  .container {
    padding: 16px;
    box-shadow: 0 2px 4px rgba(172, 172, 172, 0.5);
    background-color: #ffffff;
    margin-bottom: 50px;
  }
</style>

<section>
  <h3 id={title} class="title">{title}</h3>
  <div class="container">
    <slot name="content" />
    <slot name="footer" />
  </div>
</section>
