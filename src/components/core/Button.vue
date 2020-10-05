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
      default: 'dark',
      validator: (v) => variants.includes(v),
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors';
@import '~@/scss/responsive';

button {
  border: none;
  border-radius: 3px;
  font-size: 1.2rem;
  margin: 1rem;
  padding: 1rem 1.5rem;

  @include screen-size('md') {
    font-size: 1.5rem;
  }

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background: $dust;

    &:hover {
      background: $dust;
      cursor: auto;
    }
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
