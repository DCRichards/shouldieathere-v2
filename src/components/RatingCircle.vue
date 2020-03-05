<template>
  <div class="rating-circle">
    <svg
      class="rating-circle__chart"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1">
      <circle
        :class="['chart__circle', ratingClass]"
        :cx="cx"
        :cy="cy"
        :r="radius"
        stroke="#eee"
        fill="#eee" />
      <text
        v-if="showText"
        class="chart__label"
        :x="cx"
        :y="cy"
        text-anchor="middle"
        fill="#fff"
        dominant-baseline="middle">
        {{ rating }}
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: undefined,
    },

    showText: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      cx: '50%',
      cy: '50%',
      radius: 50,
    };
  },

  computed: {
    ratingClass() {
      if (!this.rating) {
        return '';
      }

      if (this.rating <= 2) {
        return 'color-morello';
      }

      if (this.rating === 3) {
        return 'color-limoncello';
      }

      if (this.rating > 3) {
        return 'color-absinthe';
      }

      return '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors';

.rating-circle__chart {
  height: 100%;
  width: 100%;

  circle.chart__circle {

    &.color-absinthe {
      fill: $absinthe;
      stroke: $absinthe;
    }

    &.color-limoncello {
      fill: $limoncello;
      stroke: $limoncello;
    }

    &.color-morello {
      fill: $morello;
      stroke: $morello;
    }
  }

  text.chart__label {
    font-size: 2.5rem;
    font-weight: 700;
  }
}
</style>
