<template>
  <div class="search">
    <h1>Where do you want to eat?</h1>
    <s-button>
      Should I eat there?
    </s-button>
  </div>
</template>

<script>
import Button from '@/components/core/Button.vue';

export default {
  components: {
    's-button': Button,
  },
};
</script>

<style scoped lang="scss">
.search {
  align-items: center;
  background-image: linear-gradient(to right, rgba(#0B0C0F, 1.0) 40%, rgba(#0B0C0F, 0.0)), url('../assets/images/search-bg.jpg');
  background-position: right;
  background-size: contain;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  overflow: hidden;
}
</style>
