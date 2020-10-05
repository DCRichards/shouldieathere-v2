<template>
  <div class="loading">
    <div
      class="icon"
      v-html="iconSrc" />
    <h3>{{ $t('loading.loading') }}</h3>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  data() {
    return {
      iconSrc: feather.icons['rotate-cw'].toSvg(),
    };
  },
};
</script>

<style lang="scss">
.loading {
  align-items: center;
  display: flex;
  justify-content: center;

  h3 {
    margin: 0;
  }
}

@keyframes spin {

  100% {
    transform: rotate(360deg);
  }
}

.icon svg {
  animation: spin 2s linear infinite;
  margin: 0 1rem;
}
</style>
