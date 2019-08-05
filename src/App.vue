<template>
  <div id="app">
    <router-view />
  </div>
</template>

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
  height: 100vh;
}
</style>
