<template>
  <input
    type="text"
    :placeholder="placeholder"
    :value="value"
    :style="{ backgroundImage: icon ? iconPath : 'none'}"
    @input="$emit('input', $event.target.value)">
</template>

<script>
import feather from 'feather-icons';

export default {
  computed: {
    iconPath() {
      if (!this.icon) {
        return 'none';
      }

      const featherIcon = feather.icons[this.icon];

      if (!featherIcon) {
        return 'none';
      }

      const svg = featherIcon.toSvg({ color: 'basalt' });

      return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
    },
  },

  props: {
    icon: {
      type: String,
      default: undefined,
      validator: name => !!feather.icons[name],
    },

    placeholder: {
      type: String,
      default: '',
    },

    value: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/scss/colors';

input[type="text"] {
  -webkit-appearance: none;
  background: none;
  background-position: 5px;
  background-repeat: no-repeat;
  background-size: 30px 30px;
  border: none;
  border-bottom: 3px solid $basalt;
  caret-color: $basalt;
  color: $basalt;
  font-size: 1.5rem;
  margin: 1rem;
  min-height: 50px;
  padding: 0 35px;
  text-align: center;

  &::-webkit-input-placeholder {
    color: $britain;
  }

  &::-moz-placeholder {
    color: $britain;
  }

  &:-moz-placeholder {
    color: $britain;
  }

  &:-ms-input-placeholder {
    color: $britain;
  }

  &:focus {
    outline: none;
  }
}
</style>
