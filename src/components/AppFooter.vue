<template>
  <div class="footer">
    <span>
      Should I Eat There? &middot;
      Freshly prepared with &hearts; by <a href="https://github.com/dcrichards">DCRichards</a>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import '~@/scss/_colors.scss';

.footer {
  background: $black;
  color: $white;
  font-size: .9rem;
  padding: .8rem 0;
  text-align: center;
  width: 100%;

  a {
    font-weight: bold;
  }
}
</style>
