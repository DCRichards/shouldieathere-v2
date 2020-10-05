<template>
  <div class="not-found">
    <content-box>
      <h1>{{ $t('notFound.title') }}</h1>
      <h2>{{ $t('notFound.subtitle') }}</h2>
      <router-link to="/">
        <c-button>{{ $t('global.back') }}</c-button>
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
  height: 100%;
  overflow: hidden;
}
</style>
