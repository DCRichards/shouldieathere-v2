<template>
  <button
    :class="`btn--${variant}`"
    @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
const variants = ['light', 'dark'];

export default {
  props: {
    variant: {
      type: String,
      default: 'light',
      validator: v => variants.includes(v),
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors';

button {
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
  margin: 1rem;
  padding: 1rem 1.5rem;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
}

.btn--light {
  background: $white;
  color: $basalt;

  &:hover {
    background: $britain;
  }
}

.btn--dark {
  background: $basalt;
  color: $white;

  &:hover {
    background: $charcoal;
  }
}
</style>
