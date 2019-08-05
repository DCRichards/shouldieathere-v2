<template>
  <div class="stamp">
    <div
      class="stamp__icon"
      v-html="iconSrc" />
    <span class="stamp__text">
      {{ text }}
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
      validator: name => !!feather.icons[name],
    },

    text: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    iconSrc() {
      return feather.icons[this.icon].toSvg();
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors';

.stamp {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0.25rem;
  width: auto;
}

.stamp__icon {
  color: $basalt;
  height: 24px;
  margin-right: 10px;
}
</style>
