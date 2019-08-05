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
  height: 100%;
  justify-content: center;
  padding: 0 1rem;
  text-align: center;
}
</style>
