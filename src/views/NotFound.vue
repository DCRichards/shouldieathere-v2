<template>
  <div class="not-found">
    <content-box>
      <h1>We can't find that page</h1>
      <h2>Looks like you're going hungry, son.</h2>
      <c-button @click="$router.push('/')">
        Go home
      </c-button>
    </content-box>
  </div>
</template>

<script>
import CButton from '@/components/core/Button.vue';
import ContentBox from '@/components/core/ContentBox.vue';

export default {
  components: {
    CButton,
    ContentBox,
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors';

.not-found {
  background-color: $britain;
  background-image: linear-gradient(rgba($black, 0.5), rgba($black, 0.8)), url('../assets/images/404-bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: $white;
  height: 100%;
  overflow: hidden;
}
</style>
