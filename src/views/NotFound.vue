<template>
  <div class="not-found">
    <content-box>
      <h1>Are you lost?</h1>
      <router-link to="/">
        <c-button>Yep.</c-button>
      </router-link>
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
