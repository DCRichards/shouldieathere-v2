<template>
  <div id="app">
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';

export default {
  components: {
    AppFooter,
  },
};
</script>

<style lang="scss">
@import '~@/scss/typography';

body {
  font-family: $font-default;
  -webkit-font-smoothing: antialiased;
}

html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: -webkit-fill-available;
}
</style>
