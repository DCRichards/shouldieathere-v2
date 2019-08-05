<template>
  <div class="rating-card">
    <svg
      class="rating-card__chart"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1">
      <circle
        class="chart__inner"
        :cx="cx"
        :cy="cy"
        :r="radius"
        stroke="#ccc"
        stroke-width="50"
        fill="none" />
      <circle
        :class="['chart__outer', ratingClass]"
        :cx="cx"
        :cy="cy"
        :r="radius"
        stroke-width="50"
        :transform-origin="`${cy} ${cx}`"
        transform="rotate(-90)"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        fill="none" />
      <text
        class="chart__label"
        :x="cx"
        :y="cy"
        text-anchor="middle"
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
      default: 0,
      validator: value => value >= 0 && value <= 5,
    },
  },

  data() {
    return {
      cx: '50%',
      cy: '50%',
      radius: 100,
    };
  },

  computed: {
    circumference() {
      return 2 * Math.PI * this.radius;
    },

    offset() {
      const percent = this.rating / 5;
      return this.circumference - this.circumference * percent;
    },

    ratingClass() {
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

.rating-card__chart {
  height: 100%;
  width: 100%;

  circle.chart__inner {
    stroke: $britain;
  }

  circle.chart__outer {

    &.color-absinthe {
      stroke: $absinthe;
    }

    &.color-limoncello {
      stroke: $limoncello;
    }

    &.color-morello {
      stroke: $morello;
    }
  }

  text.chart__label {
    font-size: 3rem;
    font-weight: 700;
  }
}
</style>
