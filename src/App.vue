<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~@/scss/typography';

body {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  height: 100%;
}

html {
  height: 100vh;
}

html, body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
}
</style>
