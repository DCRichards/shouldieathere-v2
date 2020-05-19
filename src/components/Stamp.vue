<template>
  <div class="stamp">
    <div
      class="stamp__icon"
      v-html="iconSrc" />
    <span class="stamp__text">
      <slot />
    </span>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  props: {
    icon: {
      type: String,
      default: undefined,
      validator: (name) => !!feather.icons[name],
    },
  },

  computed: {
    iconSrc() {
      if (this.icon) {
        return feather.icons[this.icon].toSvg();
      }

      return '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors';

.stamp {
  align-items: center;
  display: flex;
  padding: 0.25rem;
  width: auto;
}

.stamp__icon {
  color: $basalt;
  height: 24px;
  margin-right: 10px;
  width: 24px;
}
</style>
