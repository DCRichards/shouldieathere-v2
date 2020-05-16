<template>
  <div class="content-box">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.content-box {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  padding: 0 1rem;
  text-align: center;
}
</style>
