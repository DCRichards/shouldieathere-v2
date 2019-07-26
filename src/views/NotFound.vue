<template>
  <div class="not-found">
    <h1>We can't find that page</h1>
    <h2>Looks like you're going hungry, son.</h2>
    <s-button @click="$router.push('/')">
      Go home
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
.not-found {
  align-items: center;
  background-image: linear-gradient(rgba(#000, 0.5), rgba(#000, 0.8)), url('../assets/images/404-bg.jpg');
  background-position: center;
  background-size: cover;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  text-align: center;
}

h1 {
  font-size: 52px;
}
</style>
