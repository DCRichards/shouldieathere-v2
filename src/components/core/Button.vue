<template>
  <button @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
button {
  background: #fff;
  border: none;
  border-radius: 5px;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  min-width: 150px;
  padding: 12px 20px;
}

button:hover {
  background: #dedede;
  cursor: pointer;
}
</style>
